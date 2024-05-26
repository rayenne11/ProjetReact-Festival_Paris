import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBook, updateBook } from "../../store/BookSlice";
import { Link } from "react-router-dom";
import { removeClienrLoan } from "../../store/LoanSlice";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import SeccussAlert from "../../components/Alerts/SeccussAlert";

function OneLoan({ _id, loanDate, returnDate, bookId, clientId }) {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSeccussAlert, setShowSeccussAlert] = useState(false);
  const user = useSelector((s) => s.auth);
  const { book, isBookLoading } = useSelector((state) => state.book);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBook(bookId));
  }, [dispatch, bookId]);

  const handleReturnBook = async () => {
    const res = await fetch(
      `http://localhost:3002/api/v1/loan/returnbook/${bookId}/${user._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, [5000]);
    } else {
      dispatch(removeClienrLoan(_id));
      dispatch(updateBook(data.book));
      setShowSeccussAlert(true);
      setTimeout(() => {
        setShowSeccussAlert(false);
      }, [5000]);
      setMsg("The book is returned");
    }
  };
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "UTC", // Specify the desired time zone if needed
  };
  return (
    <div className="p-2 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
      <div className="grid sm:grid-cols-2 items-center gap-4">
        {showErrorAlert && (
          <ErrorAlert msg={error} setShow={() => setShowErrorAlert(false)} />
        )}
        {showSeccussAlert && (
          <SeccussAlert msg={msg} setShow={() => setShowSeccussAlert(false)} />
        )}
        <div className="w-full h-full p-4 shrink-0 bg-gray-100">
          <img
            src="https://readymadeui.com/images/product10.webp"
            // src={"http://localhost:3002/uploads" + book.cover[0]}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-extrabold text-[#333]">
            {book.title} | {book.code}
          </h3>
          <hr className="my-6" />
          <ul className="text-sm text-[#333] space-y-2 list-disc pl-4">
            <li>
              <span className="font-semibold">Auhtor :</span>
              {book.author}
            </li>
            <li>
              <span className="font-semibold">Description :</span>
              {book.description}
            </li>
            <li>
              <span className="font-semibold">Loan Date :</span>
              {new Date(loanDate).toLocaleString("en-US", options)}
            </li>
            <li>
              <span className="font-semibold">Return Date :</span>
              {new Date(returnDate).toLocaleString("en-US", options)}
            </li>
          </ul>
          <div className="divide-x border-y mt-6 grid grid-cols-2 text-center">
            <Link
              to={"/books/" + bookId}
              type="button"
              className="bg-transparent font-semibold py-3 text-gray-500 text-sm hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-current mr-2 inline-block"
                viewBox="0 0 128 128"
              >
                <path
                  d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                  data-original="#000000"
                ></path>
              </svg>
              View details
            </Link>
            <button
              onClick={handleReturnBook}
              type="button"
              className="bg-red-600 font-semibold py-3 text-gray-100 text-sm hover:bg-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-current mr-2 inline-block"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneLoan;
