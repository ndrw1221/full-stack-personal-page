import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Chat() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async () => {
    setOutputText("Loading...");
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (!response.ok) {
        throw new Error(response);
      }

      const data = await response.json();
      setOutputText(data);
      setInputText("");
    } catch (error) {
      setOutputText("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col mt-20 w-screen items-center gap-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        Chat with GPT3-turbo
      </h1>
      <p className="-mt-4 text-center text-gray-500">
        This is Marv, a chatbot that reluctantly answers questions with
        sarcastic responses.
      </p>
      <p className="-mt-4 mb-5 text-center text-gray-500">
        如果不能用表示我沒錢了🥲，敬請見諒。
      </p>
      <div class="w-1/2 flex justify-end flex-wrap">
        <textarea
          class="block w-full h-80 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          rows="5"
          placeholder="Output text"
          value={outputText}
          readOnly
        ></textarea>
      </div>
      <form class="w-1/2" onSubmit={handleSubmit}>
        <div class="flex">
          <div class="relative w-full">
            <input
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder={
                isAuthenticated
                  ? "Enter your message here"
                  : "Sign in to use this feature"
              }
              required
              autoComplete="off"
              onChange={(e) => setInputText(e.target.value)}
              disabled={!isAuthenticated}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              class={`absolute top-0 end-0 p-2.5 text-sm font-extrabold h-full text-white  rounded-e-lg border  focus:ring-4 focus:outline-none focus:ring-blue-300 flex justify-center items-center ${
                inputText.trim()
                  ? "bg-blue-700 border-blue-700 hover:bg-blue-800"
                  : "bg-blue-300 border-blue-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span class="sr-only">Complete</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
