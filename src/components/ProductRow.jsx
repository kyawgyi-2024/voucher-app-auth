import React, { useState } from "react";
import { HiOutlineTrash, HiPencil } from "react-icons/hi2";
import { useSWRConfig } from "swr";
import { bouncy } from "ldrs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ShowDate from "./ShowDate";
import useCookie from "react-use-cookie";

bouncy.register();

const ProductRow = ({ product: { id, product_name, price, created_at,updated_at } }) => {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToken, setUserToken] = useCookie("my_token");

  const handleDeleteBtn = async (id) => {
    setIsDeleting(true);
    const res = await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${userToken}`,
      }
    });
    const json = await res.json();
    if (res.status === 200) {
      toast.success(json.message);
      mutate(import.meta.env.VITE_API_URL + "/products");
    } else {
      toast.error(json.message);
    }
    
  };
  const Dele = () => {
    handleDeleteBtn(id);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{id}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {product_name}
      </th>
      <td className="px-6 py-4 text-end">${price}</td>

      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={created_at} />
      </td>
      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={updated_at} />
      </td>

      <td className="px-6 py-4 text-end">
        <div className=" flex space-x-2 justify-end text-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Link
              to={`edit/${id}`}
              className="size-10 flex justify-center items-center text-sm font-medium text-stone-600 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <HiPencil />
            </Link>

            <button
              onClick={Dele}
              type="button"
              className="size-10 flex justify-center items-center text-sm font-medium text-red-600 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-red-500 dark:focus:text-white"
            >
              {isDeleting ? ( // Default values shown
                <l-bouncy size="20" speed="1.75" color="red"></l-bouncy>
              ) : (
                <HiOutlineTrash />
              )}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ProductRow;
