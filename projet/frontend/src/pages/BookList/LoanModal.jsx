import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClientLoan } from "../../store/LoanSlice";
import { updateBook } from "../../store/BookSlice";

function LoanModal({ show, setShow, bookId }) {
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth);
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const hideModal = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };
  const handeSubmit = async (e) => {
    e.preventDefault();
    if (!data) {
      setError("Choose a date plaese");
      return;
    }
    const loan = {
      returnDate: data,
      loanDate: new Date(),
      clientId: user._id,
      bookId,
    };

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
      setShow(false);
      document.body.style.overflow = "auto";
      // Add user loan to redux
      dispatch(addClientLoan(loan));
      dispatch(updateBook(dataRes.book));
    }
  };
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-6 relative">
        <svg
          onClick={hideModal}
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 cursor-pointer shrink-0 fill-[#333] hover:fill-red-500 float-right"
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
        <form onSubmit={handeSubmit}>
          <div className="my-3 flex flex-col gap-1">
            <h4 className="text-2xl text-[#333] font-semibold text-center">
              Loan Book
            </h4>
            <p className="text-sm text-gray-500 mt-4 text-center mb-5">
              Before loaning the book, we advise ensuring it is returned in good
              condition
            </p>

            <div className="flex flex-col gap-5">
              <label htmlFor="returnDate" className="font-semibold">
                Choose a return date :
              </label>
              <input
                name="returnDate"
                value={data}
                onChange={(e) => setData(e.target.value)}
                type="date"
                className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
              />
            </div>

            <div className="flex mt-2 -mx-3">
              {error && (
                <div
                  className="flex w-full bg-red-100 dark:bg-red-200 rounded-lg p-4 mx-3 mb-4 text-sm text-red-700"
                  role="alert"
                >
                  <svg
                    className="w-5 h-5 inline mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div>
                    <span className="font-medium">Error!</span>: {error}
                  </div>
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 min-w-[150px] w-full rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoanModal;
