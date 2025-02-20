import React from "react";
import LandingHeader from "../component/LandingHeader";
import HeroComponent from "../component/HeroComponent";
const Landing = () => {
  return (
    <>
      <div
        id="landingWrapper"
        className="h-screen w-full px-16 pt-5 pb-10 bg-[url('src/assets/bg.avif')]"
      >
        <div id="landingContainer" className="h-full w-full p-3">
          <LandingHeader />
          <HeroComponent />
        </div>
      </div>
    </>
  );
};

export default Landing;
