import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import About from "../Components/About";
import Img1 from "../images/Image 1.jpg";
import Img2 from "../images/Image 2.jpg";
import "../App.css";

export default function Home() {
  return (
    <div className="bigcontainer">
      <div className="carousel">
        <Carousel
          infiniteLoop
          autoPlay
          showStatus={false}
          showArrows={false}
          interval={3000}
          showThumbs={false}
          showIndicators={false}
        >
          <div>
            <img className="img1" src={Img1} alt="Item1" />
          </div>
          <div>
            <img className="img2" src={Img2} alt="Item2" />
          </div>
        </Carousel>

      </div>
      
      
      <About />
      
    </div>
  );
}