import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { HiCamera, HiEnvelope, HiPencilSquare, HiUser } from "react-icons/hi2";
import { HiLockOpen } from "react-icons/hi";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const UserProfilePage = () => {
  const {
    user: { name, email, profile_image },
  } = useUserStore();
  
  return (
    <section>
      <Container>
        <Breadcrumb currentPageTitle={"User Profile"} />

        <div className=" flex flex-col items-center rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
          <div className="relative">
            <img
              className="size-80 rounded object-cover object-top mt-3"
              src={
                profile_image
                  ? profile_image
                  : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
              }
              alt="user photo"
            />
            <Link to="user-change-image" className="absolute right-0 top-5/6 transform -translate-y-1/2">
              <HiCamera className="size-8" />
            </Link>
          </div>

          <div className="p-3">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              <div className="flex gap-1 items-center align-middle py-3">
                <HiUser />
                {name}
                <Link to="user-change-name">
                  <HiPencilSquare className=" size-4" />
                </Link>
              </div>
            </h3>
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <HiEnvelope />
              {email}
            </span>
            <Link
              to={"/dashboard/user-profile/user-change-password"}
              className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center inline-flex items-center dark:focus:ring-blue-800 me-2 mb-2"
            >
              <HiLockOpen className="w-4 h-4 me-2" />
              Change Your Password
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default UserProfilePage;
