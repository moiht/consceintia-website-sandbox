import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import img1 from "../Assets/tomatos.png";
// import img2 from "../Assets/capcicum.png";
// import img3 from "../Assets/strawberies.png";
// import img4 from "../Assets/tomato 2.png";
import "./Slider.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { MdDoubleArrow } from "react-icons/md";

let img1 =
  "https://www.eatingwell.com/thmb/k3RhYf4XhAeqAejYjdInOlSOp6I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gettyimages-1124303516-36413b5bf61f45f1b7d18d90000b56b7.jpg";

let img2 =
  "https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg";

let img3 =
  "https://126956000.cdn6.editmysite.com/uploads/1/2/6/9/126956000/s848309795171683491_p255_i1_w2560.jpeg";

let img4 =
  "https://assets.epicurious.com/photos/5988e3458e3ab375fe3c0caf/1:1/w_3607,h_3607,c_limit/How-to-Make-Chicken-Alfredo-Pasta-hero-02082017.jpg";

const Slider = () => {
  return (
    <div className="hoverIncrease">
      <img src={img1} alt="" />
      <div className="content">
        <h1>Products One</h1>
        <h2>100.25$</h2>
        <div className="price-underline"></div>
        <div className=" select-btn">
          <p>SELECT OPTION</p>
          <MdDoubleArrow className="ml-1" />
        </div>
      </div>
    </div>
    // <Swiper
    //   autoplay={{
    //     delay: 2500,
    //     disableOnInteraction: false,
    //     pauseOnMouseEnter: true,
    //   }}
    //   //   navigation={true}
    //   modules={[Autoplay]}
    //   className="mySwiper"
    // >
    //   <SwiperSlide>

    //   </SwiperSlide>
    //   <SwiperSlide>
    //     <div className="hoverIncrease">
    //       <img src={img1} alt="" />
    //       <div className="content">
    //         <h1>Products One</h1>
    //         <h2>100.25$</h2>
    //         <div className="price-underline"></div>
    //         <div className=" select-btn">
    //           <p>SELECT OPTION</p>
    //           <MdDoubleArrow className="ml-1" />
    //         </div>
    //       </div>
    //     </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     <div className="hoverIncrease">
    //       <img src={img1} alt="" />
    //       <div className="content">
    //         <h1>Products One</h1>
    //         <h2>100.25$</h2>
    //         <div className="price-underline"></div>
    //         <div className=" select-btn">
    //           <p>SELECT OPTION</p>
    //           <MdDoubleArrow className="ml-1" />
    //         </div>
    //       </div>
    //     </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     <div className="hoverIncrease">
    //       <img src={img1} alt="" />
    //       <div className="content">
    //         <h1>Products One</h1>
    //         <h2>100.25$</h2>
    //         <div className="price-underline"></div>
    //         <div className=" select-btn">
    //           <p>SELECT OPTION</p>
    //           <MdDoubleArrow className="ml-1" />
    //         </div>
    //       </div>
    //     </div>
    //   </SwiperSlide>
    //   <SwiperSlide>
    //     <div className="hoverIncrease">
    //       <img src={img1} alt="" />
    //       <div className="content">
    //         <h1>Products One</h1>
    //         <h2>100.25$</h2>
    //         <div className="price-underline"></div>
    //         <div className=" select-btn">
    //           <p>SELECT OPTION</p>
    //           <MdDoubleArrow className="ml-1" />
    //         </div>
    //       </div>
    //     </div>
    //   </SwiperSlide>

    /* <SwiperSlide>
        <div className="hoverIncrease">
          <img src={img2} alt="" />
          <div className="content">
            <h1>Products One</h1>
            <h2>100.25$</h2>
            <div className="price-underline"></div>
            <div className=" select-btn">
              <p>SELECT OPTION</p>
              <MdDoubleArrow className="ml-1" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hoverIncrease">
          <img src={img3} alt="" />
          <div className="content">
            <h1>Products One</h1>
            <h2>100.25$</h2>
            <div className="price-underline"></div>
            <div className=" select-btn">
              <p>SELECT OPTION</p>
              <MdDoubleArrow className="ml-1" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hoverIncrease">
          <img src={img4} alt="" />
          <div className="content">
            <h1>Products One</h1>
            <h2>100.25$</h2>
            <div className="price-underline"></div>
            <div className=" select-btn">
              <p>SELECT OPTION</p>
              <MdDoubleArrow className="ml-1" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hoverIncrease">
          <img src={img1} alt="" />
          <div className="content">
            <h1>Products One</h1>
            <h2>100.25$</h2>
            <div className="price-underline"></div>
            <div className=" select-btn">
              <p>SELECT OPTION</p>
              <MdDoubleArrow className="ml-1" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hoverIncrease">
          <img src={img2} alt="" />
          <div className="content">
            <h1>Products One</h1>
            <h2>100.25$</h2>
            <div className="price-underline"></div>
            <div className=" select-btn">
              <p>SELECT OPTION</p>
              <MdDoubleArrow className="ml-1" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hoverIncrease">
          <img src={img3} alt="" />
          <div className="content">
            <h1>Products One</h1>
            <h2>100.25$</h2>
            <div className="price-underline"></div>
            <div className=" select-btn">
              <p>SELECT OPTION</p>
              <MdDoubleArrow className="ml-1" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="hoverIncrease">
          <img src={img4} alt="" />
          <div className="content">
            <h1>Products One</h1>
            <h2>100.25$</h2>
            <div className="price-underline"></div>
            <div className=" select-btn">
              <p>SELECT OPTION</p>
              <MdDoubleArrow className="ml-1" />
            </div>
          </div>
        </div>
      </SwiperSlide> */
    // </Swiper>
  );
};

export default Slider;
