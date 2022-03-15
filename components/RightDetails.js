import React from "react";

export default function RightDetails({ details }) {
  return (
    <div className="lg:max-w-md xl:max-w-xl">
      <div className="font-bold text-2xl">{details?.title}</div>
      <div className="font-bold text-2xl py-5">{details?.rating}</div>
      <div className="text-gray-500 py-5">{details?.desc}</div>
      <div className="font-bold text-3xl py-5">${details?.price}</div>
      <div className="md:pt-14  ">
        <div className="font-bold py-1 flex">
          <div className="basis-1/2 max-w-[100px]">Category:</div>
          <span className="font-normal basis-1/2">
            {" "}
            {details?.category_id.name.charAt(0).toUpperCase() +
              details?.category_id.name.slice(1)}
          </span>
        </div>
        <div className="font-bold py-1 flex">
          <div className="basis-1/2 max-w-[100px]">Brand:</div>
          <span className="font-normal basis-1/ ">
            {" "}
            {details?.brand.charAt(0).toUpperCase() + details?.brand.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
