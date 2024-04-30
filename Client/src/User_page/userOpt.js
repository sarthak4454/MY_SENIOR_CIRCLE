import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import AllBlog from "./AllBlog";
import WriteBlog from "./writeBlog";
import MyProfile from "./myProfile";
import './userPage.css';

function UserOpt(props) {
  const [winHeight, setHeight] = useState(window.innerHeight);
  const [winWidth, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize)
  });

  return (<div>
    <Row className="m-0 p-0">
      {props.winWidth > 991 && <Col className="m-0 p-0" lg={3} md={3} sm={0} xs={0}>
        <MyProfile winHeight={winHeight} />
      </Col>}
      <Col className="m-0 p-0" lg={9} md={12} sm={12} xs={12}>
        {props.option === 1 ? <AllBlog arrowVal={props.arrowVal} /> : <WriteBlog />}
      </Col>
    </Row>
  </div>);
}
export default UserOpt;