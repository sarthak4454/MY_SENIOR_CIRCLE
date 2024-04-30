import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Trending1 from "../images/Trends/Trending1.png";
import Trending2 from "../images/Trends/Trending2.jpg";
import Trending3 from "../images/Trends/Trending3.png";
import "./Home_style.css";

function My_carousel() {
  return (
    <div className="CaraouselOuter">
      <Carousel variant="dark">
        <Carousel.Item>
          <img className="Trends_img" src={Trending1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="Trends_img" src={Trending2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="Trends_img" src={Trending3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default My_carousel;
