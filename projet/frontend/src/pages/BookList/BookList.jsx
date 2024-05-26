import React, { useEffect, useState } from "react";
import Book from "./Book";
import AddBook from "./AddBook";


function BookList() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => {
    setShowPopup(false);
  };
  const handleAdd = () => {
    setShowPopup(true);
  };
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    console.log("Retrieved user from localStorage:", parsedUser);
    setUser(parsedUser);
  } else {
    console.log("No user found in localStorage");
  }
}, []);

  useEffect(() => {
    fetch("http://localhost:5001/books") // Assurez-vous que votre route Express.js correspond à cette URL
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-white font-[sans-serif] my-10 px-7">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute 
          after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
            AVAILABLE BOOKS
          </h2>
        </div>

        {user && user.username === "admin" && (
          <>
            <div style={{ float: 'right' }}>
              <button type="submit" onClick={handleAdd}  style={{ backgroundColor: 'rgb(234 88 12 / var(--tw-bg-opacity))', color: 'white', width: '100px', height: '40px', borderRadius: '15px' }}>
                Add +
              </button>
            </div>
            {showPopup && <AddBook handleClose={handleClose} />}

          </>
        )};




        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
          {books.map((book) => (
            <Book key={book._id} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookList;
