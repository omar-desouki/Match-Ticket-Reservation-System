import React from "react";
import Logo from "../fan_guest/Logo";
import Link from "next/link";
import Logout from "./Logout";

const Sidebar = () => {
  return (
    <>
      <div className="bg-base-200 md:fixed md:top-0 md:left-0 md:z-40 md:w-64 md:h-screen md:py-5 max-md:flex max-md:flex-row w-full">
        <Logo />
        <ul className="menu md:menu-vertical menu-horizontal rounded-box w-full flex md:justify-center justify-end max-md:items-center">
          <li>
            <Link href="/manager/addstadium">Add Stadium</Link>
          </li>
          <li>
            <details>
              <summary>Matches</summary>
              <ul>
                <li>
                  <Link href="/manager/addmatch">Add Match</Link>
                </li>
                <li>
                  <Link href="/manager/edit-match">Edit Match</Link>
                </li>
                <li>
                  <Link href={"/manager/match-details"}>
                    View Match Details
                  </Link>
                </li>
                <li>
                  <Link href={"/manager/view-seats"}> Seats</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
