import React from "react";
import Container from "../components/Container";
import useCookie from "react-use-cookie";
import Breadcrumb from "../components/Breadcrumb";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../stores/useUserStore";


const UserProfileChangeNamePage = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const {
    user: { name, email, profile_image },
  } = useUserStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [token] = useCookie("my_token");
  const { user, setUser } = useUserStore();
  const handleUpdateName = async (data) => {
    console.log(data);

    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-name",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();

    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
    } else {
      toast.error(json.message);
    }
  };

  return (
    <section>
      <Container>
        <Breadcrumb
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
          currentPageTitle={"Change Name"}
        />

        <div className="w-full p-6 bg-white mx-auto rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change your name?
          </h1>

          <form
            onSubmit={handleSubmit(handleUpdateName)}
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Update your name
              </label>
              <input
                {...register("name")}
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="eg.Kyaw Gyi"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
             Update Name
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default UserProfileChangeNamePage;
