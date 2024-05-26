import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../store/ClientSlice";

const AuthLayout = () => {
  const user = useSelector((state) => state.auth);
  const { client } = useSelector((state) => state.client);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClient());
  }, [user]);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="pt-20">
      <Outlet client={client} />
    </div>
  );
};

export default AuthLayout;
