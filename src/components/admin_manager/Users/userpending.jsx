"use client";
import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, updateUser } from "@/src/app/api/actions/user";

const User = ({ searchParams }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "/api/user/?" +
        new URLSearchParams({
          approved: false,
        })
    )
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
        // console.log(users);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCancelUser = async (user) => {
    try {
      await deleteUser(user);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleApproveUser = async (user) => {
    try {
      await updateUser(user);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="overflow-x-auto ">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Gender</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className="hover">
              <th>{index + 1}</th>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>{user.gender}</td>
              <td>{user.approved ? "Approved" : "Not Approved"}</td>

              <td>
                {" "}
                <button
                  className="btn glass"
                  onClick={() => handleApproveUser(user)}
                >
                  Approve
                </button>
              </td>
              <td>
                <button
                  className="btn glass"
                  onClick={() => handleCancelUser(user)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
