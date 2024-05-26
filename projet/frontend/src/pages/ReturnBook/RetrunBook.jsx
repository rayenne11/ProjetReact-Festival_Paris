import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientLoans } from "../../store/LoanSlice";
import OneLoan from "./OneLoan";
import ReturnForm from "./ReturnForm";
import InfoAlert from "../../components/Alerts/InfoAlert";

function RetrunBook() {
  const user = useSelector((state) => state.auth);
  const { clientLoans, isLoading } = useSelector((state) => state.loan);
  const dispatch = useDispatch();

  useEffect(() => {
    getClientLoans();
  }, [dispatch]);

  return (
    <div className="font-[sans-serif] bg-gray-100 h-full pt-20">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-extrabold text-[#333]">
          Your Loaned Books
        </h2>
        <div className="grid lg:grid-cols-3 gap-12 relative mt-10">
          {clientLoans.length > 0 ? (
            <div className="lg:col-span-2 space-y-6">
              {clientLoans.map((l) => {
                return <OneLoan key={l._id} {...l} />;
              })}
            </div>
          ) : (
            <div className="lg:col-span-2 space-y-6">
              <InfoAlert msg={"You have no loaned books"} />
            </div>
          )}
          <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sticky top-0">
            <h3 className="text-xl font-extrabold [#333] border-b pb-3">
              Return Book
            </h3>
            <ReturnForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetrunBook;
