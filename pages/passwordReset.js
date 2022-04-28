import Link from "next/link";
import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { MdLockOutline } from "react-icons/md";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import { CircularProgress } from "@mui/material";
import Contact from "../components/Contact";
import { useStateValue } from "../components/stateProvider";
import { useRouter } from "next/router";
import Head from "next/head";
import { SignalCellularNoSimOutlined } from "@material-ui/icons";

export default function PasswordReset() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [logReg, setLogReg] = useState(1);
  const [actualPassword, setActualPassword] = useState("");
  const [actualEmail, setActualEmail] = useState();
  const [responseMsg, setResponseMsg] = useState();
  const [resSpinner, setResSpinner] = useState(false);
  const [passReset, setPassReset] = useState(false);
  const router = useRouter();

  const validationSchemaReset = yup.object({
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    cPassword: yup
      .string("Enter your password")
      .required("Please retype your password.")
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  });

  const handleReset = (values) => {
    let form = {
      password: values.password,
      token: router.query.t,
      // user_id: router.query.id,
    };
    console.log(form);

    setResponseMsg("");
    fetch(`/api/users/resetPassword/${router.query.t}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        res.msg === "password reset sucessfully." &&  router.push('/login?red=home');
      });
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem("storageUser", JSON.stringify(user));
      let saved = JSON.parse(localStorage.getItem("storageUser"));
      saved && router.back();
    }
  }, [user]);
  const formikReset = useFormik({
    initialValues: {
      password: "",
      cPassword: "",
    },
    validationSchema: validationSchemaReset,
    onSubmit: (values) => handleReset(values),
  });

  // useEffect(() => {
  //   console.log(passReset);
  // }, [passReset]);
  return (
    <div>
      <Head>
        <title>Norda</title>
        <meta name="description" content="E-commerce web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="py-11 flex justify-center  font-semibold text-lg bg-[#f0f4f6]">
        <Link href="/" passHref>
          <a className="cursor-pointer mr-2">Home</a>
        </Link>
        {" /"}
        <span className="text-red-500 font-normal px-2">Reset Password</span>
      </div>
      <div className="my-32 flex flex-col">
        <div className="mx-auto flex justify-center items-center border border-black max-w-[400px] sm:max-w-[700px] overflow-hidden">
          <div className={" w-full"}>
            <Grid container component="main" sx={{ height: "100%" }}>
              <CssBaseline />
              <Grid item component={Paper} elevation={6} square>
                <Box
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {responseMsg && (
                    <div className="text-red-500 text-xl">{responseMsg}</div>
                  )}
                  <Avatar sx={{ m: 1, bgcolor: "black" }}>
                    <MdLockOutline />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Reset Password
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    autocomplete="off"
                    onSubmit={formikReset.handleSubmit}
                  >
                    <div className="min-w-[50vw] max-w-xl transition duration-1000 ">
                      <TextField
                        value={formikReset.values.password}
                        onChange={formikReset.handleChange}
                        error={
                          formikReset.touched.password &&
                          Boolean(formikReset.errors.password)
                        }
                        helperText={
                          formikReset.touched.password &&
                          formikReset.errors.password
                        }
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                      />
                    </div>
                    <div className=" w-full">
                      <TextField
                        value={formikReset.values.cPassword}
                        onChange={formikReset.handleChange}
                        error={
                          formikReset.touched.cPassword &&
                          Boolean(formikReset.errors.cPassword)
                        }
                        helperText={
                          formikReset.touched.cPassword &&
                          formikReset.errors.cPassword
                        }
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="cPassword"
                        label="Confirm Password"
                        type="password"
                        name="cPassword"
                        autoComplete="new-password"
                      />
                    </div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={resSpinner}
                      style={{
                        borderRadius: 35,
                        backgroundColor: "black",
                        fontSize: "18px",
                        color: "white",
                      }}
                    >
                      {resSpinner ? (
                        <CircularProgress sx={{ color: "white" }} />
                      ) : (
                        "Reset password"
                      )}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className=" mx-[15px] sm:mx-auto sm:max-w-xl md:max-w-[700px] lg:max-w-[930px] xl:max-w-[1180px] ">
        <Contact />
      </div>
    </div>
  );
}
