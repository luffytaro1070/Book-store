import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger & close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
  ];

  if (isLoggedIn) {
    if (role === "admin") {
      links.push({ title: "Admin Profile", link: "/profile" });
    } else if (role === "user") {
      links.push({ title: "Profile", link: "/profile" });
    }
  } else {
    links = links.filter((link) => link.title !== "Cart");
  }

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-zinc-700 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-2">
          <img
            className="h-12 w-12 object-cover rounded-md"
            src="https://i.pinimg.com/474x/3d/ea/c1/3deac10138263761b853de177ae87746.jpg"
            alt="book"
          />
          <h1 className="text-2xl font-semibold tracking-wide">
            BookHeaven
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="hover:text-blue-500 transition duration-300"
            >
              {item.title}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-blue-500 rounded text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-500 rounded text-blue-500 transition duration-300 hover:bg-blue-500 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-blue-500 text-white rounded bg-blue-400 transition duration-300 hover:bg-blue-500 hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-zinc-800 py-4 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {links.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className="block text-xl px-6 py-2 hover:text-blue-400 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            {item.title}
          </Link>
        ))}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="block w-full text-left px-6 py-2 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-blue-500 hover:text-white"
          >
            Logout
          </button>
        ) : (
          <div className="px-6 space-y-2">
            <Link
              to="/login"
              className="block px-4 py-2 border border-blue-500 text-blue-500 rounded transition duration-300 hover:bg-blue-500 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 border border-blue-500 text-white rounded bg-blue-400 transition duration-300 hover:bg-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
