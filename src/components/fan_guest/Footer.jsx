import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start w-5/6">
          {/* Copyright information */}
          <div className="max-lg:order-5">
            <Logo extraStyle="p-0" />
            <p>Providing reliable ticketing since 2023</p>
            <p className="text-sm pt-7">
              &copy; 2023 EgyptCheer. All rights reserved.
            </p>
          </div>
          {/* Contact information */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <a href="mailto:ahmedtarekabd2002@gmail.com">
              Email: ahmedtarekabd2002@gmail.com
            </a>
            <p>Phone: +1 123 456 7890</p>
          </div>

          {/* Quick links to important pages */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/fan/matches">Matches</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
