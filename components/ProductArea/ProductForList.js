import { Rating, Tooltip, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
// import { useStateValue } from './stateProvider';
import { useTheme } from "@mui/material/styles";
import {
  MdAddShoppingCart,
  MdStar,
  MdOutlineDescription,
} from "react-icons/md";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useStateValue } from "../stateProvider";

export default function ProductForList({
  id,
  title,
  image,
  price,
  rating,
  desc,
  brand,
}) {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff9806",
    },
  });
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        //   rating:rating
      },
    });
  };

  //   const theme = useTheme();
  //   const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className="grid grid-cols-3 h-full border border-gray-200 p-5">
      {" "}
      <Link href={`/details?id=${id}`} passHref>
        <a className="overflow-hidden cursor-pointer flex items-center h-full w-full aspect-[2/3] md:aspect-square max-w-sm max-h-96">
          <img
            className="object-cover  group-hover:scale-110 transition-all duration-500"
            src={image}
          />
        </a>
      </Link>
      <div className="relative w-full col-span-2">
        <div
          className=" flex items-start flex-col py-5 w-full bg-white absolute transition-all duration-500
       group-hover:-translate-y-10 opacity-0 z-10 group-hover:opacity-100"
        >
          {rating && (
            <div className="flex justify-center">
              <div className="flex items-center text-[#999999]">
                <StyledRating
                  emptyIcon={<MdStar className="w-[18px] h-[18px]" />}
                  size="small"
                  value={rating}
                  readOnly
                />
                ({rating})
              </div>
            </div>
          )}
          <Link href={`/details?id=${id}`} passHref>
            <p className=" font-bold text-center text-xl w-full text-gray-400 hover:text-red-500 hover:cursor-pointer transition-all duration-500">
              {title}
            </p>
          </Link>
          <p className="my-1  sm:text-base text-lg">${price}.00</p>
          <button
            onClick={addToBasket}
            className="bg-black w-fit text-white font-bold py-3 px-6 rounded-full hover:bg-red-500 transition-all duration-500"
          >
            Add To Cart
          </button>
        </div>
        <div className="py-0 px-8 flex flex-col gap-y-4 z-10 bg-white ">
          <p className="font-bold text-1xl lg:text-2xl truncate">{title}</p>
          <p className=" my-1  sm:text-base lg:text-xl text-lg">${price}.00</p>
          <p className=" my-1 text-gray-500 line-clamp-3 sm:text-base text-lg">
            {desc
              ? desc
              : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit saepe quo praesentium enim ipsum quod. Dolores numquam provident rem iste dolore labore vel aperiam reiciendis delectus, aliquam fugiat quo asperiores!"}{" "}
          </p>
          <p className=" my-1  sm:text-base lg:text-xl text-lg capitalize">
            <span className="font-bold">Brand : </span>
            {brand}
          </p>
          <div className="flex gap-x-5">
            <div className="cursor-pointer bg-white w-9 h-9 rounded-full flex justify-center items-center transition duration-[450ms] hover:rotate-[360deg] hover:bg-gray-300 group shoppingParent ">
              <Link href={`/details?id=${id}`}>
                <Tooltip title="Description" placement="top">
                  <div>
                    <MdOutlineDescription className="transition-all duration-[450ms] scale-150" />
                  </div>
                </Tooltip>
              </Link>
            </div>
            <div className="cursor-pointer bg-white w-9 h-9 rounded-full flex justify-center items-center transition duration-[450ms] hover:rotate-[360deg] hover:bg-gray-300  group shoppingParent ">
              <Tooltip title="Add To Cart" placement="top">
                <div onClick={addToBasket}>
                  <MdAddShoppingCart className="transition-all duration-[450ms] scale-150" />{" "}
                </div>
              </Tooltip>
            </div>
          </div>
          {rating && (
            <div className="flex justify-center">
              <div className="flex items-center text-[#999999]">
                <StyledRating
                  emptyIcon={<MdStar className="w-[18px] h-[18px]" />}
                  size="small"
                  value={rating}
                  readOnly
                />
                ({rating})
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
