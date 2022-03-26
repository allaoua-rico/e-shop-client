import * as React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import useMediaQuery from "@mui/material/useMediaQuery";
import { chainPropTypes } from "@mui/utils";
import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import useSWR from "swr";
import Link from "next/link";

export default function SearchInput() {
  const [input, setInput] = React.useState("");
  const [productsArray, setProductsArray] = React.useState([]);
  const [searchClicked, setSearchClicked] = React.useState(false);

  const baseUrl = `/api/search?title=`;
  let url = baseUrl + input;
  const fetcher = (url) =>
{    
  console.log(url,`https://${process.env.VERCEL_URL}`)
  fetch(`https://${process.env.VERCEL_URL}`+url,{method:'GET'})
      .then((r) => r.json())
      .then((res) =>{
      console.log(res)
        setProductsArray(res.map((obj) => ({ label: obj.title, id: obj._id })))}
      );}

  useSWR(input.replace(/\s/g, "").length && url, fetcher);

  return (
    <div className="w-full">
      <div className=" h-[50px] gap-x-2 flex items-center w-full ">
        <button className="basis-1/12 h-full flex-grow flex items-center justify-center ">
          <AiOutlineSearch
            onClick={() => setSearchClicked(!searchClicked)}
            className="hover:fill-red-500 duration-300 w-[20px] h-[20px]"
          />
        </button>
        <div className="basis-11/12 mb-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={productsArray}
            onChange={(e, val) => setInput(val || "")}
            noOptionsText="No results found"
            renderOption={(props, option) => {
      console.log(option)

              return <Link passHref href={`/details?id=${option.id}`}>
                <a className="p-2 border-b-2 block hover:bg-slate-400 hover:text-white">{option.label}</a>
              </Link>}
            }
            onInputChange={(e, val) => setInput(val || "")}
            freeSolo
            onOpen={() => setSearchClicked(true)}
            onClose={() => setSearchClicked(false)}
            open={searchClicked}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  height: "100%",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#D1D5DB",
                  },
                  "& .MuiTextField-root": {
                    bgColor: "#f6f6f6",
                  },
                }}
                variant="standard"
                label="Search for products"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
