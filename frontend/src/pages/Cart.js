import React, { useCallback, useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import "./addRemoveBtn.css";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.ProductCount).fill(null);

  const fetchData = useCallback( async () => {
    const response = await fetch(SummaryApi.viewCartProduct.url, {
      method: SummaryApi.viewCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setdata(responseData.data);
    }
  },[]);

  const handleLoading = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    setloading(true);
    handleLoading();
    setloading(false);
  }, [handleLoading]);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const dataResponse = await response.json();

    if (dataResponse.success) {
      fetchData();
    }
  };

  const decreaaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const dataResponse = await response.json();

    if (dataResponse.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="py-5 bg-white dark:text-gray-500">
            no Product added in Cart
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    className="h-32 w-full bg-slate-200 my-2 border border-slate-300 animate-pulse"
                    key={el + index}
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    className="h-32 w-full bg-white my-2 border dark:bg-gray-900 border-none grid grid-cols-[128px,1fr]"
                    key={product?._id + index}
                  >
                    {" "}
                    <div className="w-32 h-32 bg-slate-200 dark:bg-gray-700">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply dark:mix-blend-normal"
                      />
                    </div>
                    <div className="px-4 py-1 relative">
                      <div
                        className="absolute right-0 text-red-600 rounded-full cursor-pointer hover:bg-red-600 p-2 hover:text-white"
                        onClick={() => {
                          deleteCartProduct(product?._id);
                        }}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1 dark:text-slate-300">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500 dark:text-gray-400">
                        {product?.productId?.category}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg dark:text-slate-400">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>

                        <p className="text-slate-600 font-semibold text-lg  dark:text-slate-300">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          className="vista-button"
                          onClick={() => {
                            decreaaseQty(product?._id, product?.quantity);
                          }}
                        >
                          <div>−</div>
                        </button>
                        <span className="">{product?.quantity}</span>
                        <button
                          className="vista-button"
                          onClick={() => {
                            increaseQty(product?._id, product?.quantity);
                          }}
                        >
                          <div>+</div>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* summary of cart */}
        {data.length > 0 && (
          <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border my-2 border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 my-2 px-4 py-1">
                  Summary
                </h2>
                <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex justify-between items-center px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button className="bg-blue-600 p-2 mt-2 w-full text-white">
                  Payment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
