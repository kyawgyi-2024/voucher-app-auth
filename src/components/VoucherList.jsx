import React, { useRef, useState } from "react";
import { HiOutlineSearch, HiX } from "react-icons/hi";
import { HiComputerDesktop } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useSWR from "swr";
import VoucherListRow from "./VoucherListRow";
import VLRSkeletonloader from "./VLRSkeletonloader";
import { debounce, throttle } from "lodash";
import Pagination from "./Pagination";
import useCookie from "react-use-cookie";



const VoucherList = () => {
  const [userToken, setUserToken] = useCookie("my_token");
  const [search, setSearch] = useState("");

  // input value for taking ref

  const searchInput = useRef("");
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((r) => r.json());

  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/vouchers"
  );
  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    console.log(e.target.value);
    setFetchUrl(import.meta.env.VITE_API_URL + `/vouchers?q=${e.target.value}`);
  }, 500);

  const handleClearSearch = () => {
    setSearch("");
    searchInput.current.value = "";
  };

  const updateFetchUrl = (url) => {
    setFetchUrl(url);
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <HiOutlineSearch className=" w-4 h-4 text-gray-500" />
          </div>
          <input
            onChange={handleSearch}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Voucher ... "
          />
          {search && (
            <button
              className=" absolute top-0 right-2 bottom-0 m-auto"
              onClick={handleClearSearch}
            >
              <HiX
                fill="red"
                className="scale-100 active:scale-90 duration-200"
              />
            </button>
          )}
        </div>

        <div>
          <Link
            to="/dashboard/sale"
            className="text-white flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <HiComputerDesktop className="w-4 h-4" />
            Create Sale
          </Link>
        </div>
      </div>
      <h3 className=" mb-3 text-gray-600">Voucher List : </h3>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                # Voucher ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                EMail
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Create_At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- if there is no product --> */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center hidden last:table-row">
              <td colSpan={5} className="px-6 py-4">
                There is no voucher :
              </td>
            </tr>
            {isLoading ? (
              <VLRSkeletonloader />
            ) : (
              data?.data?.map((voucher, index) => (
                <VoucherListRow key={index} voucher={voucher} />
              ))
            )}
          </tbody>
        </table>
      </div>
      {!isLoading && (
        <Pagination
          link={data?.links}
          meta={data?.meta}
          updateFetchUrl={updateFetchUrl}
        />
      )}
    </div>
  );
};

export default VoucherList;
