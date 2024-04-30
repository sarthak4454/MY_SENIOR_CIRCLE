import React, { useState, useEffect } from "react";
import CustomNavbar from "../SharedComp/CustomNav";
import UserOpt from "./userOpt";

function User_flow(props) {
  const [arrowVal, setArrow] = useState(false);
  const [winWidth, setWidth] = useState(window.innerWidth);
  const [winHeight, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
  });

  window.onscroll = () => {
    if (window.scrollY <= 50)
      setArrow(false);
    else setArrow(true);
  };
  // console.log(arrowVal);
  return (<div>
    <CustomNavbar FixedVal={true} winWidth={winWidth} winHeight={winHeight} />
    <div className="UserNav">
      <UserOpt arrowVal={arrowVal} option={props.option} winWidth={winWidth} />
    </div>
  </div>);
}
export default User_flow;