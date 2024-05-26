
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoanModal from "../BookList/LoanModal";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import SeccussAlert from "../../components/Alerts/SeccussAlert";
import { useSelector } from "react-redux";
import UpdatePopup from "./UpdatePopup"


function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSeccussAlert, setShowSeccussAlert] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);


  const [showPopup, setShowPopup] = useState(false);

  const handleUpdate = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
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
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5001/books/${id}`);
        const data = await response.json();
        if (response.ok) {
          setBook(data);
        } else {
          setError(data.message);
          setShowErrorAlert(true);
        }
      } catch (err) {
        setError(err.message);
        setShowErrorAlert(true);
      }
    };

    fetchBook();
  }, [id]);


  
  
  const handleDelete = async () => {
        try {
          const response = await fetch(`http://localhost:5001/books/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          });
    
          if (!response.ok) {
            const data = await response.json();
            setError(data.message);
            setShowErrorAlert(true);
          } else {

            navigate("/books");
            alert("BOOK DELETED SUCCESSFULLT !");
          }
        } catch (err) {
          setError(err.message);
          setShowErrorAlert(true);
        }
      };
    
      // const handleUpdate = async () => {
      //   // Implement update logic here, you might want to navigate to an update form or show a modal
      //   navigate(`/update-book/${id}`);
      // };

  if (!book) {
    return <div>Loading...</div>;
  }

  const handleAddFavorite = async () => {
    // Implement add to favorite functionality
  };

  const handleRemoveFavorite = async () => {
    // Implement remove from favorite functionality
  };

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        {showLoanModal && (
          <LoanModal
            show={showLoanModal}
            setShow={setShowLoanModal}
            bookId={id}
          />
        )}
        {showErrorAlert && (
          <ErrorAlert msg={error} setShow={() => setShowErrorAlert(false)} />
        )}
        {showSeccussAlert && (
          <SeccussAlert msg={msg} setShow={() => setShowSeccussAlert(false)} />
        )}
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="bg-gray-100 px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
              <img
                src={book.cover} // Use book.cover for the image source
                alt={book.title}
                className="w-4/5 rounded object-cover"
              />
              
            </div>
          </div>
          <div className="lg:col-span-2 mt-6">
            <h2 className="text-2xl font-extrabold text-[#333]">
              {book.title} | {book.author}
            </h2>
            <div className="flex flex-wrap gap-4 mt-6">
              <p className="text-blue-400 text-4xl font-bold">
                {book.loaned ? "Not available" : "Available"}
              </p>
              
            </div>
            <div className="flex space-x-2 mt-4">
              {/* Replace SVGs with a star rating component if needed */}
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-5 fill-[#333]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
              <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 className="text-[#333] text-base">500 Reviews</h4>
              
            </div>
            <div className="mt-10">
              <h3 className="text-md font-bold text-gray-800">
                {book.description}
              </h3>
              
              {user && user.username === "admin" && (
                <>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 ml-2"
                  >
                    Update 
                  </button>
                  
                  {showPopup && <UpdatePopup book={book} handleClose={handleClose} />}
                  
                </>
              )}
              
            </div>
          </div>
        </div>
        <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 className="text-lg font-bold text-[#333]">Book information</h3>
          <ul className="mt-6 space-y-6 text-[#333]">
            <li className="text-sm">
              CODE <span className="ml-4 float-right">{book.code}</span>
            </li>
            <li className="text-sm">
              TITLE <span className="ml-4 float-right">{book.title}</span>
            </li>
            
            <li className="text-sm">
              AUTHOR <span className="ml-4 float-right">{book.author}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;


// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import LoanModal from "../BookList/LoanModal";
// import ErrorAlert from "../../components/Alerts/ErrorAlert";
// import SeccussAlert from "../../components/Alerts/SeccussAlert";
// import { useSelector } from "react-redux";


// function BookDetails() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [showLoanModal, setShowLoanModal] = useState(false);
//   const [showErrorAlert, setShowErrorAlert] = useState(false);
//   const [showSeccussAlert, setShowSeccussAlert] = useState(false);
//   const [error, setError] = useState("");
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await fetch(`http://localhost:5001/books/${id}`);
//         const data = await response.json();
//         if (response.ok) {
//           setBook(data);
//         } else {
//           setError(data.message);
//           setShowErrorAlert(true);
//         }
//       } catch (err) {
//         setError(err.message);
//         setShowErrorAlert(true);
//       }
//     };

//     fetchBook();
//   }, [id]);

//   if (!book) {
//     return <div>Loading...</div>;
//   }

//   const handleAddFavorite = async () => {
//     // Implement add to favorite functionality
//   };

//   const handleRemoveFavorite = async () => {
//     // Implement remove from favorite functionality
//   };
//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`http://localhost:5001/books/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         setError(data.message);
//         setShowErrorAlert(true);
//       } else {
//         navigate("/books");
//       }
//     } catch (err) {
//       setError(err.message);
//       setShowErrorAlert(true);
//     }
//   };

//   const handleUpdate = async () => {
//     // Implement update logic here, you might want to navigate to an update form or show a modal
//     navigate(`/update-book/${id}`);
//   };

//   if (!book) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div className="font-[sans-serif] bg-white">
//       <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
//         {showLoanModal && (
//           <LoanModal
//             show={showLoanModal}
//             setShow={setShowLoanModal}
//             bookId={id}
//           />
//         )}
//         {showErrorAlert && (
//           <ErrorAlert msg={error} setShow={() => setShowErrorAlert(false)} />
//         )}
//         {showSeccussAlert && (
//           <SeccussAlert msg={msg} setShow={() => setShowSeccussAlert(false)} />
//         )}
//         <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
//           <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
//             <div className="bg-gray-100 px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
//               <img
//                 src={book.cover} // Use book.cover for the image source
//                 alt={book.title}
//                 className="w-4/5 rounded object-cover"
//               />
//             </div>
//           </div>
//           <div className="lg:col-span-2 mt-6">
//             <h2 className="text-2xl font-extrabold text-[#333]">
//               {book.title} | {book.author}
//             </h2>
//             <div className="flex flex-wrap gap-4 mt-6">
//               <p className="text-blue-400 text-4xl font-bold">
//                 {book.loaned ? "Not available" : "Available"}
//               </p>
//             </div>
//             <div className="flex space-x-2 mt-4">
//               {[...Array(4)].map((_, i) => (
//                 <svg key={i} className="w-5 fill-[#333]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
//                 </svg>
//               ))}
//               <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
//               </svg>
//               <h4 className="text-[#333] text-base">500 Reviews</h4>
//             </div>
//             <div className="mt-10">
//               <h3 className="text-md font-bold text-gray-800">
//                 {book.description}
//               </h3>
//               {user && user.username === "admin" && (
//                 <>
//                   <button
//                     type="button"
//                     onClick={handleDelete}
//                     className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleUpdate}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                   >
//                     Update
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
//           <h3 className="text-lg font-bold text-[#333]">Book information</h3>
//           <ul className="mt-6 space-y-6 text-[#333]">
//             <li className="text-sm">
//               CODE <span className="ml-4 float-right">{book.code}</span>
//             </li>
//             <li className="text-sm">
//               TITLE <span className="ml-4 float-right">{book.title}</span>
//             </li>
//             <li className="text-sm">
//               AUTHOR <span className="ml-4 float-right">{book.author}</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookDetails;
