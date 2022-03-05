import React, { useEffect, useRef, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Mousewheel } from "swiper";
import Image from "next/image";
import { Rating, Tooltip, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MdAddShoppingCart, MdStar } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";
import ImagesDialog from "./ImagesDialog";
// import dynamic from 'next/dynamic'
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";

export default function DetailsSlider({ product }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [transX, setTransX] = useState(0);
  const [transY, setTransY] = useState(0);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  // console.log(matches);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    // setSelectedValue(value);
  };
  const height = 400;
  let imgRef = useRef(null);

  // useEffect(() => {
  //   const img = document.querySelector(".img");
  //   img.addEventListener("mousemove", function (e) {
  //     var rect = document.querySelector(".img").getBoundingClientRect();
  //     const trY = ((e.pageY - rect.top + window.scrollY) / height) * 50 + "%";
  //     // setTransX(trY)
  //     const trX =
  //       ((e.pageX - rect.left + window.scrollX) / rect.width) * 50 + "%";
  //     // imgRef.current.styles.scale=2
  //     // setTransX(trX)
  //     // imgRef.current.style.transform="scale(3)"
  //     imgRef.current.style.transform = `translateX(${trX}) translateY(${trY}) scale(1.6)`;
  //     // imgRef.current.style.transformOrigin = `${trX} ${trY}`;
  //     img.addEventListener("mouseout", function () {
  //       imgRef.current.style.transform = "";
  //       // console.log(imgRef.current.style);
  //     });
  //   });
  // });
  return (
    <div className="aspect-[2/3] w-full  max-w-sm">
      <Swiper
        // direction={matches ? "vertical" : "horizontal"}
        mousewheel={true}
        pagination={true}
        scrollbar={{ dragSize: 250 }}
        speed={900}
        modules={[Scrollbar, Mousewheel]}
        className="detailsSwiper"
        onActiveIndexChange={({ activeIndex }) => setIndex(activeIndex)}
      >
        {product?.imagesArray?.map((image, i) => (
          <SwiperSlide key={image} className="relative">
            <div className="imgContainer">
              <Image
                ref={imgRef}
                // zoomPreload ={true}
                loader={() => image}
                // className={`img object-contain`}
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
        // selectedValue={selectedValue}
        indexStart={index}
        images={product?.imagesArray}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
