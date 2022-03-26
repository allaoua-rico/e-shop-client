import { Rating, Tooltip, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
// import { useStateValue } from './stateProvider';
import { useTheme } from "@mui/material/styles";
import { MdAddShoppingCart, MdStar } from "react-icons/md";
import { IconButton } from "@mui/material";
// import DescriptionIcon from '@mui/icons-material/Description';
import Link from "next/link";
import { useStateValue } from "../stateProvider";

export default function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff9806",
    },
  });

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const addToBasket = () => {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          //   rating:rating
        },
      });
  };
//   useEffect(() => {  
//     const storageBasket=JSON.parse(localStorage.getItem("basket"));
//     // console.log(storageBasket?.length,basket?.length)
//     if(storageBasket?.length !== basket?.length){
//         localStorage.setItem("basket",JSON.stringify(basket));
//     }
// },[basket]);
  //     // console.log(matches)
  //     let styles={
  //         backgroundRepeat: 'no-repeat',
  //         backgroundAttachment: 'scroll',
  //         backgroundPosition: 'center',
  //         backgroundSize: 'cover',
  //         width: "400px",
  //         height: "400px",
  //         backgroundImage:`url("${image}")`,
  //         overflow:"hidden",
  //     }
  // useEffect(() => {
  //     const storageBasket=JSON.parse(localStorage.getItem("basket"));
  //     if(storageBasket?.length < basket?.length){
  //         localStorage.setItem("basket",JSON.stringify(basket));
  //     }
  // },[basket]);
  return (
    <div className="h-full  group overflow-hidden flex flex-col items-center justify-between">
      {/* <div className="hover:backdrop-blur-sm transition duration-200 w-full h-full flex flex-col items-center justify-between"> */}
      {/* <img className={ matches ? `hidden` : `object-cover h-72 w-96 md:h-96  mb-4 `} src={image}/> */}
      <Link href={`/details?id=${id}`} passHref>
        <a className="overflow-hidden cursor-pointer h-full w-full aspect-[2/3]">
          <img
            className="object-cover h-full group-hover:scale-110 transition-all duration-500"
            src={image}
          />
        </a>
      </Link>
      <div className="relative w-full">
        <div
          className=" flex items-center flex-col py-5 w-full bg-white absolute transition-all duration-500
         group-hover:-translate-y-10 opacity-0 z-10 group-hover:opacity-100"
        >
          {rating && (
            <div className="flex justify-center">
              <div className="flex items-center text-[#999999]">
                <StyledRating
                  emptyIcon={<MdStar className="w-[18px] h-[18px]" />}
                  size="small"
                  value={rating}
                  readOnly
                />
                ({rating})
              </div>
            </div>
          )}
          <p className="truncate font-bold text-center text-1xl w-full text-gray-400 hover:text-red-500 hover:cursor-pointer transition-all duration-500">
            {title}
          </p>
          <p className=" text-center my-1  sm:text-base text-lg">${price}.00</p>
          <button onClick={addToBasket} className="bg-black w-fit text-white font-bold py-3 px-6 rounded-full hover:bg-red-500 transition-all duration-500">
            Add To Cart
          </button>
        </div>
        <div className="py-5 z-10 bg-white ">
          {rating && (
            <div className="flex justify-center">
              <div className="flex items-center text-[#999999]">
                <StyledRating
                  emptyIcon={<MdStar className="w-[18px] h-[18px]" />}
                  size="small"
                  value={rating}
                  readOnly
                />
                ({rating})
              </div>
            </div>
          )}
          <p className="font-bold text-1xl text-center truncate">{title}</p>
          <p className=" text-center my-1  sm:text-base text-lg">${price}.00</p>
        </div>
      </div>

      {/* <div className="flex justify-between gap-x-6 transition duration-300 sm:translate-y-20	group-hover:translate-y-0">
        <div className="bg-white w-9 h-9 rounded-full flex justify-center items-center transition duration-[450ms] hover:rotate-[360deg] hover:bg-pink-400 shoppingParent ">
          <Link  href={`/details?id=${id}`}>
                    <IconButton disableRipple={true} aria-label="delete" size="sm"
                    //  onClick={addToBasket}
                     >
                        <Tooltip title="Description">
                            <DescriptionIcon  className='transition-all duration-[450ms]' sx={{color:'black','.shoppingParent:hover &': { color: 'white' }}}/>
                        </Tooltip>
                    </IconButton>
                </Link>
        </div>
        <div className="bg-white w-9 h-9 rounded-full flex justify-center items-center transition duration-[450ms] hover:rotate-[360deg] hover:bg-pink-400 shoppingParent ">
          <IconButton disableRipple={true} aria-label="delete" size="sm" 
                    // onClick={addToBasket}
                    >
                        <Tooltip title="Ajouter au pannier">
                            <MdAddShoppingCart className='transition-all duration-[450ms]' sx={{color:'black','.shoppingParent:hover &': { color: 'white' }}}/>
                        </Tooltip>
                    </IconButton>
        </div>
      </div> */}
      {/* </div> */}
    </div>
  );
}
