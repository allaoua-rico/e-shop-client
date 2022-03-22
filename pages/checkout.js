import React, { useEffect, useState } from "react";
import { useStateValue } from "../components/stateProvider";
import basketSorter from "../frontLib/basketSorter";
import Link from "next/link";
import { getBasketTotal } from "../components/reducer";
import { MdDeleteOutline } from "react-icons/md";
import Header from "../components/header/Header";
import Stripe from "../components/Stripe";
import { useRouter } from "next/router";
import Head from "next/head";
export default function Checkout() {
  const [{ user,basket }, dispatch] = useStateValue();
  let slicedArray = basketSorter(basket);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const removeAllFromBasket = (id) => {
    dispatch({
      type: "REMOVE_MULTIPLE_FROM_BASKET",
      id: id,
    });
  };
  const addToBasket = (item) => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: item,
    });
  };
  const removeFromBasket = (item) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: item.id,
    });
  };
  useEffect(() => {
    setTotal(getBasketTotal(basket));
  }, [basket]);
  useEffect(() => {
    !user && router.push('/login')
  }, [user]);
  return (
    <div>
              <Head>
          <title>Norda</title>
          <meta name="description" content="E-commerce web app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Header />
      <div className=" mx-[15px] sm:mx-auto sm:max-w-xl md:max-w-[700px] lg:max-w-[930px] xl:max-w-[1180px]">
        <div className=" mt-[60px] mx-[15px] flex flex-col gap-y-16">
          <div>
            <h2 className="text-xl font-bold mb-[40px] text-center">
              Shopping Cart
            </h2>
            {slicedArray?.map((item) => (
              <div key={item} className="flex gap-x-10">
                <Link href={`/details?id=${item.id}`} passHref>
                  <a>
                    <img
                      src={item.image}
                      alt={item.image}
                      className="cursor-pointer max-w-[130px]"
                    />
                  </a>
                </Link>
                <div className="flex justify-between w-full pr-5">
                  <div>
                    <Link href={`/details?id=${item.id}`} passHref>
                      <a>
                        <div className="cursor-pointer font-semibold">
                          {item.title}
                        </div>
                      </a>
                    </Link>

                    <div className="flex gap-x-3 mt-8 items-center">
                      <div className=" flex mt-2">
                        <button
                          className="px-[14px] w-10 py-[8px] border border-[#e3e4e9]"
                          onClick={() => removeFromBasket(item)}
                        >
                          -
                        </button>
                        <div className="px-[14px] w-10 py-[8px] text-center">
                          {item?.counter && item.counter}
                        </div>
                        <button
                          className="px-[14px] w-10 py-[8px] border  border-[#e3e4e9]"
                          onClick={() => addToBasket(item)}
                        >
                          +
                        </button>
                      </div>
                      <div>=</div>
                      <div>${item.counter * item.price}.00</div>
                    </div>
                  </div>
                  <div
                    className="cursor-pointer flex items-center group"
                    onClick={() => removeAllFromBasket(item.id)}
                  >
                    <MdDeleteOutline className="w-8 h-8 group-hover:fill-red-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex mx-auto gap-x-6 items-center">
            <div className="font-bold text-lg">Subtotal:</div>
            <div className="font-medium	">${total}.00</div>
          </div>
          <div className="w-[250px] flex flex-col gap-y-[10px] mt-6"></div>
        </div>
        <Stripe basket={basket} />
      </div>
    </div>
  );
}
