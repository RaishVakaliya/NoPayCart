import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [EditProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white dark:bg-slate-800 rounded p-4">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            alt=""
            src={data?.productImage[0]}
            width={120}
            height={120}
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2 dark:text-slate-300">
          {data?.productName}
        </h1>
        <div>
          <p className="font-semibold dark:text-slate-300">
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <div
            className="w-fit ml-auto p-2 bg-green-100 dark:bg-green-800 hover:bg-green-500 dark:hover:bg-green-700 cursor-pointer rounded-full hover:text-white dark:text-slate-300"
            onClick={() => {
              setEditProduct(true);
            }}
          >
            <MdEdit />
          </div>
        </div>
      </div>

      {EditProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => {
            setEditProduct(false);
          }}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
