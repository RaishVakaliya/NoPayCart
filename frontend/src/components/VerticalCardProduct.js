import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import "./CartBtn.css";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading, excludeProductId }) => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef(0);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddtoCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setloading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setloading(false);
    // Filter out the current product if excludeProductId is provided
    const filteredData = excludeProductId
      ? categoryProduct?.data?.filter(product => product._id !== excludeProductId) || []
      : categoryProduct?.data || [];
    setdata(filteredData);
  };

  useEffect(() => {
    fetchData();
  }, [category, excludeProductId]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-4 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white rounded-full shadow-md p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft className="text-black" />
        </button>
        <button
          className="bg-white rounded-full shadow-md p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight className="text-black" />
        </button>
        {loading
          ? loadingList.map((product, index) => {
            return (
              <div
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
                key={"product" + index}
              >
                <div className="bg-slate-300 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis py-2 line-clamp-1 text-black animate-pulse p-1 rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 animate-pulse py-2 p-1 rounded-full bg-slate-200"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium py-2 animate-pulse p-1 rounded-full bg-slate-200 w-full"></p>
                    <p className="text-slate-500 line-through py-2 animate-pulse p-1 rounded-full bg-slate-200 w-full"></p>
                  </div>

                  {/*  */}
                  <button className="px-6 py-2 animate-pulse rounded-full bg-slate-200 cursor-default">
                    <div className="">
                      <div className="button-wrapper">
                        <div className="text">Add To Cart</div>
                        <span className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-cart2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>

                  {/*  */}
                </div>
              </div>
            );
          })
          : data.map((product, index) => {
            return (
              <Link
                to={"product/" + product?._id}
                className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] dark:bg-gray-900  bg-white rounded-sm shadow"
                key={"product" + index}
              >
                <div className="bg-slate-300 h-48 p-4 min-w-[120px] md:min-w-[145px] dark:bg-gray-700 flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    alt=""
                    className="h-full object-scale-down transition-all hover:scale-110 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black dark:text-slate-300">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500 dark:text-gray-400">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium dark:text-red-400">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through dark:text-gray-400">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>

                  {/* cart button */}
                  <button
                    className="px-1.6 py-0.5"

                  >
                    <div className="buttonClass">
                      <div className="button-wrapper">
                        <div className="text" onClick={(e) => {
                          handleAddtoCart(e, product?._id);
                        }}>Add To Cart</div>
                        <span className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="bi bi-cart2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </button>

                  {/*  */}
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
