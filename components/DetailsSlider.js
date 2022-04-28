import React, { useRef, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Mousewheel } from "swiper";
import Image from "next/image";
import { BsArrowsFullscreen } from "react-icons/bs";
import ImagesDialog from "./ImagesDialog";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

export default function DetailsSlider({ product }) {
  console.log(product)
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let imgRef = useRef(null);
  return (
    <div className="aspect-[2/3] w-full  max-w-sm">
      <Swiper
        mousewheel={true}
        pagination={true}
        scrollbar={{ dragSize: 250 }}
        speed={900}
        modules={[Scrollbar, Mousewheel]}
        className="detailsSwiper"
        onActiveIndexChange={({ activeIndex }) => setIndex(activeIndex)}
      >
        {product?.imagesArray?.map(image => image && (
          <SwiperSlide key={image} className="relative">
            <div className="imgContainer">
              <Image
                ref={imgRef}
                loader={() => image}
                src={image}
                layout="fill"
                objectFit="contain"
                unoptimized
              />
            </div>

            <button
              onClick={handleClickOpen}
              className="absolute bottom-0 sm:mr-14 mr-5 sm:mb-14 mb-6 right-0 bg-white p-3 rounded-full"
            >
              <BsArrowsFullscreen className="w-4 h-4" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <ImagesDialog
        indexStart={index}
        images={product?.imagesArray}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
