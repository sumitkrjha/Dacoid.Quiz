import React from "react";
import github from "../assets/github.svg";
const LandingHeader = () => {
  return (
    <>
      <div
        id="header"
        className="h-20 w-full py-3 lg:px-4 flex items-center justify-between"
      >
        <h1 id="title" className="text-[#9749FF] font-bold text-4xl font-serif">
          Dacoid.Quiz
        </h1>
        <a href="https://github.com/sumitkrjha/Dacoid.Quiz" target="_blank">
          <button
            id="githubLink"
            class="bg-[#24292F] hover:bg-[#1a1c20] font-medium rounded-full text-sm h-12 w-32 p-4 gap-2 hidden md:flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-[#1a1c20]"
          >
            <img src={github} alt="github logo" class="h-6 w-6" />
            <span class="text-white">GitHub</span>
          </button>
        </a>
      </div>
    </>
  );
};

export default LandingHeader;
