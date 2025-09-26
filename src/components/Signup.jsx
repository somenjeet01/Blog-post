import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo, LoadingOverlay } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      {/* Loading overlay for authentication */}
      <LoadingOverlay show={loading} variant="auth" />

      <div
        className={`mx-auto my-4 w-full max-w-lg overflow-hidden rounded-2xl shadow-lg`}
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-4">
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              <Logo />
            </span>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-white/80">
            Join our community of writers and readers
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white p-8">
          <p className="mb-2 text-center text-base text-gray-600">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-800 hover:underline"
            >
              Sign In
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

          <form onSubmit={handleSubmit(create)} className="space-y-6">
            <div>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Full name is required",
                })}
                error={errors.name && errors.name.message}
              />
            </div>

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
                placeholder="Create a strong password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                error={errors.password && errors.password.message}
              />
              <p className="mt-2 text-xs text-gray-500">
                Must be at least 6 characters long
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-600"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
