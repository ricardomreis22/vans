import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function AuthRequired() {
  const location = useLocation();
  const { isLoggedOut } = UserAuth();
  if (!isLoggedOut) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "You must log in first",
          from: location.pathname,
        }}
        replace
      />
    );
  }
  return <Outlet />;
}
