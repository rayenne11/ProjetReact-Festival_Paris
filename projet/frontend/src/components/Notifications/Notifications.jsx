import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotifications,
  updateAllNotificationsSeen,
} from "../../store/NotificationsSlice";
import OneNotif from "./OneNotif";
import InfoAlert from "../Alerts/InfoAlert";
import { Link } from "react-router-dom";

const NotificationList = ({ show, setShow }) => {
  const { notifications, isLoanding } = useSelector(
    (state) => state.notification
  );
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const clearAll = async () => {
    const res = await fetch(
      "http://localhost:3003/api/v1/sendNotification/all",
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
      dispatch(deleteAllNotifications());
    } else {
      console.log(dataRes.error);
    }
  };

  const markSeenAll = async () => {
    const res = await fetch(
      "http://localhost:3003/api/v1/sendNotification/seen/all",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const dataRes = await res.json();
    if (res.ok) {
      dispatch(updateAllNotificationsSeen());
    } else {
      console.log(dataRes.error);
    }
  };

  return (
    <div className="relative font-[sans-serif] w-max mx-auto top-10 -right-20 shadow-xl">
      <div className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full rounded-lg w-[410px] max-h-[500px] overflow-auto">
        <div className="flex justify-between p-4 border-b border-b-gray-300">
          <h2 className="text-blue-500 font-extrabold text-xl">
            Notifications
          </h2>
          <div
            className=" text-blue-500 text-right cursor-pointer"
            onClick={() => setShow(false)}
          >
            <i className="fa-solid fa-x"></i>
          </div>
        </div>
        <div className="flex items-center justify-between my-4 px-4">
          <span
            onClick={clearAll}
            className="text-xs text-blue-500 cursor-pointer"
          >
            Clear all
          </span>
          <span
            onClick={markSeenAll}
            className="text-xs text-blue-500 cursor-pointer"
          >
            Mark as read
          </span>
        </div>
        {notifications.length > 0 ? (
          <ul className="divide-y">
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
                <OneNotif key={n._id} {...n} />
              ))}
          </ul>
        ) : (
          <ul className="divide-y">
            <InfoAlert msg={"No notifications"} />
          </ul>
        )}
        <Link
          to="/notifications"
          className="text-sm px-4 mt-6 mb-4 inline-block text-blue-500 cursor-pointer"
        >
          View all Notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationList;
