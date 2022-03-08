import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

export default function RangeSlider({ products, returnFilter }) {
  const [minFilter, setMinFilter] = useState();
  const [maxFilter, setMaxFilter] = useState();

  //get the min and max prices
  let max = products?.reduce((prev, current) =>
    prev.price > current.price ? prev : current
  );
  let min = products?.reduce((prev, current) =>
    prev.price < current.price ? prev : current
  );
  let prices;
  let marks;
  if (products?.length > 0) {
    //get the array of prices
    prices = products?.map((item) => item.price);
    //get the sorted array of prices
    prices?.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
    //get two values from the middle of the array to show in marks
    // const middle1 = prices[Math.floor((prices?.length * 3) / 4)];
    // const middle2 = prices[Math.floor(prices?.length / 4)];
    // const index1 = prices.findIndex((price) => price == middle1);
    // const index2 = prices.findIndex((price) => price == middle2);
    const middle = prices[Math.floor(prices?.length / 2)];
    const index = prices.findIndex((price) => price == middle);

    //create the marks array of objects
    marks = [
      { value: prices[0], label: "" + prices[0] },
      prices.length > 2 && {
        value: prices[index],
        label: "" + prices[index],
      },

      {
        value: prices[prices?.length - 1],
        label: "" + prices[prices?.length - 1],
      },
    ];
  }
  useEffect(() => {
    if (products?.length > 0) {
      //get the min and max prices
      let max = products?.reduce((prev, current) =>
        prev.price > current.price ? prev : current
      );
      let min = products?.reduce((prev, current) =>
        prev.price < current.price ? prev : current
      );
      setMinFilter(min.price);
      setMaxFilter(max.price);
      setValue1([min?.price,max?.price])
    }
  }, [products]);

  useEffect(() => {
    returnFilter([minFilter, maxFilter]);
  }, [minFilter, maxFilter]);

  const [value1, setValue1] = useState([20, 37]);
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = React.useState([20, 37]);

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        min={min?.price}
        max={max?.price}
        marks={marks}
        getAriaLabel={() => "Minimum distance"}
        value={value1}
        onChange={handleChange1}
        onChangeCommitted={(e, val) => {
          setMinFilter(val[0]);
          setMaxFilter(val[1]);
        }}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        size="small"
        sx={{ color: "black",
        '& .MuiSlider-thumb':{height:'15px',width:'15px'},
        '& .MuiSlider-mark': {
            backgroundColor: 'black',
            height: 8,
        }
        }}
      />
    </Box>
  );
}
