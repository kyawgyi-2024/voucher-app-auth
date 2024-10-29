import logo from "../assets/mms_it_logo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import useCookie, { removeCookie } from "react-use-cookie";
import useUserStore from "../stores/useUserStore";


const Navbar = () => {
  // const [userCookie] = useCookie("user");
  // console.log(userCookie)

  const {
    user: { name, email, profile_image },
  } = useUserStore();
  
  // console.log(userObj)

  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("my_token");
    navigate("/");
  };
  return (
    <nav className=" rounded-lg border-gray-100 dark:bg-gray-900 mb-20">
      <div className="max-w-screen-xl flex flex-wrap items-stretch justify-between mx-auto p-5 shadow">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8 w-8 rounded-lg" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MMS IT
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="size-10 rounded-full object-cover object-top"
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="user photo"
            />
          </button>
          {/* Dropdown menu */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-slate-50 divide-y divide-gray-200 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <Link
                to="/dashboard/user-profile"
                className="block text-lg text-gray-900 dark:text-white font-semibold"
              >
                {name}
              </Link>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                {email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to={"/dashboard/user-profile/user-change-name"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Change Name
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user-profile/user-change-image"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Change Image
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/user-profile/user-change-password"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
          <button
            // data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            // aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-8 h-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
