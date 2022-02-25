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
import { EffectFade, Navigation, Pagination } from "swiper";

export default function Slider() {
    const sliderImages=['/slider/hm-2-slider-1.jpg','/slider/hm-2-slider-2.jpg']
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [animation1, setAnimation1] = React.useState(true);
    const [animation2, setAnimation2] = React.useState(false);
    const animationArr=[animation1,animation2]
    const setterArr=[setAnimation1,setAnimation2]
    // const swiper = new Swiper('.mySwiper', {
    //   // ...
    // });
    // swiper.on('slideChange', function () {
    //   console.log('slide changed');
    // });
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStepChange = (step) => {
        setActiveStep(step);
      };
      const prevRef = useRef(null)
      const nextRef = useRef(null)
      const swiper = useSwiper();
  return (
    <div className='relative flex items-center group bg-[#f6f6f6]'>
      <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={{nextEl:'.next',prevEl:'.prev'}}
          pagination={{clickable: true}}
          onActiveIndexChange={({activeIndex})=>{setterArr.map((setter,index)=>{index===activeIndex?setter(true):setter(false)})}}
          modules={[EffectFade, Navigation, Pagination]}
          className="mySwiper"
        >
            {sliderImages?.map((image,index)=>{
              return (
                <SwiperSlide key={image}>
              <div  className='relative overflow-hidden h-[400px] sm:h-[500px] md:h-[550px] '>
                  <div className='absolute mt-[100px] sm:mt-[140px] px-[35px] z-10' >
                    <div className={'flex flex-col gap-y-2 text-[30px] sm:text-[3.25rem] tracking-wide	font-[350] translate-y-[500px] opacity-0 ' + (animationArr[index] && ' animate-[translateOpacity_2s_ease-in-out_forwards]')}> 
                      <div className='-mb-4'>
                        <span className='text-[#628787] font-bold'>Basic</span> Color
                      </div>
                      <div>Teen Collection</div>
                    </div>
                    <p className={'text-black w-44 mt-4 sm:text-[#878786] text-sm sm:w-[340px] translate-y-[500px] opacity-0 mb-9 ml-1' + (animationArr[index] && ' animate-[translateOpacity_2.5s_ease-in-out_forwards]')}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est itaque inventore</p>
                    
                    <Link href='/product-details'>
                      <div className={'flex gap-x-3 w-fit items-center font-semibold text-sm cursor-pointer translate-y-[500px] opacity-0 ' + (animationArr[index] && ' animate-[translateOpacity_3s_ease-in-out_forwards]')}>
                        EXPLORE NOW<IoIosArrowForward className='h-5 w-5 	text-base	stroke-[1px]'/>
                        </div>
                    </Link>
                  </div>
                  <img 
                  className="max-h-[585px] max-w-[1170px]
                  w-auto h-full absolute -right-[110px]"
                    src={image} alt={image} />
              </div>
              </SwiperSlide> )})}
              <div className='mt-10'>
              </div>
        </Swiper>
        <div className='flex justify-between w-full absolute'>
          <button className='prev z-10 cursor-pointer group scale-0 group-hover:scale-[1.1] transition-all duration-500 '>
              <IoIosArrowBack className='h-10 w-10 group-hover:fill-red-500 transition-all duration-300'/>
          </button >
          <button className='next z-10 cursor-pointer group scale-0 group-hover:scale-[1.1] transition-all duration-500 '>
            <IoIosArrowForward className='h-10 w-10 group-hover:fill-red-500 transition-all duration-300'/> 
          </button >
        </div>
    </div>
    
  )
}
