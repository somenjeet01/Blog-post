import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: (
        <svg
          className="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
      ),
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: (
        <svg
          className="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
      icon: (
        <svg
          className="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
        </svg>
      ),
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
      icon: (
        <svg
          className="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
        </svg>
      ),
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      icon: (
        <svg
          className="w-4 h-4 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <header
      className={`
      fixed w-full top-0 z-50 transition-all duration-300
      ${
        scrolled
          ? "py-3 bg-blue-100 backdrop-blur-md shadow-md border-b border-blue-100/50"
          : "py-5 bg-blue-100"
      }
    `}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="transition-all duration-300 hover:scale-105 hover:brightness-110"
            >
              <Logo width="80px" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Navigation Items */}
          <ul
            className={`
            flex flex-col lg:flex-row items-center gap-3
            absolute lg:relative top-full left-0 right-0
            bg-white/95 lg:bg-transparent shadow-xl lg:shadow-none
            py-6 lg:py-0 mt-2 lg:mt-0 z-50 border-t border-blue-100 lg:border-0
            ${isMenuOpen ? "block animate-fadeIn" : "hidden"} lg:flex
            transition-all duration-300 ease-in-out backdrop-blur-md
          `}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="w-full lg:w-auto px-4 lg:px-0">
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsMenuOpen(false);
                    }}
                    className={`
                      w-full lg:w-auto px-6 py-2.5 rounded-full
                      transition-all duration-300 flex items-center justify-center lg:justify-start
                      font-medium text-sm
                      ${
                        location.pathname === item.slug
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700"
                          : "text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                      }
                    `}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="w-full lg:w-auto px-4 lg:px-0 mt-2 lg:mt-0 lg:ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
