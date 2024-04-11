import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext.js";
import Header from "./components/Header.jsx";

function getSavedAuthStatus() {
  const savedAuthStatus = localStorage.getItem("isAuthenticated");
  return savedAuthStatus !== null ? JSON.parse(savedAuthStatus) : false;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getSavedAuthStatus());

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <div className="h-screen w-screen flex flex-col">
        <Header />
        <Outlet />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
