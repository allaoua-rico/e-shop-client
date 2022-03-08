import React, { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import Product from "./Product";
import useSWR from "swr";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function ProductArea({ cats }) {
  const baseUrl = `/api/products?page=`;
  const [url, setUrl] = useState(baseUrl + 1);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR(url, fetcher);

  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    console.log(url);
  }, [url]);

  function setUrlIndexAndCat(index, cat) {
    //fct that take params: index and cat and change only one of them or both

    // const currentIndex= url.split('?page=')[1];
    const currentCat = url.split("&cat=")[1] || " ";
    if (currentCat !== cat && cat !== "") {
      // dispatch({
      //     type:'SET_PAGE_INDEX',
      //     pageIndex: 1
      //   })
      setUrl(baseUrl + index + "&cat=" + cat);
    } else {
      setUrl(baseUrl + index + "&cat=" + currentCat);
    }
  }
  let productElementsArray = [];
  // const data = {
  //   _id: 1,
  //   title: "title that is really long ",
  //   price: 100,
  //   rating: 4,
  //   imagesArray: ["/products/product-16.jpg"],
  // };
  data?.map((item) => {
    productElementsArray.push(
      <Product
        id={item?._id}
        title={item?.title}
        price={item?.price}
        rating={item?.rating}
        image={item?.imagesArray[0]}
      />
    );
  });
  let pageIndex = 1;
  return (
    <div className="w-full text-center overflow-visible ">
      <div className="mb-12">
        <h2 className="text-[31px]">
          <span className="font-extrabold">Best </span> Seller
        </h2>
        <p className="text-[#9f99b3]">Top our product best selling</p>
      </div>
      <div className="flex justify-center items-center md:justify-between  w-full flex-wrap md:flex-nowrap">
        <div className="flex justify-center md:justify-start gap-x-8 mb-4 w-full text-[15px] flex-wrap">
          <button
            onClick={() => {
              setUrlIndexAndCat(1, " ");
            }}
          >
            {" "}
            All PRODUCTS{" "}
          </button>
          {cats?.map((cat) => (
            <button
              key={cat.name}
              className="text-gray-400"
              onClick={() => {
                setUrlIndexAndCat(1, cat.name);
              }}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
        <Link href="/products">
          <div className="flex gap-x-3 mb-4 items-center font-semibold text-sm cursor-pointer   ">
            <div className="w-max">SEE ALL PRODUCTS</div>
            <IoIosArrowForward className="h-5 w-5 text-base	stroke-[1px]" />
          </div>
        </Link>
      </div>
      <ProductsGrid index={pageIndex} products={productElementsArray} />
    </div>
  );
}
