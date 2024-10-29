import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { dotSpinner } from "ldrs";
import toast from "react-hot-toast";
import useCookie from "react-use-cookie";

const ProductCreateCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isToken,setIsToken] = useCookie("my_token")


  dotSpinner.register();

  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleCreateProduct = async (data) => {
    setIsSending(true);

    await fetch(import.meta.env.VITE_API_URL + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
         "Authorization": `Bearer ${isToken}`
      },
      body: JSON.stringify({
        product_name: data.product_name,
        price: data.price,
        created_at: new Date().toISOString(),
      }),
    });
    setIsSending(false);
    reset();
    if (data.back_to_product_list) {
      navigate("/dashboard/product");
    }
    toast.success("Product Created Successfully");
  };

  return (
    <div className=" bg-stone-50 rounded-lg p-6 w-full md:w-1/2">
      <h1 className=" text-3xl font-bold mb-3">Product Create Card</h1>
      <p className=" text-stone-600 mb-10 text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatum
        consectetur voluptatem deserunt dolor quia!
      </p>

      <form
        className="w-full mt-5"
        onSubmit={handleSubmit(handleCreateProduct)}
      >
        <div className="mb-5">
          <label
            htmlFor="first_name"
            className={`block mb-2 text-sm font-medium ${
              errors.product_name ? "text-red-500" : "text-gray-900"
            } dark:text-white`}
          >
            New Product Name
          </label>
          <input
            {...register("product_name", {
              required: true,
              minLength: 3,
              maxLength: 50,
            })}
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
            Product Price
          </label>
          <input
            {...register("price", {
              required: true,
              minLength: 3,
              maxLength: 10,
            })}
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
          <span>Save Product</span>
          {isSending && ( // Default values shown
            <l-dot-spinner size="20" speed="0.9" color="white"></l-dot-spinner>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductCreateCard;
