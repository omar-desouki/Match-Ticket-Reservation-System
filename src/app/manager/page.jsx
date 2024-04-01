"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Manager = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "authenticated" && (
        <>
          <h1 className="text-2xl ">
            Welcome, <span className="font-bold">{session.user.username}!</span>
          </h1>
        </>
      )}

      <p>This is your dashboard.</p>
    </>
  );
};

export default Manager;
