import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import dbConnect from "../backLib/dbConnect";
import ProductCategory from "../models/category";
import { styled } from "@mui/material/styles";
import { HiCamera } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { CircularProgress } from "@mui/material";
import { useStateValue } from "../components/stateProvider";
import { useRouter } from "next/router";

export default function addProduct({ cats }) {
  const [{ user }, dispatch] = useStateValue();
  const [disabled, setDisabled] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  const [filesArray, setFilesArray] = useState([]);
  const [imagesMsg, setImagesMsg] = useState(false);
  const formRef = useRef();
  const router = useRouter();

  const validationSchema = yup.object({
    title: yup
      .string("Enter the title")
      .min(6, "The title should be at least 6 characters long.")
      .required("The title is required"),
    price: yup.number("Enter the price").required("The price is required"),
    brand: yup
      .string("Enter the brand")
      .required("Please Choose a brand or add one, please"),
    desc: yup.string("Enter your password"),
    //   .min(8, "Password should be of minimum 8 characters length"),
    //   .required("Password is required"),
    // imagesArray: yup
    //   .array()
    //   .min(1, " add ")
    //   .required("Add a least one image, please"),
    category: yup
      .string("Enter a category")
      //   .min(8, "Password should be of minimum 8 characters length")
      .required(
        "Choose a category for the product or add one or add an empty space, please"
      ),
  });
  const formik = useFormik({
    initialValues: {
      title: "title1",
      category: "shoes",
      price: "1",
      brand: "ZARA",
      desc: "",
      //   imagesArray: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });
  const handleSubmit = (values) => {
    setDisabled(true);
    if (filesArray.length == 0) {
      setImagesMsg(true);
      setDisabled(false);
    } else {
      let { category, ...props } = { ...values };
      const category1 = category.toLowerCase();
      const form = {
        category: category1,
        ...props,
        // , images: [...filesArray]
      };
      let product = new FormData(formRef.current);
      for (let i = 0; i < filesArray.length; i++) {
        product.append("images", filesArray[i]);
      }
      product.append("category", category1);
      //   console.log(product);
      fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "x-access-token": user.token,
          //   "Content-type": "application/json",
        },
        body: product,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          data._id && router.push(`/details?id=${data._id}`);
          setDisabled(false);
        });
    }
  };
  function handleInputChange(e) {
    e.preventDefault();
    let tempArray = Array.from(e.target.files);
    setFilesArray([...tempArray, ...filesArray]);
    document.getElementById("images").value = "";
  }
  useEffect(() => {
    let images = filesArray.map((file) => {
      // create images from files
      let src = URL.createObjectURL(file);
      return src;
    });
    setImagesArray([...images]);
  }, [filesArray]);
  useEffect(() => {
    filesArray.length > 0 && setImagesMsg(false);
  }, [filesArray]);
  function deleteImage(index) {
    let tempArray = [...filesArray];
    filesArray.splice(index, 1);
    setFilesArray([...filesArray]);
  }
  //   console.log(imagesArray);
    useEffect(() => {
      user?.role!=='admin' && router.back();
  }, [user]);
  const Input = styled("input")({
    display: "none",
  });
  return (
    <div>
              <Head>
          <title>Norda</title>
          <meta name="description" content="E-commerce web app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Header />
      <div className="py-11 flex justify-center  font-semibold text-lg bg-[#f0f4f6]">
        <Link passHref href={"/"}>
          <a>
            <div className="cursor-pointer mr-2">Home</div>
          </a>
        </Link>
        {"/"}
        {/* <Link passHref href={"/adminPage"}>
          <a> */}
        <div className="cursor-pointer mx-2 ">Admin Page</div>
        {/* </a>
        </Link> */}
        {"/"}
        <span className="text-red-500 font-normal px-2">Add a Product</span>
      </div>
      <div className="sm:max-w-xl md:max-w-[800px] lg:max-w-[930px] xl:max-w-[1180px] px-10 md:px-20 h-8 mx-auto">
        <Box
          ref={formRef}
          component="form"
          noValidate
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            // alignItems: "start",
          }}
          autocomplete="off"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            variant="standard"
            margin="normal"
            // required
            fullWidth
            label="Product Title"
            type="title"
            name="title"
            autoComplete="off"
            autoFocus
          />
          <TextField
            id="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            variant="standard"
            margin="normal"
            fullWidth
            label="Product price"
            type="price"
            name="price"
            autoComplete="off"
            autoFocus
          />

          <Autocomplete
            id="category"
            name="category"
            value={formik.values.category}
            onChange={(event, value) =>
              formik.setFieldValue("category", value || "")
            }
            onOpen={formik.handleBlur}
            freeSolo
            disableClearable
            fullWidth
            options={JSON.parse(cats).map((cat) => cat.name.toUpperCase())}
            onInputChange={(event, value) =>
              formik.setFieldValue("category", value || "")
            }
            renderInput={(params) => (
              <TextField
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
                {...params}
                variant="standard"
                label="Product category"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <TextField
            value={formik.values.brand}
            onChange={formik.handleChange}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}
            variant="standard"
            margin="normal"
            fullWidth
            id="brand"
            label="Product brand"
            type="brand"
            name="brand"
            autoComplete="off"
            autoFocus
          />
          <TextField
            value={formik.values.desc}
            onChange={formik.handleChange}
            error={formik.touched.desc && Boolean(formik.errors.desc)}
            helperText={formik.touched.desc && formik.errors.desc}
            variant="standard"
            margin="normal"
            fullWidth
            id="desc"
            label="Description"
            multiline
            minRows={3}
            maxRows={7}
            type="desc"
            name="desc"
            autoComplete="off"
            autoFocus
          />
          <div className="sm:w-1/2 my-10  flex items-center justify-start">
            <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4">
              Image:
            </label>
            <label className="" htmlFor="images">
              <Input
                multiple
                accept="image/*"
                id="images"
                name="images"
                type="file"
                onChange={(e) => handleInputChange(e)}
              />
              <HiCamera className="cursor-pointer w-8 h-8 mb-2 hover:fill-red-500 transition-all duration-500" />
            </label>
            <div>{imagesMsg && "Please provide at least one image"}</div>
          </div>
          <div className="w-full flex justify-center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
              style={{
                borderRadius: 35,
                backgroundColor: "black",
                fontSize: "18px",
                color: "white",
              }}
            >
              {disabled ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Add The Product"
              )}
            </Button>
          </div>
        </Box>
        <div className="w-full flex flex-col items-center">
          {imagesArray.length > 0 && (
            <>
              <h1 className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4">
                Images :
              </h1>
              <br />
              <div className="w-full max-w-sm  flex flex-col items-center gap-y-10">
                {imagesArray?.map((image, index) => {
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <img
                        className="object-contain aspect-[2/3] h-full w-full border border-gray-400 rounded-md"
                        src={image}
                      />
                      <AiFillDelete
                        className="hover:fill-red-500 cursor-pointer duration-500 transition-all w-10 h-10"
                        onClick={(e) => deleteImage(index)}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const categories = await ProductCategory.find({}, { _id: 0 }).lean();

  return { props: { cats: JSON.stringify(categories) } };
}
