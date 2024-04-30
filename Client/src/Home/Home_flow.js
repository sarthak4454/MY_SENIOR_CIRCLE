import React, { useEffect, useState } from "react";
import Navbar from "../SharedComp/Navbar";
import Landing from "./Landing";
import { faPoll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import My_carousel from "./carousel"
import Feature1 from "./feature1";
import Feature2 from "./feature2";
import Footer from "../SharedComp/Footer";

export default function Home_flow() {
  const [winWidth, setWidth] = useState(window.innerWidth);
  const [winHeight, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
  });

  return (<div className="Home_style">
    <Navbar winWidth={winWidth} winHeight={winHeight} />
    <Landing winWidth={winWidth} />
    <div className="trends">What's Trending <FontAwesomeIcon icon={faPoll} /></div>
    <My_carousel />
    <Feature1 winWidth={winWidth} />
    <Feature2 winWidth={winWidth} />
    <Footer />
  </div>);
}