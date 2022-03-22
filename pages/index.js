import mongoose from "mongoose";
import Head from "next/head";
import Contact from "../components/Contact";
import Deal from "../components/Deal";
import Header from "../components/header/Header";
import Nav from "../components/Nav";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import ProductArea from "../components/ProductArea/ProductArea";
import Slider from "../components/Slider";
import dbConnect from "../backLib/dbConnect";
import ProductCategory from "../models/category";
// var ProductCategory = mongoose.model("ProductCategory");

export default function Home({ cats }) {
  return (
    <div className="overflow-hidden  relative">
      <div className=" mx-[15px] sm:mx-auto sm:max-w-xl md:max-w-[700px] lg:max-w-[930px] xl:max-w-[1180px]">
        <Head>
          <title>Norda</title>
          <meta name="description" content="E-commerce web app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        <Nav />
        <Slider />
        {/* <NewArrivals /> */}
        <ProductArea cats={JSON.parse(cats)} />
        {/* <Press/> */}
      </div>
      <div className="bg-[#eef1f6]">
        <div className=" mx-[15px] sm:mx-auto sm:max-w-xl md:max-w-[700px] lg:max-w-[930px] xl:max-w-[1180px]">
          <Deal />
        </div>
      </div>
      <div className=" mx-[15px] sm:mx-auto sm:max-w-xl md:max-w-[700px] lg:max-w-[930px] xl:max-w-[1180px] ">
        <Contact />
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  await dbConnect();
  const categories = await ProductCategory.find({}, { _id: 0 }).lean();
  return { props: { cats: JSON.stringify(categories) } };
}
