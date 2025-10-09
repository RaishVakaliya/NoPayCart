import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import SearchVerticalCard from "../components/SearchVerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [filterCategoryList, setfilterCategoryList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);

  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();

    setdata(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setfilterCategoryList(arrayOfCategory);

    // formart for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setdata((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setdata((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto p-4">
      {/* desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className="bg-white dark:bg-gray-800 p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/* sort by */}
          <div>
            <h3 className="text-base text-stone-500 dark:text-gray-300 font-medium uppercase border-b pb-1 border-slate-300 dark:border-gray-700">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  onChange={handleOnChangeSortBy}
                  checked={sortBy === "asc"}
                />
                <label className="dark:text-white">Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  onChange={handleOnChangeSortBy}
                  checked={sortBy === "dsc"}
                />
                <label className="dark:text-white">Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* filter by */}
          <div>
            <h3 className="text-base text-stone-500 dark:text-gray-300 font-medium uppercase border-b pb-1 border-slate-300 dark:border-gray-700">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div
                    className="flex items-center gap-3"
                    key={categoryName + index}
                  >
                    <input
                      type="checkbox"
                      name={"category"}
                      value={categoryName?.value}
                      checked={selectCategory[categoryName?.value]}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value} className="dark:text-white">
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* right side (product) */}
        <div className="px-4">
          <p className="font-medium text-slate-800 dark:text-white text-lg my-2">
            Search Results : {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll">
            {data.length !== 0 && (
              <SearchVerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
