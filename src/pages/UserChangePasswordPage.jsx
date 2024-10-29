import React, { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import useCookie, { removeCookie } from "react-use-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { tailChase } from "ldrs";

tailChase.register();

const UserChangePasswordPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [userToken, setUserToken] = useCookie("my_token");
  const [profileToken, setProfileToken] = useCookie("my_profile");

  const [isLoading, setIsLoading] = useState(false);
  tailChase.register();
  const nav = useNavigate();
  const changeUserNameBtnHandler = async (data) => {
    setIsLoading(true);
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const json = await res.json();

    if (res.status === 200) {
      toast.success("Password changed successfully");
      setProfileToken(JSON.stringify(json.user));
      setIsLoading(false);
      removeCookie("my_token");
      nav("/");
      reset();
    } else {
      toast.error(json.message);
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Breadcrumb
        links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
        currentPageTitle={"Change Password"}
      />
      {/* <Toaster position="top-right" /> */}

      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Change Password
        </h2>
        <form
          onSubmit={handleSubmit(changeUserNameBtnHandler)}
          className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          action="#"
        >
          <div>
            <label
              htmlFor="old_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Old Password
            </label>
            <input
              {...register("old_password")}
              type="password"
              id="old_password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="******"
              required
            />
          </div>
          <div>
            <label
              htmlFor="new_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              {...register("new_password")}
              type="password"
              id="new_password"
              placeholder="******"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="new_password_confirmation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              {...register("new_password_confirmation")}
              type="password"
              id="new_password_confirmation"
              placeholder="******"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="newsletter"
                aria-describedby="newsletter"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="newsletter"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {isLoading ? ( // Default values shown
              <l-tail-chase size="20" speed="1.75" color="white"></l-tail-chase>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default UserChangePasswordPage;
