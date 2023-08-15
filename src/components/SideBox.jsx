import React, { useState } from "react";
import Category from "./Category";
import AddArticle from "./AddArticle";
import banner from "./images/banner.avif";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../firebaseConfig";

export default function SideBox({ setSelectedCategory }) {
  const [article, setArticle] = useState(false);
  const [category, setCategory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(true);
  const [user] = useAuthState(auth);
  return (
    <>
      <img
        src={banner}
        className="fixed hidden md:block w-60 h-60 xl:right-[200px] md:right-10 lg:right-24 top-[60px] z-10"
        style={{ mixBlendMode: "multiply" }}
      />
      {window.innerWidth < 768 && (
        <div className="z-10 fixed  border-[1px]  right-6  bottom-[10px]  h-16 rounded-[20px] backdrop-blur-[14px]  bg-[#FFFFFF80] w-[104px]  shadow  shadow-[#FFFFFF, #FFFFFF]  ">
          <h1
            className="w-full   h-full flex justify-center items-center text-[#121212] font-bold text-[14px]"
            onClick={() => {
              if (!showModal) {
                setShowModal(true);
              } else {
                setShowModal(false);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            {showModal ? "Close" : "Add Post"}
          </h1>
        </div>
      )}
      {window.innerWidth >= 768 && (
        <div
          className={`flex flex-col fixed bottom-0 w-full md:w-[40%] md:right-[0.5rem] shadow-lg md:top-[270px] bg-white md:bg-transparent rounded-[8px] h-fit xl:px-8 px-4 py-2   justify-center items-center`}
        >
          <div className="w-full md:mb-3 mb-1">
            <Category
              category={category}
              setCategory={setCategory}
              setArticle={setArticle}
              setSelectedCategory={setSelectedCategory}
              setImage={setImage}
              image={image}
            />
          </div>
          <AddArticle
            article={article}
            setArticle={setArticle}
            setCategory={setCategory}
            setImage={setImage}
            image={image}
          />
        </div>
      )}
      {showModal && (
        <div className="   flex flex-col fixed bottom-0 w-full md:w-[40%] md:right-[0.5rem] shadow-lg md:top-[5rem] bg-white md:bg-transparent rounded-[8px] h-fit xl:px-8 px-4 py-2   justify-center items-center">
          <div className="w-full md:mb-3 mb-1">
            <Category
              category={category}
              setCategory={setCategory}
              setArticle={setArticle}
              setSelectedCategory={setSelectedCategory}
              setImage={setImage}
              image={image}
            />
          </div>
          <AddArticle
            article={article}
            setArticle={setArticle}
            setCategory={setCategory}
            setImage={setImage}
            image={image}
          />
        </div>
      )}
    </>
  );
}
