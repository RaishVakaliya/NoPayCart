import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import productCategory from "../helpers/productCategory";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: "",
    description: "",
    price: "",
    sellingPrice: "",
  });

  const [openFullScreenImage, setopenFullScreenImage] = useState(false);
  const [fullScreenImage, setfullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await uploadImage(file);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...preve.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDeleteProductImage = async (index) => {
    // console.log("image index", index);

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((preve) => {
      return {
        ...preve,
        productImage: [...newProductImage],
      };
    });
  };

  // product submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-25 dark:bg-slate-950 dark:bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Uoload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 dark:hover:text-red-400 cursor-pointer text-slate-700 dark:text-slate-300"
            onClick={onClose}
          >
            <AiOutlineClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="productName"
            className="text-slate-700 dark:text-slate-200"
          >
            Product Name :
          </label>
          <input
            type="text"
            id="productName"
            required
            placeholder="enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400"
          />

          <label
            htmlFor="brandName"
            className="mt-3 text-slate-700 dark:text-slate-200"
          >
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            required
            placeholder="enter product brand"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400"
          />

          <label
            htmlFor="category"
            className="mt-3 text-slate-700 dark:text-slate-200"
          >
            Category :
          </label>
          <select
            name="category"
            required
            value={data.category}
            className="p-2 bg-slate-100 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
            onChange={handleOnChange}
          >
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>

          <label
            htmlFor="productImage"
            className="mt-3 text-slate-700 dark:text-slate-200"
          >
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center cursor-pointer dark:bg-slate-700 dark:border-slate-600">
              <div className="text-slate-500 dark:text-slate-300 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <MdCloudUpload />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer dark:bg-slate-700 dark:border-slate-600"
                        onClick={() => {
                          setopenFullScreenImage(true);
                          setfullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden cursor-pointer group-hover:block"
                        onClick={() => {
                          handleDeleteProductImage(index);
                        }}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-red-700 dark:text-red-400">
                *Please upload product image
              </p>
            )}
          </div>

          <label
            htmlFor="price"
            className="mt-3 text-slate-700 dark:text-slate-200"
          >
            Price :
          </label>
          <input
            type="number"
            id="price"
            required
            placeholder="enter price"
            name="price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400"
          />

          <label
            htmlFor="sellingPrice"
            className="mt-3 text-slate-700 dark:text-slate-200"
          >
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            required
            placeholder="enter selling price"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400"
          />

          <label
            htmlFor="description"
            className="mt-3 text-slate-700 dark:text-slate-200"
          >
            Description :
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400"
            placeholder="enter product description"
            rows={3}
            name="description"
            value={data.description}
            onChange={handleOnChange}
          ></textarea>

          <button className="py-3 bg-blue-600 hover:bg-blue-700 text-white mb-5">
            Upload Product
          </button>
        </form>
      </div>

      {/* display image full screen component */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => {
            setopenFullScreenImage(false);
          }}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
