import React, { useEffect } from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);
  return (
     <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white dark:bg-slate-800 min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center dark:text-slate-300">
            {user?.profilePic ? (
              <img
                src={user.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <PiUserCircleDuotone />
            )}
          </div>
          <p className="capitalize text-lg font-semibold dark:text-slate-200">{user?.name}</p>
          <p className="text-sm dark:text-slate-300">{user?.role}</p>
        </div>

        {/* navigation */}

        <div>
          <nav className="grid">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">
              All Products
            </Link>
          </nav>
        </div>
      </aside>

      <main className="h-full w-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
