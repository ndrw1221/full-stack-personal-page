import { Link } from "react-router-dom";

export default function AILandingPage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex justify-center">
      <div className="container grid items-center gap-6 px-4 md:px-6">
        <div className="space-y-2 text-center mb-5">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
            Choose an AI tool
          </h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Select and get started with the AI features on this website.
          </p>
        </div>
        <div className="mx-auto grid max-w-sm gap-4 lg:max-w-none lg:grid-cols-2 xl:gap-6">
          <div className="flex flex-col justify-between p-6 border rounded-xl hover:shadow-lg transition-transform hover:scale-105 hover:-translate-y-2 duration-300 ease-in-out">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Chat</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Chat with the GPT3-turbo through this website.
              </p>
            </div>
            <Link
              className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
              to="/chat"
            >
              Choose Chat
            </Link>
          </div>
          <div className="flex flex-col justify-between p-6 border rounded-xl hover:shadow-lg transition-transform hover:scale-105 hover:-translate-y-2 duration-300 ease-in-out">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Text Completion</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Autoregressive text completion with gemma-7b or GPT-2.
              </p>
            </div>
            <Link
              className="mt-4 inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900"
              to="/text-completion"
            >
              Choose Text Completion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
