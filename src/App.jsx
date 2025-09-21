import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50 to-blue-100">
        <div className="flex flex-col items-center">
          {/* Logo placeholder animation */}
          <div className="relative w-36 h-36 mb-8">
            <div className="absolute inset-0 rounded-full bg-blue-200 animate-pulse"></div>
            <div
              className="absolute -inset-2 rounded-full bg-blue-100 opacity-50 blur-xl animate-pulse"
              style={{ animationDuration: "3s" }}
            ></div>
            <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-white shadow-lg">
              <div className="font-bold text-2xl flex items-center">
                <div className="relative">
                  <span className="absolute -inset-1 bg-blue-100 rounded-full blur-sm opacity-70"></span>
                  <svg
                    className="relative w-7 h-7 inline-block mr-1.5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 100-16 8 8 0 000 16z"></path>
                  </svg>
                </div>
                <span className="text-blue-600">
                  Mega<span className="text-blue-800 font-extrabold">Blog</span>
                </span>
              </div>
            </div>
          </div>

          {/* Loading text */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-lg font-medium text-blue-700">
              Preparing your experience
            </div>
            <div className="flex space-x-2">
              <div
                className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"
                style={{ animationDelay: "0s", animationDuration: "0.8s" }}
              ></div>
              <div
                className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"
                style={{ animationDelay: "0.2s", animationDuration: "0.8s" }}
              ></div>
              <div
                className="w-3 h-3 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "0.4s", animationDuration: "0.8s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white-100 via-blue-200 to-blue-100">
      <Header />
      <main className="flex-grow pt-32 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
