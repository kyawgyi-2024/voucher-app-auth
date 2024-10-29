import React, { useRef } from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import useCookie from "react-use-cookie";
import { HiCamera } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import useUserStore from "../stores/useUserStore";
import toast from "react-hot-toast";

const UserProfileChangeImagePage = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const { name, email, profile_image } = JSON.parse(userCookie);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [token] = useCookie("my_token");

  const { user, setUser } = useUserStore();
  const fileInputRef = useRef(null);

  const handleUpdateImage = async (event) => {
    // console.log(event.target.files[0]);
    const formData = new FormData();
    formData.append("profile_image", event.target.files[0]);

    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-profile-image",
      {
        method: "POST",
        body: formData,
        headers: {
          //   "Content-Type": "application/json",
          //   "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();

    // console.log(json);

    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
    } else {
      toast.error(json.message);
    }
  };
  const handleImageUploader = () => {
    // console.log(fileInputRef.current);
    fileInputRef.current.click();
  };
  return (
    <section>
      <Container>
        {/* <Navbar /> */}
        <Breadcrumb
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
          currentPageTitle={"Change Image"}
        />

        <div className="flex-col items-center rounded-lg sm:flex dark:bg-gray-800 dark:border-gray-700">
          <div className="relative">
            <img
              className=" size-80 rounded object-top object-cover m-3"
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="user photo"
            />
            <button
              onClick={handleImageUploader}
              className=" absolute  bottom-0 -right-0 translate-x-1/2 -translate-y-1/2 size-8 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-200"
            >
              <HiCamera className=" size-3" />
            </button>
          </div>

          <form
            // {...register("profile_image",{
            //   required : true
            // })

            // }
            // className="p-3 flex flex-col"
          >
            {/* <label htmlFor="profile_image"></label> */}
            <input
              onChange={handleUpdateImage}
              ref={fileInputRef}
              className=" hidden me-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="profile_image"
              type="file"
            />
            {/* <button
              type="submit"
              className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center inline-flex items-center dark:focus:ring-blue-800 me-2 mb-2"
            >
              <HiCamera className="w-4 h-4 me-2" />
              Update Your Photo
            </button> */}
          </form>
        </div>
      </Container>
    </section>
  );
};

export default UserProfileChangeImagePage;
