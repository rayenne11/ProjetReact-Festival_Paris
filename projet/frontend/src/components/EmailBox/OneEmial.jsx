import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { removeNotif } from "../../store/NotificationsSlice";

function OneEmial({ _id, from, subject, message, timestamp }) {
  const user = useSelector((state) => state.auth);
  const formatTimestamp = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const deleteNotif = async () => {
    if (!confirm("Are you sure you want to delete this email")) {
      return;
    }
    const res = await fetch(
      "http://localhost:3003/api/v1/sendNotification/" + _id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const dataRes = await res.json();
    if (res.ok) {
      dispatch(removeNotif(_id));
    } else {
      console.log(dataRes.error);
    }
  };

  return (
    <li className="flex items-center border-y hover:bg-gray-200 px-2">
      <input
        type="checkbox"
        className="focus:ring-0 border-2 border-gray-400"
      />
      <div className="w-full flex items-center justify-between p-1 my-1 cursor-pointer">
        <div className="flex items-center">
          <div className="flex items-center mr-4 ml-1 space-x-1">
            <button title="Not starred">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 hover:text-gray-900 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                ></path>
              </svg>
            </button>
            <button title="Click to mark this email as important">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 hover:text-gray-900 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                ></path>
              </svg>
            </button>
          </div>
          <span className="w-56 pr-2 truncate">{from}</span>
          <span className="w-64 truncate">{subject}</span>
          <span className="mx-1">-</span>
          <span className="w-96 text-gray-600 text-sm truncate">{message}</span>
        </div>
        <div className="w-40 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button title="Delete" onClick={deleteNotif}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-500 hover:text-gray-900 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {formatTimestamp(timestamp)}
          </span>
        </div>
      </div>
    </li>
  );
}

export default OneEmial;
