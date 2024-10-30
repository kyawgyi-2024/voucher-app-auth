import React from "react";
import { HiChevronRight, HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Breadcrumb = ({ currentPageTitle, links }) => {
  return (
    <div className=" flex w-full gap-3 mb-5 ">
      <nav className="flex bg-slate-50 p-3 rounded-lg" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to="/dashboard"
              className="inline-flex gap-1 items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <HiHome/>
              Home
            </Link>
          </li>

          {links &&
            links.map((link, index) => (
              <li key={index} className="inline-flex  items-center">
                <Link
                  to={link.path}
                  className="inline-flex gap-1 items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <HiChevronRight />
                  {link.title}
                </Link>
              </li>
            ))}



          <li>
            <div className="flex items-center">
              <HiChevronRight/>
              <a
                href="#"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                {currentPageTitle}
              </a>
            </div>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
