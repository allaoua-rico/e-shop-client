import React, { useEffect, useState } from "react";
import Product from "./ProductArea/Product";
import useSWR from "swr";

export default function RelatedProducts({ brand, cat, id }) {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR(
    "/api/related?cat=" + cat + "&exclude=" + id,
    fetcher
  );
  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-8">RELATED PRODUCTS</h2>
      <div className="md:flex justify-center flex-wrap">
        {data?.map((item) => (
          <div key={item.title} className="md:basis-1/2 px-4 lg:basis-1/3 ">
            <Product
              id={item?._id}
              title={item?.title}
              price={item?.price}
              rating={item?.rating}
              image={item?.imagesArray[0]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
