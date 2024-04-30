import React, { useEffect, useState } from "react";
import Navbar from "../SharedComp/Navbar";
import Footer from "../SharedComp/Footer";
import About_company from "./company";
import About_developer from "./developer";
function About_flow() {
  const [winWidth, setWidth] = useState(window.innerWidth);
  const [winHeight, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
  });

  return (<div>
    <Navbar winWidth={winWidth} winHeight={winHeight} />
    <About_company winWidth={winWidth} />
    <About_developer />
    <Footer />
  </div>);
}
export default About_flow;