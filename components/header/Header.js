import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "@mui/material";
import { BsPerson, BsHeart } from "react-icons/bs";
import {
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import CartDrawer from "./CartDrawer";
import MenuDrawer from "./MenuDrawer";
import SearchInput from "./SearchInput";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useStateValue } from "../stateProvider";
import { getBasketTotal } from "../reducer";
export default function Header() {
  const [{ user, basket }, dispatch] = useStateValue();
  const [carttoggleState, setCarttoggleState] = useState(false);
  const [menutoggleState, setMenutoggleState] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(getBasketTotal(basket));
  }, [basket]);
  const lg = useMediaQuery("(max-width:1023px)");
  return (
    <div className="flex py-7 lg:py-[60px] lg:border-b-[#dadada] lg:border-b  lg:px-0 px-4 justify-around items-center ">
      <div className="hidden lg:inline">
        <SearchInput />
      </div>
      <Link href={"/"} passHref>
        <a className="cursor-pointer">
          <Image
            width={lg ? 109 : 130}
            height={lg ? 19 : 25}
            layout="fixed"
            src={"/logo.png"}
          />
        </a>
      </Link>
      <div className="flex gap-x-3 justify-between items-center ">
        {user == null && (
          <Link href="/login">
            <div className="flex items-center sm:gap-x-4 cursor-pointer sm:mr-7 group">
              <BsPerson className="w-auto h-7 group-hover:fill-red-500  duration-[400ms]" />
              <a className="group-hover:text-red-500 duration-[400ms] sm:inline hidden">
                Log In / Register
              </a>
            </div>
          </Link>
        )}

        {/* <BsHeart className='w-10 h-5 hover:fill-red-500 '/> */}
        <Badge
          anchorOrigin={
            !lg
              ? { vertical: "bottom", horizontal: "right" }
              : { vertical: "top", horizontal: "right" }
          }
          onClick={() => setCarttoggleState(true)}
          badgeContent={basket?.length || 0}
          showZero={true}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "black",
              color: "white",
            },
            width: "25px",
            cursor: "pointer",
          }}
          // color="white"
        >
          <AiOutlineShoppingCart className="w-auto h-6 hover:fill-red-500 duration-[400ms] cursor-pointer" />
        </Badge>
        <div className="sm:inline hidden">{total}.00</div>
        <AiOutlineMenu
          onClick={() => setMenutoggleState(true)}
          className="lg:hidden w-auto h-6 ml-1 cursor-pointer"
        />
      </div>
      <CartDrawer
        returnValue={(cartDrawerState) => setCarttoggleState(cartDrawerState)}
        toggle={carttoggleState}
      />
      <MenuDrawer
        returnValue={(menutoggleState) => setMenutoggleState(menutoggleState)}
        toggle={menutoggleState}
      />
    </div>
  );
}
