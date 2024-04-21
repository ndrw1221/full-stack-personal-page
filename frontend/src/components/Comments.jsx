import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { formatDistanceToNow } from "date-fns";
import default_avatar from "../assets/default_avatar.jpg";
import { Menu } from "@headlessui/react";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [isAllComments, setIsAllComments] = useState(false);
  const [me, setMe] = useState("");
  const pageNumberRef = useRef(pageNumber);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchComments = async (pageNum) => {
    try {
      const responseOne = await fetch(
        `${apiBaseUrl}/api/v1/comments?page=${pageNum}`,
        {
          method: "GET",
        }
      );
      if (!responseOne.ok) {
        throw new Error("Failed to fetch comments");
      }
      const responseTwo = await fetch(
        `${apiBaseUrl}/api/v1/comments?page=${pageNum + 1}`,
        {
          method: "GET",
        }
      );
      if (!responseTwo.ok) {
        throw new Error("Failed to fetch comments");
      }
      // check if all comments are fetched
      const dataOne = await responseOne.json();
      const dataTwo = await responseTwo.json();
      if (dataOne.length === dataTwo.length) {
        setIsAllComments(true);
      } else {
        setIsAllComments(false);
      }
      setComments(dataOne.reverse()); // most recent comment appear at the bottom
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchMe = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setMe(data.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: inputValue }),
      });
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      setInputValue("");
      fetchComments(pageNumber);
    } catch (error) {
      console.error(error.message);
      alert("You have been logged out. Please log in again.");
      setIsAuthenticated(false);
      navigate("/sign-in");
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      fetchComments(pageNumber);
    } catch (error) {
      console.error(error.message);
      alert("You have been logged out. Please log in again.");
      setIsAuthenticated(false);
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    pageNumberRef.current = pageNumber;
  }, [pageNumber]);

  useEffect(() => {
    fetchComments(pageNumber);
    fetchMe();
    const interval = setInterval(() => {
      fetchComments(pageNumberRef.current);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {comments ? (
        <ul
          role="list"
          className="divide-y divide-gray-100 mx-48 mt-11 max-sm:mx-5 max-lg:mx-24"
        >
          {!isAllComments && (
            <li>
              <button
                onClick={() => {
                  const newPageNumber = pageNumber + 1;
                  setPageNumber(newPageNumber);
                  fetchComments(newPageNumber);
                }}
                className="flex justify-center  gap-x-1 w-full py-5 text-sm font-bold text-gray-500 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
                    clipRule="evenodd"
                  />
                </svg>
                Load more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          )}
          {comments.map((comment) => (
            <li key={comment.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={`https://storage.googleapis.com/profile-image-uploads-bucket/${
                    comment.name
                  }.jpg?${Date.now()}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = default_avatar;
                  }}
                  alt="Profile picture"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-500">
                    {comment.name}
                  </p>
                  <p className="mt-1 text-sm font-extrabold leading-5 text-gray-800">
                    {comment.content}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-xs leading-6 text-gray-900">
                  {formatDistanceToNow(new Date(comment.commentedAt), {
                    addSuffix: true,
                  })}
                </p>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="hover:bg-slate-100 p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                      </svg>
                    </Menu.Button>
                  </div>
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() =>
                              navigator.clipboard.writeText(comment.content)
                            }
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            } flex justify-between w-full px-4 py-2 text-sm`}
                          >
                            Copy
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={!isAuthenticated || me !== comment.name}
                            className={`${
                              isAuthenticated && me === comment.name
                                ? active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                                : "text-gray-400"
                            } flex justify-between w-full px-4 py-2 text-sm`}
                          >
                            Delete
                          </a>
                        )}
                      </Menu.Item>
                      {/* Add more Menu.Item components for more options */}
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black text-2xl">Leave a comment.</p>
      )}
      <form
        onSubmit={handleAddComment}
        className="mx-48 max-sm:mx-5 max-lg:mx-24 mt-6 px-4 pb-10 flex justify-between space-x-4"
      >
        <input
          id="comment-id"
          name="comment"
          required
          className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder={
            isAuthenticated ? "Leave a comment" : "Sign in to leave a comment"
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={!isAuthenticated}
          autoComplete="off"
        />

        <button
          className={`mr-5 w-28 h-10 text-white rounded-md font-bold ${
            inputValue.trim()
              ? "bg-purple-400 hover:bg-purple-500 shadow-lg"
              : "bg-purple-300"
          }`}
          type="submit"
          disabled={!inputValue.trim()}
        >
          Comment
        </button>
      </form>
    </>
  );
}
