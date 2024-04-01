import React from "react";
import Sidebar from "../../../components/admin_manager/Sidebar/sidebar";
import User from "../../../components/admin_manager/Users/user";
import styles from "../../../components/admin_manager/admin.module.css";

const Page = () => {
  return (
      <div className="md:flex ">
      <Sidebar />
      <div className="pt-20 pl-20  pr-20 bg-sky-900 grow">
      <User />
      </div>
      
    </div>
  );
};

export default Page;
