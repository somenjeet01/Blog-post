import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./LoadingComponents";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    //TODO: make it more easy to understand

    // if (authStatus ===true){
    //     navigate("/")
    // } else if (authStatus === false) {
    //     navigate("/login")
    // }

    //let authValue = authStatus === true ? true : false

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? (
    <div className="min-h-screen bg-gradient-to-bl from-blue-100 via-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-gray-600">Checking authentication...</p>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
}
