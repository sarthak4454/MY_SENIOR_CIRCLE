import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Feature1Img from "../images/Feature1.png";
import "./Home_style.css";

function Feature1(props) {
    return (<div className="Feature1Outer">
        {/* e8f1fc */}
        <Row className="m-0 p-0">
            <Col xs={12} sm={12} md={7} lg={7} className="m-0 p-0">
                <div className="Fea1_title">
                    Turning interviews to <br />Experiences
                </div>
                <div className="justify-around">
                    {props.winWidth <= 767 && <img className="fea1_img" src={Feature1Img} />}
                </div>
                <div className="fea1_para">There is a general saying, "Turning wounds into wisdoms". We aim at converting the wounds caused at interviews into wisdom of experiences as we know <b>Experiences Talks</b>. We make our audience to learn from the past experiences of others. <br /><br />Want to be part of it and learn from others' experiences ? <br /><br /></div>
                <div className="displayFlex">
                    <div className="PostExperience"> <b>Go check out the blogs:</b></div>
                    <div><Link to="/blogs" className="textDecoration">
                        <button className="blogs_but">Blogs</button>
                    </Link></div>
                </div>
            </Col>
            {props.winWidth > 767 && <Col xs={12} sm={12} md={5} lg={5} className="m-0 p-0 FlexRowReverse"><img className="fea1_img" src={Feature1Img} /></Col>}
        </Row>
    </div>);
}
export default Feature1;