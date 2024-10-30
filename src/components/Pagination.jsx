import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Pagination = ({
  link: { prev, next },
  meta: { total, to, from, links },
  updateFetchUrl,
}) => {
  const handlePrevBtn = async () => {
    updateFetchUrl(prev);
  };
  const handleNextBtn = async () => {
    updateFetchUrl(next);
  };
  return (
    <div className="flex justify-between items-center">
      {/* Help text */}
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {from}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {to}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>{" "}
        Entries
      </span>
      {/* Buttons */}
      <div className="inline-flex mt-2 xs:mt-0 mr-6">
        {/* <button
          onClick={handlePrevBtn}
          disabled={!prev}
          className="flex items-center justify-center size-10 text-sm font-medium text-white bg-gray-300 rounded-s hover:bg-gray-400 dark:bg-blue-800 dark:border-blue-700 dark:text-gray-400 dark:hover:bg-blue-700 dark:hover:text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          <HiArrowLeft />
        </button>
        <button
          onClick={handleNextBtn}
          disabled={!next}
          className="flex items-center justify-center size-10 text-sm font-medium text-white bg-gray-300 border-0 border-s border-gray-300 rounded-e hover:bg-gray-400 dark:bg-blue-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-blue-700 dark:hover:text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          <HiArrowRight />
        </button> */}

        {links.map((link) => {
          return (
            <button
              key={link.label}
              disabled={!link.url}
              onClick={() => updateFetchUrl(link.url)}
              className={`${link.active ? "bg-blue-500 text-white" : "bg-white"}
                flex items-center justify-center size-10 text-sm font-medium text-stone-900  border-y first:border-l last:border-r border-gray-200 first:rounded-l-lg last:rounded-r-lg hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:pointer-events-none`}
            >
              {link.label === "&laquo; Previous" ? (
                <HiArrowLeft />
              ) : link.label === "Next &raquo;" ? (
                <HiArrowRight />
              ) : (
                link.label
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
