import React, { useState } from "react";
import {
  removeClienrLoan,
  removeClienrLoanByBookId,
} from "../../store/LoanSlice";
import { useDispatch, useSelector } from "react-redux";

function ReturnForm() {
  const user = useSelector((s) => s.auth);
  const [bookId, setBookId] = useState("");

  const [msg, setMsg] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const getBookId = async (bookCode) => {
    const res = await fetch(
      `http://localhost:3000/api/v1/book/code/${bookId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok) return data._id;
    else setError("Something went wrong");
  };

  const handleReturnBook = async (e) => {
    e.preventDefault();
    if (!bookId) {
      setError("Book code is invalid");
      return;
    }
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
    } else {
      const id = await getBookId(bookId);

      if (id) dispatch(removeClienrLoanByBookId(id));
      setMsg("The book is returned");
    }
  };

  return (
    <form
      className="space-y-4 font-[sans-serif] max-w-md mx-auto mt-10"
      onSubmit={handleReturnBook}
    >
      <input
        onChange={(e) => setBookId(e.target.value)}
        value={bookId}
        type="text"
        placeholder="Enter book code"
        className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 focus:border-blue-500 rounded"
      />
      {error && (
        <div className="mr-3">
          <span className="text-red-500 font-semibold">{error}</span>
        </div>
      )}
      {msg && (
        <div className="mr-3">
          <span className="text-green-600 font-semibold">{msg}</span>
        </div>
      )}
      <button
        type="submit"
        className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}

export default ReturnForm;
