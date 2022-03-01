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

export default function PASlider() {
  const sliderImages = [];
  for (let index = 9; index < 13; index++) {
    sliderImages.push("/products/product-" + index + ".jpg");
  }
  return (
    <Swiper
      loop={true}
      slidesPerView={1}
      spaceBetween={30}
      pagination={{ clickable: true }}
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
      {sliderImages?.map((image, index) => {
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
              <Link href={"/thatProduct"}>
                <div className="cursor-pointer hover:underline underline-offset-1	 text-[25px] font-thin">
                  <span className="font-bold">Product </span> name
                </div>
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
