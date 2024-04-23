import { useState, useContext } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../contexts/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TextCompletion() {
  const [model, setModel] = useState("gemma-7b");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const handleSubmit = async () => {
    setOutputText("Loading...");

    try {
      const response = await fetch("/api/v1/ai/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: model,
          data: {
            inputs: inputText,
            options: {
              use_cache: false,
              max_new_tokens: 50,
            },
          },
        }),
      });

      if (response.error) {
        throw new Error(response);
      }

      const result = await response.json();
      setOutputText(result);
      setInputText("");
    } catch (error) {
      console.error("Error:", error);
      setOutputText("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col mt-20 w-screen items-center gap-y-8">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        AI Text Completion
      </h1>
      <p className="-mt-4 mb-10 text-center text-gray-500">
        This is a simple AI text completion tool base on auto-regressive next
        token prediction. Select a model and input some text to get started.
      </p>

      <form class="w-1/2" onSubmit={handleSubmit}>
        <div class="flex">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex-shrink-0 text-nowrap z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                {model}
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => setModel("gemma-7b")}
                      >
                        Google gemma-7b
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => setModel("GPT-2")}
                      >
                        OpenAI GPT-2
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <div class="relative w-full">
            <input
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder={
                isAuthenticated
                  ? "Text you want to complete..."
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

      <div class="w-1/2 flex justify-end flex-wrap">
        <textarea
          class="block w-full h-80 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          rows="5"
          placeholder="Output text"
          value={outputText}
          readOnly
          disabled={true}
        ></textarea>
      </div>
    </div>
  );
}
