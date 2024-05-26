import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoanModal from "./LoanModal";
import { useSelector } from "react-redux";

function Book({ _id, title, author, cover }) {
  const [showLoanModal, setShowLoanModal] = useState(false);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  return (
    <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group">
      {showLoanModal && (
        <LoanModal
          show={showLoanModal}
          setShow={() => setShowLoanModal()}
          bookId={_id}
        />
      )}
      <img
        src={cover}
        // src={"http://localhost:3002/uploads/" + cover[0]}
        alt="Blog Post 1"
        className="w-full h-96 object-cover"
      />
      <div className="p-6 absolute bottom-0 left-0 right-0 bg-white opacity-90">
        <span className="text-sm block text-gray-600 mb-2 uppercase">
          BY {author}
        </span>
        <h3 className="text-xl font-bold text-[#333]">{title}</h3>
        <div className="flex flex-col gap-4 h-0 overflow-hidden group-hover:h-fit group-hover:mt-4 transition-all duration-300">
          <div className="flex flex-row  items-center gap-2">
            
            <Link
              to={"/books/" + _id}
              className="px-6 py-2.5 rounded text-blue-600 text-sm tracking-wider font-semibold outline-none border-2 border-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
