import Link from "next/link";
import React from "react";

const Logo = ({ extraStyle = "" }) => {
  return (
    <Link className={"btn btn-ghost text-xl " + extraStyle} href="/">
      EgyptCheer
    </Link>
  );
};

export default Logo;
