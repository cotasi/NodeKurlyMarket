import React, { useState, useEffect } from "react";

import styled from "styled-components";

import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const Mainer = styled.main`
  .swiper {
    max-height: 300px;
    .swiper-wrapper {
      height: 100%;
      .swiper-slide {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;

const Main = () => {
  const [sliderItem, setSliderItem] = useState([]);

  const FetchSwiper = async () => {
    const SwiperItem = await axios.post("/slider");
    if (SwiperItem.data) {
      setSliderItem(SwiperItem.data);
    }
  };

  useEffect(() => {
    FetchSwiper();
  }, [sliderItem]);

  return (
    <Mainer>
      <Swiper>
        {sliderItem.map((sitem) => (
          <SwiperSlide>
            <img src={sitem.slider_img} alt={sitem.slider_alt}></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </Mainer>
  );
};

export default Main;
