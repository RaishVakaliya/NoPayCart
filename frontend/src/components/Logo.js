import React from "react";
import mylogo from "../assest/app_logo.png";

const Logo = () => {
  return (
    <div className="h-14 select-none">
      <img src={mylogo} alt="Logo" className="h-full w-auto" />
    </div>
  );
};

export default Logo;
