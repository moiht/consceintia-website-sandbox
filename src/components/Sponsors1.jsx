'use client'
import React from 'react'

import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
// swiper css
import 'swiper/css';
import 'swiper/css/autoplay'
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'

import styles from './styles/Sponsors.module.css'
import './reqsponsor.css'

import { sponsors } from '@/data/sponsors';

export default function Sponsors() {
  return (
    <div className={styles.body1}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}

        // grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        className="mySwiper"
      >
        {sponsors.map((item, i) => {
          return (
            <SwiperSlide key={item.id} className='swiper-slide'>
              <div className={`${styles.cardImage} swipercard`}>
                <img className={styles.cardImageSrc} src={item.logo} alt={item.alt} />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardTitle}>
                  {item.name}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  )
}
