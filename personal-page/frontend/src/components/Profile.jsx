import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../contexts/AuthContext";

export default function Profile() {
  const [username, setUsername] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove token from localStorage
    localStorage.removeItem("token");
    // set isAuthenticated to false
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsername(data.user);
      } else if (response.status === 401) {
        console.error("Unauthorized");
        localStorage.removeItem("token");
        navigate("/sign-in");
      } else if (response.status === 403) {
        console.error("Forbidden");
        navigate("/sign-in");
      } else if (response.status === 500) {
        console.error("Internal server error");
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-sm:mx-5 max-md:mx-24 max-lg:mx-24 mx-80">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <div className="flex items-center gap-x-3 text-3xl mb-12">
                Hello, {username}
              </div>
              <label
                htmlFor="photo"
                className="block text-lg font-bold leading-6 text-gray-900"
              >
                Your Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-24 w-24   text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={handleLogout}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
