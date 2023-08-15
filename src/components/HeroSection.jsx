import React from "react";
import "./hero.css";
import About from "./About";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <>
      <body>
        <div class="landing">
          <div class="bg"></div>
          <div class="container landing-flex">
            <p
              className="fs-1 fw-bolder"
              style={{
                letterSpacing: "-2px",
                lineHeight: "calc(2.5rem + .5vw)",
                fontFamily: "Roboto Mono, monospace",
              }}
            >
              You are not alone <br />
              You have peers...
            </p>
            <p className="ms-1 opacity-75 fw-bold">
              {" "}
              A platform for you to donate the books you don't need any more{" "}
              <br />
              And acquire the things you need
            </p>
            <p className="ms-1 fw-bold">
              "When we give cheerfully and accept gratefully, everyone is
              blessed"
            </p>
            
              <Link
                class="bg-white mt-3 rounded-lg flex justify-center items-center text-center w-44 h-12 text-black font-bold no-underline hover:font-black"
                to="/register"
              >
                Get Started
              </Link>
            
          </div>
        </div>
        <main id="main">
          <section class="white-section">
            <div class="container">
              <About />
            </div>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </>
  );
}

export default HeroSection;
