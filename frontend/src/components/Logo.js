import React from "react";
import mylogo from "../assest/app_logo.png";

const Logo = () => {
  return (
    <div className="h-14">
      <img
        src={mylogo}
        // src="https://img.freepik.com/premium-vector/simple-b2b-red-blue-typography-logo-design-template_76712-728.jpg"
        alt="Logo"
        className="h-full w-auto"
      />
    </div>
  );
};

export default Logo;
