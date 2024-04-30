import React from "react";
import DeveloperImg from "../images/developer.jpeg"
import "./about_style.css";
function About_developer() {
  return (<div>
    <div className="developer_heading">About the developer</div>
    <div className="developer_outer">
      <img src={DeveloperImg} className="devImg_style" />
      <div className="content_developer">
        <br />
        <br />
        <br />
        <div className="container">
        Hola! I'm Sarthak Garg, a dynamic 3rd-year IT student at MSIT. My journey revolves around the captivating world of web development, where I'm fervently honing my skills and crafting immersive experiences through the MERN stack. Driven by an insatiable passion for coding, I immerse myself in projects that push boundaries and redefine possibilities. Join me as I embark on this exhilarating voyage of innovation and creativity!

        </div>
      </div>
    </div>
  </div>
  );
}
export default About_developer;