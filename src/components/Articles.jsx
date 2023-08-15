import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link } from "react-router-dom";

export default function Articles({
  setData,
  searchResults,
  setSearchResults,
  searchTerm,
  selectedCategory,
}) {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      setData(articles);
      setSearchResults(articles);
    });
  }, []);
  const filteredProducts = articles.filter((product) => {
    if (selectedCategory === "All" && searchTerm === "") {
      return true; 
    } else if (selectedCategory === "All") {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchTerm === "") {
      return product.addcategory === selectedCategory;
    } else {
      return (
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.addcategory === selectedCategory
      );
    }
  });
  const limitWord = (word, limit) => {
    if (word != null && word != undefined && word != "") {
      if (word.length > limit) {
        return word.slice(0, limit) + "...";
      } else {
        return word;
      }
    }
  };
  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        filteredProducts.map(
          ({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            createdBy,
            userId,
            addcategory,
            likes,
            comments,
          }) => (
            <div
              className=" w-full mb-[35px] flex flex-col rounded-[8px]  xsm:p-[10px] p-[5px] shadow-md border-[1px] border-blue-900  xsm:mt-4 mt-10"
              key={id}
            >
              <div className="sm:flex-row flex-col md:flex-col lg:flex-row flex bg-gray-100 h-fit w-full ">
                <div className="flex justify-center w-full ">
                  <Link to={`/article/${id}`}>
                    <img
                      src={imageUrl}
                      alt="title"
                      className="object-contain w-80 xsm:h-80 h-52"
                    />
                  </Link>
                </div>
                <div className=" xsm:pl-[20px] pl-3 pr-2 pt-1 w-full">
                  <div className="flex flex-col pr-[15px] mb-[10px] ">
                    <div className="flex w-full">
                      <div className="w-full flex items-center ">
                        {createdBy && (
                          <div className="flex w-full items-center">
                            <h3 className="text-[16px] font-bold mr-[8px] mt-2">
                              User:
                            </h3>
                            <span className="md:text-[28px] text-[18px] xsm:text-[22px]  text-gray-700 font-bold">
                              {createdBy}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-1 d-flex flex-row-reverse ">
                        {user && user.uid === userId && (
                          <DeleteArticle id={id} imageUrl={imageUrl} />
                        )}
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-800 font-bold ">
                      {createdAt.toDate().toDateString()}
                    </p>
                  </div>
                  <hr className="xsm:mt-[-10px] -mt-5 mb-2 xsm:mb-0" />
                  <h3 className="text-[16px] text-gray-800 font-bold">
                    Category: {addcategory}
                  </h3>

                  <h3 className="text-[24px] text-gray-600 font-bold">
                    {title}
                  </h3>

                  <h5 className="text-[16px] w-full text-gray-800">
                    {limitWord(description, 300)}
                  </h5>

                  <div className="d-flex flex-row-reverse">
                    {/* {user && <LikeArticle id={id} likes={likes} />}
                    <div className="pe-2">
                      <p>{likes?.length} likes</p>
                    </div> */}
                    {comments && comments.length > 0 && (
                      <div className="pe-2">
                        <p>{comments?.length} comments</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
