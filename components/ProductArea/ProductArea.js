import React from "react";
import ProductsGrid from "./ProductsGrid";
import Product from "./Product";
import useSWR from "swr";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function ProductArea({ cats }) {
  const baseUrl = `/api/products?page=`;
  const [url, setUrl] = React.useState(baseUrl + 1);
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR(url, fetcher);

  React.useEffect(() => {
    console.log(data);
  }, [data]);
  React.useEffect(() => {
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
  // for (let i = 0; i < 8; i++) {
  //   productElementsArray.push(
  //     <Product
  //       id={data._id}
  //       title={data.title + i}
  //       price={data.price}
  //       rating={data.rating}
  //       image={data.imagesArray[0]}
  //     />
  //   );
  // }
  let pageIndex = 1;
  return (
    <div className="w-full text-center overflow-visible ">
      <div className="mb-12">
        <h2 className="text-[31px]">
          <span className="font-extrabold">Best </span> Seller
        </h2>
        <p className="text-[#9f99b3]">Top our product best selling</p>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex gap-x-8 mb-4 w-full text-[15px]">
          <button onClick={() => {setUrlIndexAndCat(1, " ");  }} > All PRODUCTS </button>
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
          <div className="flex gap-x-3 items-center font-semibold text-sm cursor-pointer   ">
            <div className="w-max">SEE ALL PRODUCTS</div>
            <IoIosArrowForward className="h-5 w-5 text-base	stroke-[1px]" />
          </div>
        </Link>
      </div>
      <ProductsGrid index={pageIndex} products={productElementsArray} />
    </div>
  );
}
