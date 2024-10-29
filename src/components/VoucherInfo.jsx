import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { dotSpinner } from "ldrs";
import toast from "react-hot-toast";
import SaleForm from "./SaleForm";
import VoucherTable from "./VoucherTable";
import useRecordStore from "../stores/useRecordStore";
import { useNavigate } from "react-router-dom";
import useCookie from "react-use-cookie";

const VoucherInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  dotSpinner.register();
  const [isSending, setIsSending] = useState(false);
  const { records, resetRecords } = useRecordStore();

  const navigate = useNavigate();
  const [userToken, setUserToken] = useCookie("my_token");

  const total = records.reduce((a, b) => a + b.cost, 0);
  const tax = total * 0.07;
  const net_total = total + tax;
  const handleInfo = async (data) => {
    setIsSending(true);
    const currentVoucher = { ...data, records, total, tax, net_total };

    console.log(currentVoucher);
    const res = await fetch(import.meta.env.VITE_API_URL + "/vouchers", {
      method: "POST",
      body: JSON.stringify(currentVoucher),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    // console.log(res);

    const json = await res.json();
    console.log(json);
    // const resJson = await res.json();

    if (res.status === 201) {
      toast.success("Voucher created successfully");

      resetRecords();

      reset();

      setIsSending(false);

      if (data.redirect_to_detail) {
        navigate(`/dashboard/vouchers/detail/${json.data.id}`);
        
      }
    } else {
      toast.error(resJson.message);
      setIsSending(false);
    }
  };

  // Utility function to generate a unique invoice number
  function generateInvoiceNumber() {
    // Get the current date
    const date = new Date();

    // Format the date as YYYYMMDD
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    // Combine the formatted date and the random number
    const invoiceNumber = `INV-${formattedDate}-${randomNumber}`;

    return invoiceNumber;
  }
  return (
    <div className=" grid grid-cols-4 gap-3">
      <div className=" col-span-3">
        <SaleForm />
        <VoucherTable />
      </div>
      <div className=" col-span-1">
        <form
          onSubmit={handleSubmit(handleInfo)}
          className=" flex flex-col h-full"
          id="infoForm"
        >
          <div className=" grid grid-cols-1 gap-5 mb-10 border p-2 shadow-md">
            <div className=" mb-3">
              <label
                htmlFor="voucher_id"
                className={`block mb-2 text-sm font-medium ${
                  errors.voucher_id ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Voucher ID
              </label>
              <input
                defaultValue={generateInvoiceNumber()}
                {...register("voucher_id", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                type="text"
                className={`bg-gray-50 border ${
                  errors.voucher_id
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500 "
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                } block text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            `}
                placeholder="Enter Voucher ID"
              />
              {errors.voucher_id?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Voucher ID is required
                </p>
              )}
              {errors.voucher_id?.type === "minLength" && (
                <p className=" text-red-500 text-sm mt-1">
                  Voucher ID must be greater than 3 characters
                </p>
              )}
              {errors.voucher_id?.type === "maxLength" && (
                <p className=" text-red-500 text-sm mt-1">
                  Voucher ID must be less than 30 characters
                </p>
              )}
            </div>

            <div className="mb-3">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_name ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Name
              </label>
              <input
                {...register("customer_name", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                type="text"
                className={`bg-gray-50 border ${
                  errors.customer_name
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500 "
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                } block text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            `}
                placeholder="Enter Customer Name"
              />
              {errors.customer_name?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Customer name is required
                </p>
              )}
              {errors.customer_name?.type === "minLength" && (
                <p className=" text-red-500 text-sm mt-1">
                  Customer name must be greater than 3 characters
                </p>
              )}
              {errors.customer_name?.type === "maxLength" && (
                <p className=" text-red-500 text-sm mt-1">
                  Customer name must be less than 30 characters
                </p>
              )}
            </div>
            <div className="mb-3">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.customer_email ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Customer Email
              </label>
              <input
                {...register("customer_email", {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
                type="email"
                className={`bg-gray-50 border ${
                  errors.customer_email
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500 "
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                } block text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            `}
                placeholder="Enter Customer Email"
              />
              {errors.customer_email?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Customer Email is required
                </p>
              )}
              {errors.customer_email?.type === "minLength" && (
                <p className=" text-red-500 text-sm mt-1">
                  Customer Email must be greater than 3 characters
                </p>
              )}
              {errors.customer_email?.type === "maxLength" && (
                <p className=" text-red-500 text-sm mt-1">
                  Customer Email must be less than 20 characters
                </p>
              )}
            </div>
            <div className="mb-3">
              <label
                className={`block mb-2 text-sm font-medium ${
                  errors.sale_date ? "text-red-500" : "text-gray-900"
                } dark:text-white`}
              >
                Sale Date
              </label>
              <input
                defaultValue={new Date().toISOString().slice(0, 10)}
                {...register("sale_date", {
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                })}
                type="date"
                className={`bg-gray-50 border ${
                  errors.sale_date
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500 "
                    : "border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                } block text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            `}
                placeholder="Sale Date"
              />
              {errors.sale_date?.type === "required" && (
                <p className=" text-red-500 text-sm mt-1">
                  Sale Date is required
                </p>
              )}
              {errors.sale_date?.type === "minLength" && (
                <p className=" text-red-500 text-sm mt-1">
                  Sale Date must be greater than 3 characters
                </p>
              )}
              {errors.sale_date?.type === "maxLength" && (
                <p className=" text-red-500 text-sm mt-1">
                  Sale Date must be less than 20 characters
                </p>
              )}
            </div>
          </div>

          <div className=" flex flex-col justify-end items-end  mt-auto gap-3">
            <div className="flex items-center">
              <label
                htmlFor="redirect_to_detail"
                className="me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Redirect to Voucher Detail
              </label>
              <input
                {...register("redirect_to_detail")}
                form="infoForm"
                id="redirect_to_detail"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="flex items-center">
              <label
                htmlFor="all-correct"
                className="me-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Make sure all field are correct
              </label>
              <input
                {...register("all_correct")}
                required
                form="infoForm"
                id="all-correct"
                type="checkbox"
               
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <button
              type="submit"
              form="infoForm"
              className="text-white bg-blue-700 inline-flex gap-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>Confirm Voucher</span>
              {isSending && (
                <l-dot-Spinner
                  size="20"
                  stroke="5"
                  speed="0.9"
                  color="white"
                ></l-dot-Spinner>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoucherInfo;
