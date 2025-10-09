import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import "../btn.css";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url, {
      method: "get",
    });
    const dataresponse = await response.json();
    setAllProduct(dataresponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div>
      <div className="bg-white dark:bg-slate-800 py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg dark:text-white">All Products</h2>

        <button
          className="UploadBtn dark:bg-slate-700 dark:text-white"
          onClick={() => {
            setopenUploadProduct(true);
          }}
        >
          <span className="transition"></span>
          <span className="gradient"></span>
          <span className="label">Upload Product</span>
        </button>
      </div>
      {/* show all product component */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>
      {/* upload product component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => {
            setopenUploadProduct(false);
          }}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
