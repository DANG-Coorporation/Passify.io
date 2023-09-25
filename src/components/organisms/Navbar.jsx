import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCoins } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../utils/checkILogin";
import { parseToken } from "../../utils/parseToken";
import { useRef } from "react";
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userData = useRef(null);
  // const isAuthorized = useSelector((state) => state.login.isAuthorized);

  useEffect(() => {
    if (checkLogin()) {
      console.log(localStorage.getItem("token"));
      userData.current = parseToken(localStorage.getItem("token"));
      console.log(userData.current);
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <header className="bg-white sticky top-0 shadow-md z-20">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <a className="block text-black w-fit" href="/">
                <h2 className="font-bold text-3xl">PASSIFY</h2>
              </a>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <div className="text-gray-500 transition hover:text-gray-500/75">
                      <Link to="/create-event"> Create Event </Link>
                    </div>
                  </li>
                  <li>
                    <div className="text-gray-500 transition hover:text-gray-500/75">
                      <Link to="/explore"> Explore </Link>
                    </div>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                {!isAuthenticated ? (
                  <div className="sm:flex sm:gap-4">
                    <NavLink
                      className="rounded-md border-primaryColor border-2 border-solid px-5 py-2 text-sm font-medium text-primaryColor shadow hover:bg-primaryColor hover:text-white hover:shadow-2xl"
                      to="/login"
                    >
                      {" "}
                      Login{" "}
                    </NavLink>
                    <div className="hidden sm:flex">
                      <NavLink
                        className="rounded-md bg-primaryColor px-5 py-2 text-sm font-medium text-white hover:drop-shadow-2xl"
                        to="/Signup"
                      >
                        {" "}
                        Sign up{" "}
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div className="block relative bg-white">
                    <button
                      className="max-md:visible md:hidden rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                      onClick={() => setOpenMenu(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    <FaUserCircle
                      className="max-md:hidden md:visible fill-gray-700 h-8 w-8 cursor-pointer"
                      onClick={() => setOpenMenu(true)}
                    />
                    {openMenu && (
                      <div
                        className="absolute z-50 w-[250px] top-3/4 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-xl"
                        onMouseLeave={() => setOpenMenu(false)}
                      >
                        <div className="px-4 py-3">
                          <span className="block text-sm text-gray-900">
                            {user?.name}
                          </span>
                          <span className="block text-sm text-gray-500 truncate ... hover:text-clip">
                            {user?.email}
                          </span>
                          <span className="flex items-center text-sm text-gray-500 truncate mt-2">
                            <FaCoins className="mr-2 fill-yellow-600" />
                            {0}
                          </span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                          <li>
                            <Link
                              to="/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Dashboard
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/order-list"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Orders
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Settings
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/"
                              onClick={() => onClickSignUp()}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign out
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
