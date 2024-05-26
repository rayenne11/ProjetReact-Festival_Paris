import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../store/NotificationsSlice";
import OneEmial from "./OneEmial";

function EmailBox() {
  const { notifications } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <div className="mt-20 flex flex-col gap-10 px-20">
      <h1 className="text-3xl ml-14 text-blue-600">Email inbox :</h1>
      <div className="w-full px-10 bg-white shadow-xl rounded-lg flex overflow-x-auto custom-scrollbar">
        <div className="w-64 px-4">
          <div className="h-16 flex items-center">
            <button
              type="button"
              className="w-48 mx-auto bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-gray-100 py-2 rounded space-x-2 transition duration-150"
            >
              <span>Your Emails</span>
            </button>
          </div>
          <div className="px-2 pt-4 pb-8 border-r border-gray-300">
            <ul className="space-y-2">
              <li>
                <a className="bg-gray-500 bg-opacity-30 text-blue-600 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer">
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      ></path>
                    </svg>
                    <span>Inbox</span>
                  </span>
                  <span className="bg-sky-500 text-gray-100 font-bold px-2 py-0.5 text-xs rounded-lg">
                    {notifications.length}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 px-2">
          <div className="bg-gray-100 mb-6">
            <ul>
              {notifications
                .slice() // Create a shallow copy of the notifications array to avoid mutating the original array
                .sort((a, b) => {
                  // Sort notifications by timestamp in descending order
                  if (a.timestamp < b.timestamp) return 1;
                  if (a.timestamp > b.timestamp) return -1;

                  // If timestamps are equal, sort unseen notifications above seen notifications
                  if (!a.seen && b.seen) return -1;
                  if (a.seen && !b.seen) return 1;

                  // If timestamps and seen statuses are equal, maintain the current order
                  return 0;
                })
                .map((n) => (
                  <OneEmial key={n._id} {...n} />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailBox;
