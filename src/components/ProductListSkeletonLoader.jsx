import React from "react";

const ProductListSkeletonLoader = () => {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 animate-pulse">
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-8"></div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-48"></div>
        </th>

        <td className="px-8 py-4 text-end">
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-24"></div>
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
          </div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-24"></div>
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
          </div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="flex space-x-2 justify-end">
            <div className="h-10 w-10 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-10 w-10 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 animate-pulse">
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-8"></div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-48"></div>
        </th>

        <td className="px-8 py-4 text-end">
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-24"></div>
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
          </div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-24"></div>
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
          </div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="flex space-x-2 justify-end">
            <div className="h-10 w-10 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-10 w-10 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>
        </td>
      </tr>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 animate-pulse">
        <td className="px-6 py-4">
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-8"></div>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-48"></div>
        </th>

        <td className="px-8 py-4 text-end">
          <div className="h-4 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-24"></div>
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
          </div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-24"></div>
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-700 w-16"></div>
          </div>
        </td>
        <td className="px-6 py-4 text-end">
          <div className="flex space-x-2 justify-end">
            <div className="h-10 w-10 bg-gray-300 rounded dark:bg-gray-700"></div>
            <div className="h-10 w-10 bg-gray-300 rounded dark:bg-gray-700"></div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductListSkeletonLoader;
