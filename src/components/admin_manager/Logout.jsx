"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Logout = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "authenticated" && (
        <>
          <button
            type="button"
            onClick={() => signOut()}
            className="btn btn-primary rounded-md flex flex-nowrap justify-center items-center"
          >
            Log out
          </button>
        </>
      )}
    </>
  );
};

export default Logout;
