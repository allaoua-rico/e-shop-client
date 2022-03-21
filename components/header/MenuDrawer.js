import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useStateValue } from "../stateProvider";
import { VscDebugDisconnect } from "react-icons/vsc";

export default function MenuDrawer({ toggle, returnValue }) {
  const [{ user }, dispatch] = useStateValue();

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
  useEffect(() => {
    returnValue(state);
  }, [state]);
  useEffect(() => {
    setState(toggle);
  }, [toggle]);
  const handleSignOut = () => {
    if (user) {
      localStorage.removeItem("storageUser");
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  };
  return (
    <Drawer
      transitionDuration={350}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "290px", sm: "330px" },
        },
        position: "relative",
      }}
      anchor={"right"}
      open={state}
      onClose={toggleDrawer(false)}
    >
      <div
        className=" hover:rotate-90 duration-[400ms] cursor-pointer absolute top-[35px] right-[25px] flex justify-end"
        onClick={toggleDrawer(false)}
      >
        <AiOutlineClose className="hover:fill-red-500 h-8" />
      </div>
      <div className="w-10/12 flex flex-col items-center gap-y-[30px] mx-auto mt-[80px]">
        <SearchInput />
        <hr className="h-[2px] w-full bg-[#ffffff]" />
        {user?.role === "admin" && (
          <Link href={"/addProduct"} passHref>
            <a className="flex items-center w-4/5 gap-x-3 group duration-500 transition-all ml-8 whitespace-nowrap justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <AiOutlineFileAdd className="w-7 h-7" />{" "}
              Add Product
            </a>
          </Link>
        )}
        {user && (
          <a
            onClick={handleSignOut}
            className="gap-x-3 w-4/5 cursor-pointer ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-700"
          >
            <VscDebugDisconnect className="w-7 h-7 fill-white" />
            Log Out
          </a>
        )}

        {/* contact */}
      </div>

      {/* {list(anchor)} */}
    </Drawer>
  );
}
