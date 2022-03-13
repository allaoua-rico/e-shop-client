import { Dialog } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";

export default function ImagesDialog(props) {
  const { onClose, selectedValue, open, images, indexStart } = props;
  const [index, setIndex] = useState(indexStart);
  const [swiper, setSwiper] = useState(null);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  useEffect(() => {
    // console.log(swiper?.activeIndex);
  }, [swiper?.activeIndex]);
  return (
    // <div className="flex items-center  ">
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        sx={{ backgroundColor: "transparent" }}
        onClose={handleClose}
        open={open}

      >
        {/* <div className="flex items-center  justify-between fixed top-[50%] left-0 right-0 mx-5"> */}
          <button
            onClick={() => {
              swiper?.activeIndex == 0
                ? swiper?.slideTo(images.length - 1)
                : swiper?.slideTo(swiper?.activeIndex - 1);
            }}
            className="prev1 absolute left-0 top-2/4 z-20  cursor-pointer"
          >
            <GoTriangleLeft className="h-9 w-9 relative z-20 fill-[rgba(243,244,246,0.9)] stroke-[rgba(0,0,0,0.17)] stroke-[1.5px] hover:fill-gray-100 transition-all duration-300" />
          </button>
          <button
            onClick={() => {
              swiper?.activeIndex < images.length - 1
                ? swiper?.slideTo(swiper?.activeIndex + 1)
                : swiper?.slideTo(0);
            }}
            className="next1 absolute right-0 top-2/4 z-10 cursor-pointer"
          >
            <GoTriangleRight className=" z-20 h-9 w-9 fill-[rgba(243,244,246,0.9)] stroke-[rgba(0,0,0,0.17)] stroke-[1.5px] hover:fill-gray-100 transition-all duration-300" />
          </button>
        {/* </div> */}
        <div className="h-screen w-full relative">
          {/*trick for width set the MuiDialog-paper width to 100 
        and just copy paste the css for .MuiDialog-paper*/}
          <div className="absolute right-0 -bottom-8 z-20 font-semibold text-gray-300 ">
            {index + 1 + " of " + images.length}
          </div>
          <button
            onClick={handleClose}
            className="absolute -right-2 -top-8 z-0"
          >
            <IoIosClose className="fill-gray-300 stroke-gray-300 stroke-[2px] w-8 h-8" />
          </button>
          <Swiper
            onSwiper={setSwiper}
            navigation={false}
            modules={[Navigation]}
            mousewheel={true}
            speed={1}
            className="detailsSwiper"
            onActiveIndexChange={({ activeIndex }) => setIndex(activeIndex)}
          >
            {images?.map((image) => (
              <SwiperSlide key={image} className="w-full">
                <button
                  onClick={() => {
                    swiper?.activeIndex < images.length - 1
                      ? swiper?.slideTo(swiper?.activeIndex + 1)
                      : swiper?.slideTo(0);
                  }}
                >
                  <Image
                    loader={() => image}
                    src={image}
                    layout="fill"
                    objectFit="cover"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Dialog>
    // </div>
  );
}
