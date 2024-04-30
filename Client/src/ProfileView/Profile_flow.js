import React, { useState, useEffect } from "react";
import Navbar from "../SharedComp/Navbar";
import MyProfile from "../User_page/myProfile";

function Profile_flow() {
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
    <MyProfile />
  </div>);
}
export default Profile_flow;