import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfilePhotoChangeModal({ isOpen, onClose }) {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showError, setShowError] = useState(false);
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setShowError(false);
    if (!file.type.startsWith("image/")) {
      setShowError(true);
      return;
    }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const changePhoto = async (event) => {
    event.preventDefault();
    setShowError(false);

    if (!photo.type.startsWith("image/")) {
      setShowError(true);
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await fetch(
        "https://full-stack-personal-webpage-30de4d0b96dc.herokuapp.com/api/v1/users/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Photo changed successfully");
        setPhoto(null);
        setPreview(null);
        onClose();
      } else if (response.status === 401) {
        console.error("Failed to change photo: Unauthorized");
        alert("You have been logged out. Please log in again.");
        localStorage.removeItem("token");
        setAuthenticated(false);
        onClose();
        navigate("/sign-in");
      } else {
        console.error("Failed to change photo: Unexpected error");
        alert("Failed to change photo, please try again later.");
        onClose();
      }
    } catch (error) {
      console.error("Failed to change photo:", error);
    }
  };

  return (
    isOpen && (
      <div
        className="fixed z-10 inset-0 max-sm:-inset-96 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <form onSubmit={changePhoto}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-extrabold text-gray-700"
                      id="modal-headline"
                    >
                      Change Profile Photo
                    </h3>
                    <div className="mt-5 sm:flex items-center justify-between">
                      {preview ? (
                        <img
                          src={preview}
                          alt="Profile preview"
                          className="mx-auto h-40 w-40 rounded-full object-cover"
                        />
                      ) : (
                        <div className="mx-auto h-40 w-40 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                          <span>preview</span>
                        </div>
                      )}
                      <div className="max-sm:mt-5 mx-auto sm:ml-20">
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                        >
                          Upload a photo
                        </label>
                        {showError && (
                          <p className="mt-5 text-red-500 text-xs italic animate-bounce">
                            Please select an valid image
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${
                    photo ? "hover:bg-indigo-700" : "opacity-50"
                  }`}
                  disabled={!photo}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhoto(null);
                    setPreview(null);
                    setShowError(false);
                    onClose();
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
