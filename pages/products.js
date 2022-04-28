import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import dbConnect from "../backLib/dbConnect";
import ProductCategory from "../models/category";
import useSWR from "swr";
import Product from "../components/ProductArea/Product";
import ProductsGrid from "../components/ProductArea/ProductsGrid";
import RangeSlider from "../components/RangeSlider";
import { BiListUl } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import ProductsList from "../components/ProductArea/ProductsList";
import ProductForList from "../components/ProductArea/ProductForList";
import Head from "next/head";
import Contact from "../components/Contact";
import ProductModel from "../models/product";

export default function Products({ cats1, docsCount1 }) {
  const cats = JSON.parse(cats1);
  const docsCount = JSON.parse(docsCount1);

  // params for request
  const [viewLimit, setviewLimit] = useState(5);
  const [viewType, setViewType] = useState(1);
  const [cat, setCat] = useState(" ");
  const [sort, setSort] = useState("recent");
  const [boldCat, setBoldCat] = useState(" ");

  // pagination part
  const [pageIndex, setPageIndex] = useState(1);

  const baseUrl = `/api/products?page=`;
  const [url, setUrl] = useState(
    baseUrl + 1 + "&cat=" + cat + "&viewLimit=" + viewLimit
  );
  const [priceRange, setPriceRange] = useState([0, 100]);

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data } = useSWR(url, fetcher);

  let GridProductElementsArray = [];
  let ListProductElementsArray = [];

  data?.map((item) => {
    if (priceRange[0] <= item.price && item.price <= priceRange[1]) {
      GridProductElementsArray.push(
        <Product
          id={item?._id}
          title={item?.title}
          price={item?.price}
          rating={item?.rating}
          image={item?.imagesArray[0]}
        />
      );
      ListProductElementsArray.push(
        <ProductForList
          id={item?._id}
          title={item?.title}
          price={item?.price}
          rating={item?.rating}
          image={item?.imagesArray[0]}
          desc={item.desc}
          brand={item.brand}
        />
      );
    }
  });
  // console.log(data?.length);

  const matches = useMediaQuery("(min-width:640px)");

  useEffect(() => {
    if (url) {
      const currentCat = url.split("&cat=")[1].split("&")[0] || " ";
      const currentviewLimit = url.split("&viewLimit=")[1].split("&")[0] || " ";
      setBoldCat(cat);
      if (currentCat !== cat && cat !== "") {
        setUrl(
          baseUrl +
            1 +
            "&cat=" +
            cat +
            "&viewLimit=" +
            viewLimit +
            "&sort=" +
            sort
        );
        return;
      }
      //skip number of products
      const skip = viewLimit * (pageIndex - 1);
      console.log(skip);
      setUrl(
        baseUrl +
          skip +
          "&cat=" +
          cat +
          "&viewLimit=" +
          viewLimit +
          "&sort=" +
          sort
      );
    }
  }, [viewLimit, cat, pageIndex, sort]);
  return (
    <div>
      <Head>
        <title>Norda</title>
        <meta name="description" content="E-commerce web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" mx-[15px] sm:mx-auto sm:max-w-xl md:max-w-[700px] lg:max-w-[930px] xl:max-w-[1180px]">
        <Header />
      </div>
      <div className="py-11 flex justify-center  font-semibold text-lg bg-[#f0f4f6]">
        <Link href={"/"}>
          <div className="cursor-pointer mr-2">Home</div>
        </Link>
        {" /"}
        <span className="text-red-500 font-normal px-2"> Shop</span>
      </div>
      <div className="mx-3 lg:mx-7 xl:mx-10 mt-5 md:grid grid-cols-7 xl:grid-cols-5 gap-x-5">
        <div className="categoriesAndPriceRange col-span-2 xl:col-span-1">
          <div className="text-3xl font-semibold text-center my-12 hidden md:block">
            Filters :
          </div>
          <div className="border border-gray-200  my-2 px-3 py-6 flex flex-col gap-y-2">
            <h3 className="font-bold text-2xl text-center">CATEGORIES :</h3>
            <button
              className={
                boldCat !== ""
                  ? "text-gray-400 font-medium"
                  : "text-black font-bold"
              }
              onClick={() => setCat("")}
            >
              {" "}
              All PRODUCTS{" "}
            </button>
            {cats?.map((cat) => (
              <button
                key={cat?.name}
                className={
                  "uppercase " +
                  (boldCat !== cat.name
                    ? "text-gray-400 font-medium "
                    : "text-black font-bold")
                }
                onClick={() => setCat(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="text-center text-xl font-bold border border-gray-200 lg:my-8 my-2 px-8 py-6 flex flex-col gap-y-4">
            <div>Price Range:</div>
            <RangeSlider
              products={data}
              returnFilter={(arrayFilter) => setPriceRange(arrayFilter)}
            />
          </div>
          {/* <LatestProducts

          /> */}
        </div>
        <div className="viewAndProductGrid col-span-5 xl:col-span-4">
          <div className="border border-gray-300  my-3 px-3 py-4 flex justify-between items-center gap-y-2 ">
            <div className="cursor-pointer flex flex-col sm:flex-row sm:gap-x-3 gap-y-1 mr-3">
              <BsFillGridFill
                onClick={() => setViewType(1)}
                className={
                  "fill-gray-400 duration-200 transition-all h-7 w-7 " +
                  (viewType ? " scale-100  fill-black" : " scale-[0.7]")
                }
              />
              <BiListUl
                onClick={() => setViewType(0)}
                className={
                  " fill-gray-400 duration-300 transition-all h-7 w-7 " +
                  (viewType ? " scale-90" : " scale-[1.4] fill-black")
                }
              />
            </div>
            <FormControl
              sx={{ m: 1, minWidth: 80, flexBasis: "1/3", width: "100%" }}
            >
              <InputLabel
                sx={{
                  ml: "-14px",
                  fontWeight: "bold",
                  color: "#9ca3af",
                  "&.Mui-focused": { color: "black" },
                }}
                id="demo-simple-select-autowidth-label"
              >
                Products
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                // id="demo-simple-select-autowidth"
                label="Products"
                id="viewLimit"
                name="viewLimit"
                value={viewLimit}
                onChange={(e) => setviewLimit(e.target.value)}
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": { pt: "12px", pb: "5px" },
                  backgroundColor: "white",
                  "& .MuiSelect-select:focus": { backgroundColor: "white" },
                  "&:hover": { backgroundColor: "white" },
                  "&:after": { borderColor: "black" },
                }}
              >
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="12">12</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1, minWidth: 80, flexBasis: "1/3", width: "100%" }}
            >
              <InputLabel
                sx={{
                  ml: "-14px",
                  fontWeight: "bold",
                  color: "#9ca3af",
                  "&.Mui-focused": { color: "black" },
                }}
                id="demo-simple-select-autowidth-label-sort"
              >
                Sort by:
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label-sort"
                // id="demo-simple-select-autowidth-sort"
                label="Sort by:"
                id="sort"
                name="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": { pt: "12px", pb: "5px" },
                  backgroundColor: "white",
                  "& .MuiSelect-select:focus": { backgroundColor: "white" },
                  "&:hover": { backgroundColor: "white" },
                  "&:after": { borderColor: "black" },
                }}
              >
                <MenuItem value="alphabetical">Alphabetical</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="recent">Most Recent</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div id='products' className="">
            {viewType || (!matches && !viewType) ? (
              <ProductsGrid
                index={pageIndex}
                products={GridProductElementsArray}
              />
            ) : (
              <ProductsList
                index={pageIndex}
                products={ListProductElementsArray}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Pagination
          count={Math.ceil(docsCount.count / viewLimit)}
          onChange={(event, value) => {
            setPageIndex(value);
            document.getElementById("products").scrollIntoView({
              behavior: "smooth",
            });
          }}
          page={pageIndex}
          shape="rounded"
        />
      </div>
      <Contact />
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const docsCount = await ProductModel.find().estimatedDocumentCount();
  const categories = await ProductCategory.find({}, { _id: 0 }).lean();
  return {
    props: {
      docsCount1: JSON.stringify({ count: docsCount }),
      cats1: JSON.stringify(categories),
    },
  };
}
