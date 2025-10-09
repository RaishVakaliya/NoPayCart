import React, { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import "./login.css";

const Login = () => {
  const [showPassword, SetshowPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto items-center">
        <div className="p-5 w-full max-w-sm mx-auto">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-title">
              <span>sign in to your</span>
            </div>
            <div className="title-2">
              <span>SPACE</span>
            </div>
            <div className="input-container p-2">
              <input
                placeholder="Email"
                type="email"
                required
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="input-mail"
              />
              <span> </span>
            </div>
            <section className="bg-stars">
              <span className="star" />
              <span className="star" />
              <span className="star" />
              <span className="star" />
            </section>
            <div className="input-container p-2">
              <div className="flex justify-center relative">
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  onChange={handleOnChange}
                  value={data.password}
                  className="input-pwd pr-10"
                />
                <div
                  className="cursor-pointer text-xl absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => SetshowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            {/* <Link
              to={"/forgot-password"}
              className="signup-link up block w-fit ml-auto hover:underline hover:text-red-400"
            >
              forgot password?
            </Link> */}
            <div className="pt-2">
              <button className="submit" type="submit">
                <span className="sign-text">Sign in</span>
              </button>
            </div>

            <p className="signup-link pt-3">
              Don't have an account?{" "}
              <Link to={"/signup"} className="up">
                Sign Up!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
