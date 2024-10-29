import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCookie from "react-use-cookie";
import { dotSpinner } from "ldrs";
import toast from "react-hot-toast";
import useSWR,{useSWRConfig } from "swr";

const ProductEditCard = () => {
  const [userToken, setUserToken] = useCookie("my_token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const fetcher = (url) =>
    fetch(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_API_URL + `/products/${id}`,
    fetcher
  );
  const { mutate } = useSWRConfig();

  dotSpinner.register();

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleUpdateProduct = async (data) => {
    setIsSending(true);

    const res = await fetch(import.meta.env.VITE_API_URL + `/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },

      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
    });
    setIsSending(false);
    const json = await res.json();
    mutate(import.meta.env.VITE_API_URL + `/products/${id}`);
    setIsSending(false);
    if (res.status === 200) {
      navigate("/dashboard/product");
      toast.success(json.message);
    } else {
      toast.error(json.message);
    }
  };

  // Swr data get checking process //
  // if(isLoading) return <p>Loading...</p>
  // console.log(data)

  return (
    <div className=" bg-stone-50 rounded-lg p-6 w-full md:w-1/2">
      <h1 className=" text-3xl font-bold mb-3">Edit Product Card</h1>
      <p className=" text-stone-600 mb-10 text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatum
        consectetur voluptatem deserunt dolor quia!
      </p>

      {isLoading ? (
        <div>
          <div className="mb-5 animate-pulse">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          <div className="mb-8 animate-pulse">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </label>
            <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          <div className="flex items-center mb-4 animate-pulse">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </label>
          </div>
          <div className="flex items-center mb-4 animate-pulse">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </label>
          </div>

          <div className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ) : (
        <form
          className="w-full mt-5"
          onSubmit={handleSubmit(handleUpdateProduct)}
        >
          <div className="mb-5">
            <label
              htmlFor="first_name"
              className={`block mb-2 text-sm font-medium ${
                errors.product_name ? "text-red-500" : "text-gray-900"
              } dark:text-white`}
            >
              Edit Product Name
            </label>
            <input
              {...register("product_name", {
                required: true,
                minLength: 3,
                maxLength: 50,
              })}
              defaultValue={data?.data?.product_name}
              type="text"
              className={`bg-gray-50 border ${
                errors.product_name
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500 "
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              } block text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          `}
              placeholder="eg.Web-app"
            />
            {errors.product_name?.type === "required" && (
              <p className=" text-red-500 text-sm mt-1">
                Product name is required
              </p>
            )}
            {errors.product_name?.type === "minLength" && (
              <p className=" text-red-500 text-sm mt-1">
                Product name must be greater than 3 characters
              </p>
            )}
            {errors.product_name?.type === "maxLength" && (
              <p className=" text-red-500 text-sm mt-1">
                Product name must be less than 50 characters
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              className={`block mb-2 text-sm font-medium ${
                errors.price ? "text-red-500" : "text-gray-900"
              } dark:text-white`}
            >
              Edit Product Price
            </label>
            <input
              {...register("price", {
                required: true,
                minLength: 3,
                maxLength: 10,
              })}
              defaultValue={data?.data?.price}
              type="number"
              className={`bg-gray-50 border ${
                errors.price
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              } text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="eg. 100"
            />
            {errors.price?.type === "required" && (
              <p className=" text-red-500 text-sm mt-1">Price is required</p>
            )}
            {errors.price?.type === "minLength" && (
              <p className=" text-red-500 text-sm mt-1">
                Price must be greater than 100 characters
              </p>
            )}
            {errors.price?.type === "maxLength" && (
              <p className=" text-red-500 text-sm mt-1">
                Price must be less than 50 characters
              </p>
            )}
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                {...register("all_correct")}
                id="all-correct"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="all-correct"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Make sure all field are correct!
            </label>
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                {...register("back_to_product_list")}
                id="back_to_product_list"
                type="checkbox"
                checked
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="back_to_product_list"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Back to Product List
            </label>
          </div>

          <Link
            to="/dashboard/product"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="text-white inline-flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <span>Update Product</span>
            {isSending && ( // Default values shown
              <l-dot-spinner
                size="20"
                speed="0.9"
                color="white"
              ></l-dot-spinner>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditCard;
