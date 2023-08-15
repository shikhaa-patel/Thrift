import Articles from "./components/Articles";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Article from "./components/Article";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import SideBox from "./components/SideBox";
import HeroSection from "./components/HeroSection";

function App() {
  const [user] = useAuthState(auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          {!user && <Route path="/" element={<HeroSection />} />}
          {user && <Route
            path="/"
            element={
              <div className="xl:flex flex-col-reverse w-full pb-[48px] md:pb-0 ">
                <div className=" mt-14 px-4 w-full md:w-[60%]   flex">
                  <Articles
                    searchTerm={searchTerm}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    setData={setData}
                    selectedCategory={selectedCategory}
                  />
                </div>
                <div>
                  <SideBox setSelectedCategory={setSelectedCategory} />
                </div>
              </div>
            }
          />}

          <Route path="/signin" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
          <Route
            path="/home"
            element={
              <div className="xl:flex flex-col-reverse w-full pb-[48px] md:pb-0 ">
                <div className=" mt-14 px-4 w-full md:w-[60%]   flex">
                  <Articles
                    searchTerm={searchTerm}
                    searchResults={searchResults}
                    setSearchResults={setSearchResults}
                    setData={setData}
                    selectedCategory={selectedCategory}
                  />
                </div>
                <div>
                  <SideBox setSelectedCategory={setSelectedCategory} />
                </div>
              </div>
            }
          />
        </Routes>
        <Navbar
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          setSearchResults={setSearchResults}
          data={data}
          selectedCategory={selectedCategory}
        />
      </Router>
    </div>
  );
}

export default App;
