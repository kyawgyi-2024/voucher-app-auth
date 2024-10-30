import React, { useState } from "react";
import { HiOutlineTrash, HiOutlineArrowLongRight } from "react-icons/hi2";
import ShowDate from "./ShowDate";
import { useSWRConfig } from "swr";
import { bouncy } from "ldrs";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useCookie from "react-use-cookie";

const VoucherListRow = ({
  voucher: {
    id,
    voucher_id,
    customer_name,
    customer_email,
    total,
    sale_date,
    created_at,
  },
}) => {
  // console.log(voucher)
  bouncy.register();

  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToken, setUserToken] = useCookie("my_token");

  const handleDeleteBtn = async () => {
    setIsDeleting(true);
    await fetch(import.meta.env.VITE_API_URL + `/vouchers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    mutate(import.meta.env.VITE_API_URL + "/vouchers");
    toast.success("Voucher Deleted Successfully");
    setIsDeleting(false);

    // console.log(id);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4 text-nowrap">{voucher_id}</td>
      <th
        scope="row"
        className="flex flex-col px-6 py-4 font-medium whitespace-nowrap dark:text-white"
      >
        <span className=" text-stone-900">{customer_name}</span>
        <span className=" text-xs">{customer_email}</span>
      </th>

      <td className="px-6 py-4 text-end">{total}</td>

      <td className="px-6 py-4 text-end">
        <ShowDate timestamp={created_at} />
      </td>
      <td className="px-6 py-4 text-end">
        <div className=" flex space-x-2 justify-end text-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={handleDeleteBtn}
              className="size-10 flex items-center justify-center text-sm font-medium text-red-500 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-red-700 focus:z-10 focus:ring-2 focus:ring-red-700 focus:text-red-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-red-500 dark:focus:text-white"
            >
              {isDeleting ? ( // Default values shown
                <l-bouncy size="20" speed="1.75" color="red"></l-bouncy>
              ) : (
                <HiOutlineTrash />
              )}
            </button>
            <Link
              to={`/dashboard/vouchers/detail/${id}`}
              className="size-10 flex items-center justify-center text-sm font-medium bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              {" "}
              <HiOutlineArrowLongRight />
            </Link>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default VoucherListRow;
