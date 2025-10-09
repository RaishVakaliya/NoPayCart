import React, { useState } from "react";
import loginicons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import "./login.css";

const SignUp = () => {
  const [showPassword, SetshowPassword] = useState(false);
  const [showConfirmPassword, SetshowConfirmPassword] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setdata((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();
      // console.log("data", dataApi);

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("password and confirm password do not match");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto items-center">
        <div className="p-5 w-full max-w-sm mx-auto">
          {/* <div className="h-20 w-20 mx-auto relative overflow-hidden rounded-full">
            <div className="">
              <img src={data.profilePic || loginicons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer py-1 text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div> */}

          <form className="form" onSubmit={handleSubmit}>
            <div className="h-20 w-20 mb-2 mx-auto relative overflow-hidden rounded-full">
              <div className="">
                <img src={data.profilePic || loginicons} alt="login icons" />
              </div>
              <form>
                <label>
                  <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer py-1 text-center absolute bottom-0 w-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadPic}
                  />
                </label>
              </form>
            </div>

            <div className="input-container p-2">
              <input
                type="text"
                required
                placeholder="Name"
                name="name"
                value={data.name}
                onChange={handleOnChange}
                className="input-mail"
              />
            </div>

            <div className="input-container p-2">
              <input
                type="email"
                required
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="input-mail"
              />
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
                  type={showPassword ? "text" : "password"}
                  required
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="Password"
                  className="input-pwd pr-10"
                />
                <div
                  className="cursor-pointer text-xl absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => SetshowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div className="input-container p-2">
              <div className="flex justify-center relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="input-pwd pr-10"
                />
                <div
                  className="cursor-pointer text-xl absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => SetshowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button className="submit" type="submit">
                <span className="sign-text">Sign Up</span>
              </button>
            </div>

            <p className="signup-link pt-3">
              Already have an account?{" "}
              <Link to={"/login"} className="up">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
