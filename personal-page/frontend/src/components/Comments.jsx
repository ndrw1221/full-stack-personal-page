import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import my_image from "../assets/my-image.jpg";
import guest_image from "../assets/default_avatar.jpg";

let comments = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    message:
      "In the vast expanse of human communication, there exists a unique category of expressions that, while seemingly empty, are rich with implied meaning. These utterances, often brief and devoid of concrete information, serve as vessels for a multitude of interpretations, drawing on the shared experiences, emotions, and understanding that bind us. Through their very lack of specificity, they speak volumes, inviting listeners to fill the gaps with their own thoughts, thereby fostering a silent dialogue that resonates deeply within the human psyche.",
    time: "yesterday",
  },
  {
    id: 2,
    name: "Andrew Hsieh",
    imageUrl: my_image,
    message: "A quick brown fox jumps over the lazy dog.",
    time: "3h ago",
  },
];

let id = 3;

export default function Comments() {
  const [commentsState, setCommentsState] = useState(comments);
  const [inputValue, setInputValue] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const commentHandler = () => {
    const newComment = {
      id: id++, // need to be fixed
      name: "Guest",
      imageUrl: guest_image,
      message: inputValue,
      time: "now", // need to be fixed
    };

    setCommentsState([...comments, newComment]);
    comments = [...comments, newComment];

    setInputValue("");
  };
  return (
    <>
      {commentsState ? ( // need to be fixed
        <ul role="list" className="divide-y divide-gray-100 mx-24 mt-11">
          {commentsState.map((comment) => (
            <li key={comment.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={comment.imageUrl}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {comment.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {comment.message}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {comment.time}
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
          onClick={commentHandler}
          disabled={!inputValue.trim()}
        >
          Comment
        </button>
      </form>
    </>
  );
}
