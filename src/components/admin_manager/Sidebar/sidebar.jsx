"use client";
import Image from "next/image";
import MenuLink from "../menulink/menulink";
import React, { useState, useEffect } from "react";
import styles from "../Sidebar/sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
} from "react-icons/md";
import { BsFillPersonDashFill } from "react-icons/bs";
import { HiMiniHome } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Home",
        path: "/",
        icon: <HiMiniHome />,
      },
    ],
  },
  // {
  //   title: "User",
  //   list: [
  //     {
  //       title: "Settings",
  //       path: "/admin/settings",
  //       icon: <MdOutlineSettings />,
  //     },
  //     {
  //       title: "Help",
  //       path: "/admin/help",
  //       icon: <MdHelpCenter />,
  //     },
  //   ],
  // },
];

const Sidebar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      } else {
        setMenuOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles.userDetail}>
          <span className={styles.userTitle}>Administrator</span>
        </div>

        <div className={styles.menuToggle} onClick={toggleMenu}>
          <span className={styles.menuIcon}>
            <IoMenu />
          </span>
        </div>
      </div>

      {!isMenuOpen && (
        <ul className={styles.list}>
          {menuItems.map((cat) => (
            <li key={cat.title}>
              <span className={styles.cat}>{cat.title}</span>
              {cat.list.map((item) => (
                <MenuLink item={item} key={item.title} />
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
