import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value.trim());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim());
    if (event.target.value.trim().length < 8) {
      setShowError("Password must be at least 8 characters long");
    } else {
      setShowError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value.trim());
    if (event.target.value.trim() !== password) {
      setShowError("Passwords do not match");
    } else {
      setShowError("");
    }
  };

  const signup = async (event) => {
    event.preventDefault();
    setShowError("");
    if (password !== confirmPassword) {
      setShowError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setShowError("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, password: password }),
      });

      if (response.status === 409) {
        setShowError("User already exists");
        return;
      }

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setUsername("");
      setPassword("");
      setConfirmPassword("");

      // Save the token in local storage
      const data = await response.json();
      setIsAuthenticated(data.auth);
      console.log("User created successfully");
      navigate("/profile");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <>
      <div className="flex h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm -mt-60">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your own account
          </h2>
          {showError && (
            <div className="text-center text-red-500 mt-2 -mb-2 animate-bounce ease-in-out">
              {showError}
            </div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signup}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  username && password && confirmPassword && !showError
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "bg-indigo-400"
                }`}
                disabled={
                  !(username && password && confirmPassword && !showError)
                }
              >
                Sign up
              </button>
            </div>
          </form>
          <p class="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
