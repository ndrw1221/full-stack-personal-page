import { useState, useContext, useEffect, useInsertionEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { formatDistanceToNow } from "date-fns";
import default_avatar from "../assets/default_avatar.jpg";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { isAuthenticated } = useContext(AuthContext);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comments?page=${pageNumber}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data.reverse()); // most recent comment appear at the bottom
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {comments ? ( // need to be fixed
        <ul role="list" className="divide-y divide-gray-100 mx-24 mt-11">
          {comments.map((comment) => (
            <li key={comment.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={`http://localhost:8000/api/uploads/${comment.name}.jpg`}
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
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black text-2xl">No comment yet. Leave a comment.</p>
      )}
      <form className="mx-24 mt-6 px-4 pb-10 flex justify-between space-x-4">
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
        />

        <button
          className={`mr-5 w-28 h-10 text-white rounded-md font-bold ${
            inputValue.trim()
              ? "bg-purple-400 hover:bg-purple-500 shadow-lg"
              : "bg-purple-300"
          }`}
          // onClick={commentHandler}
          disabled={!inputValue.trim()}
        >
          Comment
        </button>
      </form>
    </>
  );
}
