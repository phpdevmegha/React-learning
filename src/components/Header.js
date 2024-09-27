import { Link,useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

export const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")) || "medium");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.className = theme; // Set the theme class on the document
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    dispatch({ type: 'LOGOUT' });
    navigate('/'); 
  };

  return (
    <header>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="To Do List Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">To Do List</span>
          </Link>
          <div className="flex items-center md:order-2">
            <button 
              onClick={() => setHidden(prev => !prev)} 
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded={hidden ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
            {state.user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-900 dark:text-white">Welcome, {state.user.email}</span>
                <button 
                  onClick={handleLogout} 
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Logout
                </button>
              </div>
            ) : ('')}
          </div>
        </div>
        <div className={`md:flex md:justify-between md:items-center className="themeSelector" ${hidden ? "hidden" : "block"} p-4 md:p-0`}>
          <div className="themeSelector flex space-x-2">
            <span className={theme === "light" ? "light activeTheme" : "light" } onClick={() => setTheme("light")}></span>
            <span className={theme === "medium" ? "medium activeTheme" : "medium" } onClick={() => setTheme("medium")}></span>
            <span className={theme === "dark" ? "dark activeTheme" : "dark" } onClick={() => setTheme("dark")}></span>
            <span className={theme === "gOne" ? "gOne activeTheme" : "gOne" } onClick={() => setTheme("gOne")}></span>
            <span className={theme === "gTwo" ? "gTwo activeTheme" : "gTwo" } onClick={() => setTheme("gTwo")}></span>
            <span className={theme === "gThree" ? "gThree activeTheme" : "gThree" } onClick={() => setTheme("gThree")}></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
