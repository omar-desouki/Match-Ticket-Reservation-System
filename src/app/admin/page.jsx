import React from "react";
import Sidebar from "../../components/admin_manager/Sidebar/sidebar";
import Userpending from "../../components/admin_manager/Users/userpending";


const Admin = () => {
  return (
    <div className="md:flex ">
      <Sidebar />
      <div className="pt-20 pl-20  pr-20 bg-sky-900 grow">
      <Userpending />
      </div>
      
    </div>
  );
};

export default Admin;
