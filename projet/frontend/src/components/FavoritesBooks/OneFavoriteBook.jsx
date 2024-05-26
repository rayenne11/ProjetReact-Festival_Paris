import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFavorite } from "../../store/BookSlice";

function OneFavoriteBook(props) {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const removeFavv = async () => {
    const res = await fetch(
      `http://localhost:3000/api/v1/book/removeFav/${props._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.log(data.error);
    } else {
      dispatch(removeFavorite(props._id));
    }
  };

  return (
    <li className="py-3 px-4 flex justify-between items-center hover:bg-blue-100 text-black text-sm cursor-pointer">
      <div className="flex justify-between items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          className="mr-3 inline-block"
          viewBox="0 0 64 64"
        >
          <path
            d="M61.92 30.93a7.076 7.076 0 0 0-6.05-5.88 8.442 8.442 0 0 0-.87-.04V22A15.018 15.018 0 0 0 40 7H24A15.018 15.018 0 0 0 9 22v3.01a8.442 8.442 0 0 0-.87.04 7.076 7.076 0 0 0-6.05 5.88A6.95 6.95 0 0 0 7 38.7V52a3.009 3.009 0 0 0 3 3v6a1 1 0 0 0 1 1h3a1 1 0 0 0 .96-.73L16.75 55h30.5l1.79 6.27A1 1 0 0 0 50 62h3a1 1 0 0 0 1-1v-6a3.009 3.009 0 0 0 3-3V38.7a6.95 6.95 0 0 0 4.92-7.77ZM11 22A13.012 13.012 0 0 1 24 9h16a13.012 13.012 0 0 1 13 13v3.3a6.976 6.976 0 0 0-5 6.7v3.18a3 3 0 0 0-1-.18H17a3 3 0 0 0-1 .18V32a6.976 6.976 0 0 0-5-6.7Zm37 16v5H16v-5a1 1 0 0 1 1-1h30a1 1 0 0 1 1 1ZM13.25 60H12v-5h2.67ZM52 60h-1.25l-1.42-5H52Zm3.83-23.08a1.008 1.008 0 0 0-.83.99V52a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V37.91a1.008 1.008 0 0 0-.83-.99 4.994 4.994 0 0 1 .2-9.88A4.442 4.442 0 0 1 9 27h.01a4.928 4.928 0 0 1 3.3 1.26A5.007 5.007 0 0 1 14 32v12a1 1 0 0 0 1 1h34a1 1 0 0 0 1-1V32a5.007 5.007 0 0 1 1.69-3.74 4.932 4.932 0 0 1 3.94-1.22 5.018 5.018 0 0 1 4.31 4.18v.01a4.974 4.974 0 0 1-4.11 5.69Z"
            data-original="#000000"
          />
        </svg>
        {/* <img
        src={"http://localhost:3001/uploads" + props.cover}
        className="mr-3 inline-block"
      /> */}

        <Link to={"/books/" + props._id} onClick={props.setShow}>
          {props.title}
        </Link>
      </div>
      <button className="text-red-500" onClick={removeFavv}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </li>
  );
}

export default OneFavoriteBook;
