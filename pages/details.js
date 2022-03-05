import React, { useState } from "react";
import DetailsSlider from "../components/DetailsSlider";
import Header from "../components/header/Header";
import dbConnect from "../lib/dbConnect";
import { useRouter } from "next/router";
import Product from "../models/product";
import DetailsSecondSlider from "../components/DetailsSecondSlider";
import RightDetails from "../components/RightDetails";
import DetailsDesc from "../components/DetailsDesc";
import RelatedProducts from "../components/RelatedProducts";
import Contact from "../components/Contact";

export default function Details({ product }) {
  const [number, setNumber] = useState(1);
  const details = JSON.parse(product);
  console.log(details);
  return (
    <div className="">
      <div className=" mx-[15px] sm:mx-auto sm:max-w-xl md:max-w-[700px] lg:max-w-[930px] xl:max-w-[1180px]">
      <Header />

      </div>

      <div className="py-11 flex justify-center  font-semibold text-lg bg-[#f0f4f6]">
        Home /{" "}
        <span className="text-red-500 font-normal px-2"> Product Details</span>
      </div>
      <div className="sm:max-w-xl md:max-w-[800px] lg:max-w-[930px] xl:max-w-[1180px] px-10 md:px-20 h-8 mx-auto">
        <div className="mx-3">
          <div className="top flex flex-col md:flex-row  py-16 gap-x-4">
            <div className="flex flex-col md:basis-[50%] md:min-w-[50%] justify-center items-center gap-y-5">
              <DetailsSlider product={details} />
              {/* <div className="w-full  max-w-xl">
            <DetailsSecondSlider images={details?.imagesArray} />
          </div> */}
            </div>

            <div className="md:basis-[50%] md:min-w-[50%] mt-10 md:mt-0 ">
              <RightDetails details={details ? details : {}} />
              <div className="flex mt-10 gap-x-8">
                <div>
                  <div className="-mt-1">Quantity:</div>
                  <div className=" flex mt-2">
                    <button
                      onClick={() => number > 1 && setNumber(number - 1)}
                      className="px-[14px] w-10 py-[8px] border border-[#e3e4e9]"
                    >
                      -
                    </button>
                    <div className="px-[14px] w-10 py-[8px] text-center">
                      {number && number}
                    </div>
                    <button
                      onClick={() => number < 10 && setNumber(number + 1)}
                      className="px-[14px] w-10 py-[8px] border  border-[#e3e4e9]"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="bg-black text-white items-stretch py-3 px-5 text-lg font-medium ">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <DetailsDesc details={details ? details : {}} />
          <RelatedProducts
            brand={details.brand}
            cat={details.category_id._id}
            id={details._id}
          />
        </div>
        <div className="mx-[15px] ">
          <Contact />
        </div>
      </div>

    </div>
  );
}
export async function getServerSideProps({ query }) {
  await dbConnect();
  const product = await Product.findOne({ _id: query.id })
    .populate("category_id", "name")
    .lean();
  return { props: { product: JSON.stringify(product) } };
}