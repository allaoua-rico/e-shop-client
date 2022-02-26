// import React, { useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import { Button, Fade } from '@mui/material';
import {IoIosArrowForward,IoIosArrowBack} from 'react-icons/io'
import Link from 'next/link';
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {  Navigation, Pagination } from "swiper";

export default function PASlider() {
    const sliderImages=[]
    for (let index = 9; index < 13 ; index++) {
         sliderImages.push('/products/product-'+ index +'.jpg');
    }

  return (

      <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{clickable: true}}
          modules={[Navigation, Pagination]}
          className="PASwiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
        >
            {sliderImages?.map((image,index)=>{
              return (
                <SwiperSlide key={image}>
                <div className='pb-[80px] flex flex-col'>
                    <img className="" src={image} alt={image} />
                    <div className='text-[31px]'><span className='font-extrabold'>Product </span> name</div>

                </div>
             
              </SwiperSlide>
               )})}
          
        </Swiper>

    
  )
}
