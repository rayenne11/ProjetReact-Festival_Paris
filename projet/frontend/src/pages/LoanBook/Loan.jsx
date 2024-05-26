import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClientLoan } from "../../store/LoanSlice";
import SeccussAlert from "../../components/Alerts/SeccussAlert";
import { updateBook } from "../../store/BookSlice";

function LoanBook() {
  const user = useSelector((state) => state.auth);
  const [bookCode, setBookCode] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [seccuss, setSeccuss] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!returnDate) {
      setError("Choose a date, please.");
      return;
    }

    const loan = {
      returnDate,
      loanDate: new Date(),
      clientId: user._id,
      bookId: bookCode,
    };

    try {
      const res = await fetch("http://localhost:3002/api/v1/loan/addLoan", {
        method: "POST",
        body: JSON.stringify(loan),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const dataRes = await res.json();
      if (!res.ok) {
        setError(dataRes.error);
      } else {
        // Handle successful loan
        dispatch(addClientLoan(loan));
        dispatch(updateBook(dataRes.book));
        setBookCode("");
        setBookTitle("");
        setReturnDate("");
        document.getElementById("filter").value = "";
        document.getElementById("address").value = "";
        await fetchBookSuggestions("");
        setSeccuss(true);
        setTimeout(() => {
          setSeccuss(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const fetchBookSuggestions = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/book/search?q=${query}`
      );
      const data = await response.json();
      setSuggestions(data.books); // Assuming data format includes an array of books
    } catch (error) {
      console.error("Error fetching book suggestions:", error);
    }
  };

  return (
    <div className="grid sm:grid-cols-1 p-20 items-center gap-16 my-6 mx-auto max-w-4xl bg-white text-[#333] font-[sans-serif] shadow-lg">
      {seccuss && (
        <SeccussAlert
          msg={"Book loaned seccussfully"}
          setShow={() => setSeccuss(false)}
        />
      )}
      <div>
        <h1 className="text-3xl font-extrabold">Let's Enjoy</h1>
        <p className="text-sm text-gray-400 mt-3">
          Embark on a literary journey with us. Borrow a book, lend your mind to
          the realms of imagination.
        </p>
      </div>
      <form className="ml-auo space-y-4" onSubmit={handleSubmit}>
        <div className="font-[sans-serif]">
          <ul className="bg-white min-w-full w-max rounded max-h-96 ">
            <li className="mb-2">
              <span className="text-blue-500 font-bold">Selected Book :</span>
              {bookTitle}
            </li>
            <li className="mb-2">
              <input
                id="filter"
                placeholder="Type something"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full py-3 px-4"
                onChange={(e) => {
                  fetchBookSuggestions(e.target.value);
                }}
              />
            </li>
            <div className="shadow-lg">
              {suggestions.map((book) => (
                <li
                  key={book._id}
                  className="py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-black text-sm cursor-pointer"
                  onClick={() => {
                    setBookTitle(book.title);
                    setBookCode(book._id);
                  }}
                >
                  {book.code}
                </li>
              ))}
            </div>
          </ul>
        </div>
        <input
          id="address"
          type="text"
          placeholder="Delivery Address"
          className="w-full rounded-md py-3 px-4 bg-gray-100 border border-gray-300 text-sm outline-[#007bff]"
        />
        <label
          htmlFor="borrowing-period"
          className="block mb-2 text-sm font-semibold text-gray-900 "
        >
          Select return Date
        </label>
        <input
          name="returnDate"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          type="date"
          className="px-4 py-3 bg-[#f0f1f2] border border-gray-300 text-black w-full text-sm outline-[#007bff] rounded"
        />
        <button
          type="submit"
          className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-3 w-full"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default LoanBook;
