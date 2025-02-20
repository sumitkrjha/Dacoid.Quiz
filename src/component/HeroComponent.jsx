import React from "react";
import heroImage from "../assets/heroimage.png";
import { Link } from "react-router-dom";
const HeroComponent = () => {
  return (
    <>
      <div
        id="heroContainer"
        className="h-auto w-full md:mt-14 lg:px-20 py-10 flex flex-col lg:flex-row items-center justify-center gap-3 "
      >
        <div
          id="heroText"
          className="h-full md:pt-20 lg:p-10 flex flex-col items-center justify-center "
        >
          <h1 id="mainText" className="text-5xl font-bold text-[#16163F]">
            Challenge Your Knowledge, One Quiz at a Time!
          </h1>
          <h3 id="subText" className="text-lg mt-6 mb-6 lg:pr-20">
            Test yourself with engaging quizzes, get instant feedback, track
            your progress, and aim for the top of the scoreboard. Ready to level
            up your learning?{" "}
          </h3>
          <Link to="/quiz">
            <button className="h-18 w-40 p-4 border-4 border-purple-500 rounded-full text-xl font-semibold hover:bg-purple-500 hover:text-white">
              Start Game
            </button>
          </Link>
        </div>
        <div id="heroImage" className="h-full p-10 pr-28">
          <img
            src={heroImage}
            alt="hero"
            className="hidden lg:block lg:scale-150"
          />
        </div>
      </div>
    </>
  );
};

export default HeroComponent;
