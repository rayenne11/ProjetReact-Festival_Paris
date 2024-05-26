import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientLoans } from "../../store/LoanSlice";
import OneLoan from "./OneLoan";
import InfoAlert from "../../components/Alerts/InfoAlert";
import { useNavigate } from "react-router-dom";

function ClientLoans({ show, setShow }) {
  const [error, setError] = useState("");

  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, []);

  const { clientLoans } = useSelector((state) => state.loan);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientLoans());
  }, []);
  return (
    <div className="font-[sans-serif] bg-white relative shadow-md rounded p-6 max-h-[500px] overflow-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center shadow-md p-5">
          <h2 className="text-3xl font-extrabold text-[#333]">Your Loans</h2>
          <span className="text-blue-500 cursor-pointer" onClick={setShow}>
            <i className="fa-solid fa-x"></i>
          </span>
        </div>
        <div className="overflow-x-auto">
          {clientLoans.length === 0 ? (
            <InfoAlert msg="You have no books loaned" />
          ) : (
            <table className="mt-12 w-full border-collapse divide-y shadow-md">
              <thead className="whitespace-nowrap text-center">
                <tr>
                  <th className="text-base text-gray-500 p-4">Description</th>
                  <th className="text-base text-gray-500 p-4">Quantity</th>
                  <th className="text-base text-gray-500 p-4">Return Book</th>
                  <th className="text-base text-gray-500 p-4">Return Date</th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap divide-y">
                {clientLoans.map((loan) => (
                  <OneLoan
                    key={loan._id}
                    {...loan}
                    setError={() => setError()}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientLoans;
