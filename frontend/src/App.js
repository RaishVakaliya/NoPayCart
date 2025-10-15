import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import { useCallback, useEffect, useState } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const [ProductCount, setProductCount] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Apply or remove dark class from document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();
      console.log("fetchUserDetails response:", dataApi);

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
        console.log("User details set:", dataApi.data);
      } else {
        console.log("Failed to fetch user details:", dataApi.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, [dispatch]);

  const fetchUserAddToCart = useCallback(async () => {
    const dataResponse = await fetch(SummaryApi.CartProductCount.url, {
      method: SummaryApi.CartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    setProductCount(dataApi?.data?.count); //this count is come from user controller->CountCartProduct
  }, []);

  useEffect(() => {
    /* user details */
    fetchUserDetails();
    // user cart product details
    fetchUserAddToCart();

    // Apply theme on initial load
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [fetchUserDetails, fetchUserAddToCart, theme]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, //user details fetch
          ProductCount, //current user's cart product count
          fetchUserAddToCart,
          theme,
          toggleTheme,
        }}
      >
        <ToastContainer
          position="top-center"
          theme={theme}
          autoClose={2000}
          transition={Flip}
          pauseOnHover={false}
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16 dark:bg-gray-800 dark:text-white">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
