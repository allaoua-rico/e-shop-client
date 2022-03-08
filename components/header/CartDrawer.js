import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useStateValue } from "../stateProvider";
import basketSorter from "../../frontLib/basketSorter";
import { MdDeleteOutline } from "react-icons/md";
import { getBasketTotal } from "../reducer";

export default function CartDrawer({ toggle, returnValue }) {
  const [{ basket }, dispatch] = useStateValue();
  let slicedArray = basketSorter(basket);
  // console.log(basket);
  const [total, setTotal] = useState(0);

  const [state, setState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  const removeFromBasket = (id) => {
    dispatch({
      type: "REMOVE_MULTIPLE_FROM_BASKET",
      id: id,
    });
  };
  useEffect(() => {
    setTotal(getBasketTotal(basket));
  }, [basket]);
  useEffect(() => {
    returnValue(state);
  }, [state]);
  useEffect(() => {
    setState(toggle);
  }, [toggle]);
  return (
    <Drawer
      transitionDuration={350}
      sx={{
        "& .MuiDrawer-paper": {
          width: "60%",
        },
        position: "relative",
      }}
      anchor={"right"}
      open={state}
      onClose={toggleDrawer(false)}
    >
      <div
        className="hover:rotate-90 duration-[400ms] cursor-pointer absolute top-[35px] right-[25px] flex justify-end"
        onClick={toggleDrawer(false)}
      >
        <AiOutlineClose className="hover:fill-red-500 h-8" />
      </div>
      <div className=" mt-[60px] mx-[15px]">
        <h2 className="text-xl font-bold mb-[35px] ">Shopping Cart</h2>
        {slicedArray?.map((item) => (
          <div className="flex gap-x-10">
            <Link href={`/details?id=${item.id}`}>
              <img
                src={item.image}
                alt={item.image}
                className="cursor-pointer max-w-[130px]"
              />
            </Link>
            <div className="flex justify-between w-full pr-5">
              <div>
                <Link href={`/details?id=${item.id}`}>
                  <div className="cursor-pointer font-semibold">
                    {item.title}
                  </div>
                </Link>

                <div className="flex gap-x-1 mt-8">
                  <div>{item.counter}</div>x<div>${item.price}.00</div>
                  <div>=</div>
                  <div>${item.counter * item.price}.00</div>
                </div>
              </div>
              <div
                className="cursor-pointer flex items-center"
                onClick={() => removeFromBasket(item.id)}
              >
                <MdDeleteOutline className="w-8 h-8" />
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <div className="font-bold text-lg">Subtotal:</div>
          <div className="font-medium	">${total}.00</div>
        </div>
        <div className="w-[250px] flex flex-col gap-y-[10px] mt-6">
          <button className="h-[50px] w-full bg-black hover:bg-red-500 duration-[400ms] text-white font-medium  ">
            View Cart
          </button>
          <Link href={"/Checkout"}>
            <button className="h-[50px] w-full bg-black hover:bg-red-500 duration-[400ms] text-white font-medium ">
              Chekcout
            </button>
          </Link>
        </div>
      </div>
      {/* {list(anchor)} */}
    </Drawer>
  );
}
