import React from "react";
import Container from "../components/Container";
import ModuleBtn from "../components/ModuleBtn";
import { HiCircleStack, HiUserCircle } from "react-icons/hi2";
import { HiComputerDesktop } from "react-icons/hi2";
import { HiDocumentDuplicate } from "react-icons/hi2";
import Logout from "../components/Logout";

const DashboardPage = () => {
  return (
    <section className="mt-1">
      <Container>
        {/* <Navbar /> */}

        <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className=" col-span-1 row-span-1">
            <ModuleBtn
              name={"Product Module"}
              icon={<HiCircleStack className=" size-14" />}
              url={"/dashboard/product"}
            />
          </div>
          <div className=" col-span-1 row-span-1">
            <ModuleBtn
              name={"Sale Module"}
              icon={<HiComputerDesktop className=" size-14" />}
              url={"/dashboard/sale"}
            />
          </div>
          <div className=" col-span-1 row-span-1">
            <ModuleBtn
              name={"Voucher Module"}
              icon={<HiDocumentDuplicate className=" size-14" />}
              url={"/dashboard/voucher"}
            />
          </div>
          <div className=" col-span-1 row-span-1">
            <ModuleBtn
              name={"User Profile"}
              icon={<HiUserCircle className=" size-14" />}
              url={"/dashboard/user-profile"}
            />
          </div>
        </div>

        <div className="flex gap-3 items-center justify-end mt-5">
          <p className=" text-sm text-stone-500">If you finish your job, just </p>
          <Logout />
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
