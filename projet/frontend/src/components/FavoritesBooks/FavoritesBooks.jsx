import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteBooks } from "../../store/BookSlice";
import OneFavoriteBook from "./OneFavoriteBook";

function FavoritesBooks({ show, setShow}) {
  const { favoritesBooks } = useSelector((state) => state.book);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavoriteBooks());
  }, []);

  useEffect(() => {
    setIsMounted(true);

    const handleClickOutside = (event) => {
      // Check if the component is mounted and the click target is not within the component
      if (isMounted && !event.target.closest(".component-wrapper")) {
        setShow();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMounted]);
  return (
    <div className="component-wrapper absolute bottom-3 right-64 font-[sans-serif] w-[400px]">
      <button
        type="button"
        className="px-6 py-3 w-full rounded text-white text-sm font-semibold border-none outline-none bg-blue-500"
      >
        Favorite books
      </button>
      <div className="absolute px-2 shadow-2xl bg-white py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
        <p className="text-sm text-gray-500 mt-3 mb-2 ml-4">Recent list</p>
        <ul>
          {favoritesBooks.length >= 1 ? (
            favoritesBooks.map((f) => {
              return <OneFavoriteBook key={f._id} {...f} setShow={setShow} />;
            })
          ) : (
            <li className="py-3 px-4 flex justify-between items-center hover:bg-gray-50 text-black text-sm cursor-pointer">
              <div
                className="bg-blue-100 text-blue-600 px-4 py-4 rounded w-full"
                role="alert"
              >
                <strong className="font-bold text-base mr-4">Info!</strong>
                <span className="block text-sm sm:inline max-sm:mt-1">
                  You have no Favorites books.
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FavoritesBooks;
