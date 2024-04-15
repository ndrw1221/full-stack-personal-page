import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import ProfilePhotoChangeModal from "./ProfilePhotoChangeModal";
import default_avatar from "../assets/default_avatar.jpg";

export default function Profile() {
  const [me, setMe] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://full-stack-personal-webpage-30de4d0b96dc.herokuapp.com/api/v1/auth/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setMe(data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      alert("You have been logged out. Please log in again.");
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      navigate("/sign-in");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/sign-in");
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
                Hello, {me}
              </div>
              <div className="mt-2 flex items-center gap-x-3">
                <img
                  src={`https://full-stack-personal-webpage-30de4d0b96dc.herokuapp.com/api/uploads/${me}.jpg?${refreshKey}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = default_avatar;
                  }}
                  alt="Profile picture"
                  className="h-48 w-48 rounded-full border-2 border-gray-300 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
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

      <ProfilePhotoChangeModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setRefreshKey((oldKey) => oldKey + 1);
        }}
      />
    </div>
  );
}
