import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value.trim());
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value.trim());
  };

  const createUser = async () => {
    // try {
    //   const response = await fetch('http://localhost:8000/api/v1/users', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ name: username }),
    //   });
    //   if (response.ok) {
    //     setShowNotification(true); // Show notification on success
    //     setTimeout(() => setShowNotification(false), 6000); // Hide after 6 seconds
    //   } else {
    //     throw new Error(`Error creating user, status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   console.log('User created:', data);
    //   // Optionally clear the input field or give feedback to the user
    // } catch (error) {
    //   console.error('Failed to create user:', error);
    // }
    setShowNotification(true); // Show notification on success
    setTimeout(() => setShowNotification(false), 6000); // Hide after 6 seconds
  };

  return (
    <>
      {showNotification && (
        <div className="fixed top-40 right-60 m-4 bg-green-500 text-white py-2 px-4 rounded-lg">
          User created
        </div>
      )}

      <div className="flex h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm -mt-60">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create you own account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
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
              <button
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                  username && password
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "bg-indigo-400"
                }`}
                onClick={createUser}
                disabled={!(username && password)}
              >
                Sign in
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
