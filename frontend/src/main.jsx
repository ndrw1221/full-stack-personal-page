import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Comments from "./components/Comments.jsx";
import Signin from "./components/Signin.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/Profile.jsx";
import AILandingPage from "./components/AILandingPage.jsx";
import TextCompletion from "./components/TextCompletion.jsx";
import Chat from "./components/Chat.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/comments",
        element: <Comments />,
      },
      {
        path: "/sign-in",
        element: <Signin />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/ai",
        element: <AILandingPage />,
      },
      {
        path: "/text-completion",
        element: <TextCompletion />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
