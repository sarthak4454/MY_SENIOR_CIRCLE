import React, { useState, useEffect } from "react";
import Coverphoto from "../images/coverphoto.png";

function Landing(props) {

  return (<div>
    {props.winWidth > 650 && <div className="AlignRight">
      <img className="coverPhoto_style" src={Coverphoto} />
    </div>}
    <div className="landing_title">
      <div className="animated fadeIn" style={{ animationDelay: "500ms" }}>
        <div className="landing_intro">Introducing</div>
        <div className="landing_senior">Senior Circle</div>
      </div>
      <div className="animated fadeInUp" style={{ animationDelay: "1000ms" }}>
        <div className="landing_line">A platform where experiences are empowered ...</div>
      </div>
    </div>
  </div>);
}
export default Landing;