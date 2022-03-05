import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";
import Link from "next/link";

export default function DetailsSecondSlider({images}) {

  return (
    <Swiper
      loop={true}
      slidesPerView={2}
      spaceBetween={30}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="PASwiper"
      breakpoints={{
        580: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }}
    >
      {images?.map((image, index) => {
        return (
          <SwiperSlide className="group " key={image}>
            <div className="pb-[80px] flex flex-col items-center">
              <div className="overflow-hidden cursor-pointer">
                <img
                  className="group-hover:scale-110 transition-all duration-500 "
                  src={image}
                  alt={image}
                />
                <div><a href=""></a></div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
