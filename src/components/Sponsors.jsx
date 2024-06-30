"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// swiper css
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import { EffectCards, Autoplay } from "swiper/modules";
import styles from "./styles/Sponsors.module.css";
import "./reqsponsorcard.css";

import { sponsors } from "@/data/sponsors";

export default function Sponsors() {
  return (
    <div className={styles.body1}>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCards]}
        className="mySwiper"
      >
        {sponsors.map((item, i) => {
          return (
            <SwiperSlide key={item.id} className="swiper-slide">
              <div className={`${styles.cardImage} swipercard`}>
                <img
                  className={styles.cardImageSrc}
                  src={item.logo}
                  alt={item.alt}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>{item.name}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
