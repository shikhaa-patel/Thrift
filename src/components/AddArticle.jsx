import React, { useState, useRef, useEffect } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "./../firebaseConfig";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import "../App.css";

export default function AddArticle(props) {
  const article = props.article;
  const dropdownRef = useRef(null);
  const [user] = useAuthState(auth);
  const [newCategory, setNewCategory] = useState("All");
  const [dropdown, setDropdown] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    addcategory: "",
    createdAt: Timestamp.now().toDate(),
  });
  const categories = ["Books", "Electronics", "Others"];

  function handleCategoryChange(category) {
    setNewCategory(category);
    setFormData({ ...formData, addcategory: category });
  }
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handlePublish = () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.addcategory ||
      !formData.image
    ) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
          addcategory: "",
        });
        setNewCategory("All");
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            addcategory: formData.addcategory,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
              console.log(err);
            });
        });
      }
    );
  };

  return (
    <div className="md:border md:p-3 xl:mt-3  mt-2  mb-4 w-full rounded-[10px] border-[#190e7b] pb-3 md:pb-0">
      {!user ? (
        <>
          <h2 className="text-[18px] text-black">
            Login to post or buy -{" "}
            <Link to="/signin" className="text-[#190e7b] font-bold">
              Login
            </Link>
          </h2>
          <h2 className="text-[18px] text-black">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#190e7b] font-bold">
              Signup
            </Link>
          </h2>
        </>
      ) : (
        <div className="md:overflow-y-scroll overflow-x-hidden md:max-h-80 md:pr-2">
          <label className="text-[22px] font-semibold flex md:p-1 ">
            <h1 className="mr-5 text-[22px] font-semibold mt-[-2px]">
              Add Product
            </h1>
            <span
              onClick={() => {
                props.setArticle(!article);
                props.setCategory(false);
                props.setImage(!props.image);
              }}
              className="cursor-pointer"
            >
              {article ? (
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
          {article && (
            <>
              <div className="form-group flex flex-col">
                <label htmlFor="" className="font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className=" mb-[8px] w-full h-[30px] p-[5px] xsm:h-[35px] border border-[#DFDBD8] rounded-[8px] py-[9px]  xsm:pl-[12px] xl:pl-[8px] mt-[4px] font-normal  "
                  value={formData.title}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-group flex flex-col">
                <div className="flex flex-col">
                  <label htmlFor="" className="font-semibold">
                    Category
                  </label>
                  <label
                    htmlFor=""
                    className="border border-[#DFDBD8] rounded-[8px]  py-[9px]  xsm:pl-[12px] xl:pl-[8px] mb-2  mt-2 text-[13px] pr-3 items-center flex justify-between pl-2 "
                    onClick={(e) => {
                      setDropdown(!dropdown);
                    }}
                  >
                    {newCategory}
                    <span className="cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </span>
                  </label>
                </div>

                {dropdown && (
                  <div
                    className=" w-full max-h-[300px]   text-[14px] bg-[#ffffff]   p-[0.5rem] rounded-[0.5rem]  mb-3"
                    style={{
                      boxShadow:
                        "0.5rem 0.5rem 2.5rem 0.0625rem rgba(171, 181, 217, 0.32)",
                    }}
                    ref={dropdownRef}
                  >
                    {categories.map((category) => (
                      <div
                        className=" p-[0.6125rem] rounded-[0.5rem] text-left flex hover:cursor-pointer hover:bg-[#f3f3f3] hover:font-medium "
                        key={category}
                        value={newCategory}
                        name="country"
                        onClick={(e) => {
                          handleCategoryChange(category);
                          setDropdown(!dropdown);
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <label htmlFor="" className="font-semibold">
                Description
              </label>
              <input
                name="description"
                className="mb-[8px] w-full h-[50px] p-[5px] xsm:h-[55px] border border-[#DFDBD8] rounded-[8px] py-[9px]  xsm:pl-[12px] xl:pl-[8px] mt-[4px] font-normal "
                value={formData.description}
                onChange={(e) => handleChange(e)}
              />

              <label htmlFor="" className="font-semibold mr-[15px]">
                Image:{" "}
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className=" mb-[12px]"
                onChange={(e) => handleImageChange(e)}
              />
              {imageUrl !== "" && (
                <div className="relative">
                  <div className="border absolute w-full h-full rounded-[12px] bg-white flex justify-center items-center">
                    <img
                      src={imageUrl}
                      alt={"image"}
                      className="w-auto max-h-full"
                    />
                  </div>
                </div>
              )}
{console.log("image",imageUrl)}
              {progress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped mt-2"
                    style={{ width: `${progress}%` }}
                  >
                    {`uploading image ${progress}%`}
                  </div>
                </div>
              )}
              <button
                className="w-full h-[35px] text-[20px] text-white font-medium rounded-[8px] bg-[#190e7b] mt-2"
                onClick={handlePublish}
              >
                Post
              </button>
            </>
          )}
        </div>
      )}
      <hr className="md:hidden block w-full" />
    </div>
  );
}
