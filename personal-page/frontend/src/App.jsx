import Header from "./components/Header.jsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
