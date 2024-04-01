"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  const { data: session, status } = useSession();

  const navItems = [
    { key: crypto.randomUUID(), itemName: "Home", href: "/" },
    { key: crypto.randomUUID(), itemName: "Matches", href: "/fan/matches" },
  ];

  return (
    <>
      <nav className="navbar bg-base-100 bg-opacity-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems.map((item) => {
                return (
                  <li key={item.key}>
                    <a href={item.href}>{item.itemName}</a>
                    {/* Sub Items */}
                    {item.subItems && (
                      <ul className="p-2">
                        {item.subItems.map((nestedItem) => {
                          return (
                            <li key={nestedItem.key}>
                              <Link href={nestedItem.href}>
                                {nestedItem.itemName}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navItems.map((item) => {
              return (
                <li key={item.key}>
                  {/* No Sub Items */}
                  {!item.subItems && (
                    <Link href={item.href}>{item.itemName}</Link>
                  )}
                  {/* Sub Items */}
                  {item.subItems && (
                    <details>
                      <summary>{item.itemName}</summary>
                      <ul className="p-2">
                        {item.subItems.map((nestedItem) => {
                          return (
                            <li key={nestedItem.key} className="w-max pr-5">
                              <Link href={nestedItem.href}>
                                {nestedItem.itemName}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="navbar-end space-x-4">
          {/* If not authenticated */}
          {status === "authenticated" ? (
            <>
              <p>Welcome, {session.user.username}!</p>
              <button type="button" onClick={() => signOut()} className="btn">
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => signIn()}
                className="btn btn-primary"
              >
                Login
              </button>
              <Link className="btn" href="/fan/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

// Nested sub items
// // {
// //   key: crypto.randomUUID(),
// //   itemName: "Item 2",
// //   subItems: [
// //     { key: crypto.randomUUID(), itemName: "Sub Item 1", href: "#" },
// //     { key: crypto.randomUUID(), itemName: "Sub Item 2", href: "#" },
// //   ],
// // },
