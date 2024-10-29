import React, { useRef, useState } from "react";
import { HiOutlineSearch, HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";
import ProductListSkeletonLoader from "./ProductListSkeletonLoader";
import ProductListEmptyStage from "./ProductListEmptyStage";
import ProductRow from "./ProductRow";
import { Link } from "react-router-dom";
import { debounce, throttle } from "lodash";
import useSWR from "swr";
import Pagination from "./Pagination";
import useCookie from "react-use-cookie";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [token] = useCookie("my_token");

  const [fetchUrl, setFetchUrl] = useState(
    import.meta.env.VITE_API_URL + "/products"
  );
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data, isLoading, error } = useSWR(fetchUrl, fetcher);

  const handleSearch = debounce((e) => {
    setFetchUrl(`${import.meta.env.VITE_API_URL}/products?q=${e.target.value}`);
  }, 500);
  const updateFetchUrl = (url) => {
    setFetchUrl(url);
  };

  const handleClearSearch = () => {
    setSearch("");
    searchInput.current.value = "";
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <HiOutlineSearch className=" w-4 h-4 text-gray-500" />
          </div>
          <input
            // ref={searchInput}  // take ref
            // value={search}
            onChange={handleSearch}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Product ... "
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
            to="/dashboard/product/create"
            className="text-white flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <HiPlus className="w-4 h-4" />
            Add New Product
          </Link>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>

              <th scope="col" className="px-6 py-3 text-end">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3 text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <ProductListSkeletonLoader />
            ) : data?.data?.length === 0 ? (
              <ProductListEmptyStage />
            ) : (
              data?.data?.map((product) => (
                <ProductRow key={product.id} product={product} />
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

export default ProductList;
