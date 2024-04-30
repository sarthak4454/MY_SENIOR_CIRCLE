import React, { useState, useEffect } from "react";
import Blog from "./blog";
import Navbar from "../SharedComp/Navbar";
import Footer from "../SharedComp/Footer";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchblogbyid, getuser } from "../Actions/user";

function SingleBlog_flow(props) {
  const [winWidth, setWidth] = useState(window.innerWidth);
  const [winHeight, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
  });

  let [searchParams, setSearchParams] = useSearchParams();
  const userid = searchParams.get("user");
  const blogid = searchParams.get("blog");

  const dispatch = useDispatch();
  dispatch(fetchblogbyid(blogid));
  dispatch(getuser(userid));
  window.scrollTo(0, 0);

  return (<div>
    <Navbar winWidth={winWidth} winHeight={winHeight} />
    <Blog winWidth={winWidth} />
    <Footer />
  </div>);
}
export default SingleBlog_flow;