import React, { useState, useEffect } from "react";
import { BeakerIcon } from "@heroicons/react/24/solid";

export default function Search(props) {
  const [activeCategory, setactiveCategory] = useState("All");

  const category = props.category;

  const categories = [
    "All",
    "Books",
    "Electronics",
    "Others",
  ];
  const handleCategoryClick = (category) => {
    props.setSelectedCategory(category);
  };
  return (
    <>
      <div className="md:border-[1px] w-full xl:w-full md:p-[15px]  rounded-[10px] border-[#190e7b] md:mt-[20px] mt-3 ">
        <label className=" flex w-full items-center ">
          <h1 className="mr-5 text-[22px] font-semibold ">Categories </h1>
          <span
            className="cursor-pointer"
            onClick={() => {
              props.setCategory(!category);
              props.setArticle(false);
              props.setImage(!props.image);
            }}
          >
            {category ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                />{" "}
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                fill="none"
                class="bi bi-chevron-down w-6 h-6"
                viewBox="0 0 16 16"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />{" "}
              </svg>
            )}
          </span>
        </label>
        <div className={`${category ? "block" : "hidden"} duration-300`}>
          {categories.map((selectedCategory) => (
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => {
                setactiveCategory(selectedCategory);
                handleCategoryClick(selectedCategory);
              }}
            >
              <div
                style={{
                  boxShadow: `${
                    activeCategory == selectedCategory
                      ? "6px 6px 24px 1px rgba(171, 181, 217, 0.18)"
                      : "none"
                  }`,
                }}
                className="  w-full flex h-[40px]  mt-[10px] border-[#F3F3F3] border rounded-lg bg-white p-[10px] items-center"
              >
                <div className="  border border-[#1A1A1A] w-[15px] h-[15px] rounded-[20px] bg-white mr-[10px] flex items-center justify-center p-[1px] ">
                  {activeCategory == selectedCategory && (
                    <div className="xsm:w-[9px] xsm:h-[9px] w-2 h-2 rounded-[30px] bg-black " />
                  )}{" "}
                </div>
                <div>{selectedCategory}</div>
              </div>
            </div>
          ))}
        </div>
        <hr className="md:hidden block w-full" />
      </div>
    </>
  );
}
