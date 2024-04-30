import React, { useState, useEffect } from "react";
import Footer from "../SharedComp/Footer";
import CustomNavbar from "../SharedComp/CustomNav";
import AllBlogs from "./allBlogs";
import { useSelector } from "react-redux";
import "./blog_style.css";

function Blog_flow() {
  var prevScrollpos = window.pageYOffset;
  const { isLoading, posts, searchPosts } = useSelector((state) => state.posts);
  const [arrowVal, setArrow] = useState(false);
  const [FixedVal, setFixed] = useState(true);
  const [Nav, setNav] = useState(1);

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
    //For setting the arrow
    if (window.scrollY <= 650)
      setArrow(false);
    else setArrow(true);

    //For setting sidebar
    if ((window.document.body.offsetHeight - window.scrollY) < 801)
      setFixed(false);
    else setFixed(true);

    //For setting navbar
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos)
      setNav(1);
    else setNav(2);
    prevScrollpos = currentScrollPos;
  };

  return (<div>
    <CustomNavbar FixedVal={FixedVal} winWidth={winWidth} winHeight={winHeight} />
    <AllBlogs winWidth={winWidth} Nav={Nav} arrowVal={arrowVal} FixedVal={FixedVal} />
    {!isLoading && posts.length !== 0 && searchPosts.length !== 0 && <Footer />}
  </div>);
}
export default Blog_flow;