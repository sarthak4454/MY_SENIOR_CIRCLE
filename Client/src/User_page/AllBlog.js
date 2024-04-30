import React, { useState } from "react";
import BlogBox from "../SharedComp/blogBox";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@material-ui/core";
import "./userPage.css";

function AllBlog(props) {
  function scrollup() {
    window.scrollTo(0, 0);
  }

  const val = JSON.parse(window.localStorage.getItem("profile"));
  const curUser = val?.data?.result?._id;
  const { posts, isLoading } = useSelector((state) => state.posts);

  var fnd = false;
  posts?.map((item) => {
    if (item.user === curUser)
      fnd = true;
  });

  return (<div>
    {isLoading && <div className="loadProfile"><CircularProgress size="4rem" /></div>}
    {!isLoading && <Row className="m-0 p-0">
      <Col className="m-0 p-0" lg={10} md={10} sm={10} xs={12}>
        <div className="user_outerArea">
          {posts?.map((item) => (
            (item.user === curUser) && <div className="SingleblogOuter">
              <BlogBox key={item._id} item={item} />
            </div>))}
        </div>
      </Col>
      {props.winWidth > 576 && <Col className="m-0 p-0 uparrow" lg={2} md={2} sm={2} xs={2}>{props.arrowVal && <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={scrollup} className="fa-3x uparrowIcon" />}</Col>}
    </Row>}
    {!fnd && !isLoading && <div className="NoFound1">No posts Found :(</div>}
  </div>);
}
export default AllBlog;