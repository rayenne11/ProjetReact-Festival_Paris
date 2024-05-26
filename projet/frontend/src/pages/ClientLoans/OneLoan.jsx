import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeClienrLoan } from "../../store/LoanSlice";
import { getBook, updateBook } from "../../store/BookSlice";

function OneLoan({ _id, bookId, returnDate, setError }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { book } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getBook(bookId));
  }, [bookId]);

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
      console.log(data.error);
    } else {
      dispatch(removeClienrLoan(_id));
      dispatch(updateBook(data.book));
    }
  };
  return (
    <tr>
      <td className="py-6 px-4">
        <div className="flex items-center gap-6 w-max">
          <div className="h-36 shrink-0">
            <img
              src="https://readymadeui.com/images/product6.webp"
              //   src={"http://loacalhost:3002/api/v1/client/" + book.cover[0]}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-lg font-bold text-[#333]">{book.title}</p>
          </div>
        </div>
      </td>
      <td className="py-6 px-4">
        <button
          type="button"
          className="bg-transparent border px-4 py-2 font-semibold text-sm"
        >
          1
        </button>
      </td>

      <td className="py-6 px-4">
        <button
          onClick={handleReturnBook}
          type="button"
          className="bg-transparent border px-4 py-2 font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-red-500 inline cursor-pointer"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
              data-original="#000000"
            ></path>
            <path
              d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
              data-original="#000000"
            ></path>
          </svg>
        </button>
      </td>
      <td className="py-6 px-4">
        <h4 className="text-lg font-bold text-[#333]">{returnDate}</h4>
      </td>
    </tr>
  );
}

export default OneLoan;
