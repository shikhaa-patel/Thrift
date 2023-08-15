import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeArticle from "./LikeArticle";
import Comment from "./Comment";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);

  return (
    <div className="flex justify-center  items-center w-full h-1/2  xl:py-20 py-10">
      {previewImage && (
        <div
          className="flex fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full  flex-col  bg-[#ffffff4D] backdrop-blur-xl  rounded-t-2xl  w-screen justify-center items-center p-5 md:p-2 overflow-hidden mt-10 "
          style={{ zIndex: "9" }}
        >
          <img
            src={article.imageUrl}
            alt="Preview"
            className="relative xl:h-[600px]  w-full  h-[500px] sm:h-[550px] object-contain  rounded"
          />
          <button
            className="text-[22px] font-bold"
            onClick={() => setPreviewImage(false)}
          >
            Close
          </button>
        </div>
      )}
      <div
        className="container bg-gray-100 shadow-lg "
        style={{ marginTop: 70 }}
      >
        {article && (
          <div className=" md:flex-col flex-col lg:flex-row  flex bg-gray-100 w-full xl:h-[500px]">
            <div className=" flex justify-center items-center bg-gray-700 p-3 lg:w-1/2">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="object-contain h-80 md:h-96  xl:h-full w-full "
                onClick={() => setPreviewImage(true)}
              />
            </div>
            <div className=" mt-3 pr-2 pl-4 lg:w-[70%]  ">
              <h2 className="text-[20px] font-bold">{article.title}</h2>
              <h5 className="font-semibold">User: {article.createdBy}</h5>
              <h6> Posted on: {article.createdAt.toDate().toDateString()}</h6>
              <hr />
              <h4 className="text-[16px]">{article.description}</h4>
              <h4 className="text-[16px]">{article.addcategory}</h4>

              {user && (
                <div className="lg:h-[300px] pb-2">
                  <Comment id={article.id} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
