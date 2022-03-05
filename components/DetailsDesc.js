import React, { useState } from "react";

export default function DetailsDesc({ details }) {
  const [desc, setDesc] = useState(1);
  const [spec, setSpec] = useState(0);

  return (
    <div className=" flex flex-col gap-y-8 mb-28 mx-6">
      <div className="w-full flex justify-center gap-x-4 text-lg font-bold">
        <button
          className="font-bold"
          onClick={() => {
            setDesc(1);
            setSpec(0);
          }}
        >
          Description
        </button>
        <button
          className="font-bold"
          onClick={() => {
            setDesc(0);
            setSpec(1);
          }}
        >
          Specification
        </button>
      </div>
      <div
        className={
          desc ? " text-lg font-semibold" : "hidden"
        }
      >
        <div className="text-2xl font-bold mb-3">Description</div>
        {details.desc}
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta aliquam
        minus molestias iusto nobis deleniti, suscipit corrupti necessitatibus,
        obcaecati aut adipisci at ducimus libero dolorem autem saepe tenetur!
        Impedit, dolores.
      </div>

      <div className={spec ? "mx-5 md:mx-10" : "hidden"}>
        {/* <div>{details.desc}</div> */}
        <div className="font-bold flex ">
          <div className="basis-1/2 max-w-[200px]">Price:</div>{" "}
          <span className="basis-1/2">${details?.price}</span>
        </div>
        {/* <div>Rating: {details?.rating}</div> */}
        {/* <div className="  "> */}
          <div className="font-bold py-1 flex">
            <div className="basis-1/2 max-w-[200px]">Category:</div>
            <span className="font-normal basis-1/2">
              {" "}
              {details?.category_id.name.charAt(0).toUpperCase() +
                details?.category_id.name.slice(1)}
            </span>
          </div>
          <div className="font-bold py-1 flex">
            <div className="basis-1/2 max-w-[200px]">Brand:</div>
            <span className="font-normal basis-1/2 ">
              {" "}
              {details?.brand.charAt(0).toUpperCase() + details?.brand.slice(1)}
            </span>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}
