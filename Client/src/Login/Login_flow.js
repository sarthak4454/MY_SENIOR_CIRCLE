import React from "react";
import Login from "./login";
import Signup from "./signup";
import { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./login_style.css";

function Login_flow(props) {
  const [isSignup, setSignUp] = useState(props.val);
  const [winWidth, setWidth] = useState(window.innerWidth);
  const [winHeight, setHeight] = useState(window.innerHeight);
  const { isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
  });

  return (<div>
    {isLoading && <div className="authLoad"><CircularProgress size="6rem" /></div>}
    <div style={{ height: winHeight, width: winWidth }} className={"manageHeight defineColor" + (isLoading ? " ManageOpacity" : "")}>
      <div className="outercircle1">
        <div className="circle1"></div>
      </div>
      {isSignup && <Signup formtype={setSignUp} />}
      {!isSignup && <Login formtype={setSignUp} />}
      <div className="outercircle2">
        <div className="circle2"></div>
      </div>
    </div>
  </div>);
}
export default Login_flow;