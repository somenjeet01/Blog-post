import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo, LoadingOverlay } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* Loading overlay for authentication */}
      <LoadingOverlay show={isLoading} variant="auth" />

      <div
        className={`mx-auto my-4 w-full max-w-lg overflow-hidden rounded-2xl shadow-lg`}
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2">
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-white/80">
            Sign in to continue to your account
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-8">
          <p className="mb-4 text-center text-base text-gray-600">
            Don't have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-800 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-3 text-sm text-red-600">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <div>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
                error={errors.email && errors.email.message}
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                error={errors.password && errors.password.message}
              />
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="mt-2 text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full" loading={isLoading}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
