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
export default function Login() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [logReg, setLogReg] = useState(1);
  const [actualPassword, setActualPassword] = useState("");
  const [actualEmail, setActualEmail] = useState();
  const [responseMsg, setResponseMsg] = useState();
  const [resSpinner, setResSpinner] = useState(false);
  const [passReset, setPassReset] = useState(false);
  const router = useRouter();

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required7"),
    // .notOneOf([actualEmail], "Email already assigned to an account."),

    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    // .notOneOf([actualPassword], "Invalid password"),
    cPassword:
      !logReg &&
      yup
        .string("Enter your password")
        .required("Please retype your password.")
        .oneOf([yup.ref("password")], "Your passwords do not match."),
  });
  const [validation, setValidation] = useState(validationSchema);
  const validationSchemaReset = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  useEffect(() => {
    if (actualEmail) {
      console.log(actualEmail);

      setValidation(
        yup.object({
          email: yup
            .string("Enter your email")
            .email("Enter a valid email")
            .required("Email is required7")
            .notOneOf(
              [actualEmail],
              logReg
                ? "Email not associated to any account"
                : "Email already assigned to an account."
            ),
          password: yup
            .string("Enter your password")
            .min(8, "Password should be of minimum 8 characters length")
            .required("Password is required")
            .notOneOf([actualPassword], "Invalid password"),
          cPassword:
            !logReg &&
            yup
              .string("Enter your password")
              .required("Please retype your password.")
              .oneOf([yup.ref("password")], "Your passwords do not match."),
        })
      );
    }
  }, [actualEmail, actualPassword]);

  const handleSubmit = (values) => {
    console.log("fetch");
    setResSpinner(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...values, op: logReg ? "login" : "register" }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResSpinner(false);
        // console.log(data);
        data.message === "Successfully loggedIn" &&
          dispatch({
            type: "SET_USER",
            user: {
              username: data.username,
              token: data.token,
              role: data.role[0],
            },
          });

        data.message === "Email already assigned to an account." &&
          setActualEmail(values.email);
        data.message === "Invalid Email" && setActualEmail(values.email);
        data.message === "Invalid password" &&
          setActualPassword(values.password);
        data.message === "Couldn't create the user" &&
          setResponseMsg(data.message);
      });
  };
  const handleReset = (values) => {
    setResponseMsg("");
    fetch("/api/password-reset", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        setResponseMsg(res.msg);
      });
  };
  useEffect(() => {
    if (user) {
      // console.log(user);
      localStorage.setItem("storageUser", JSON.stringify(user));
      let saved = JSON.parse(localStorage.getItem("storageUser"));
      if (saved) {
        router.query.red ? router.push("/") : router.back();
      }
    }
  }, [user]);
  const formikReset = useFormik({
    initialValues: {
      email: "allaoua.boudriou@gmail.com",
    },
    validationSchema: validationSchemaReset,
    onSubmit: (values) => handleReset(values),
  });
  const formik = useFormik({
    initialValues: {
      email: "allaoua.boudriou@gmail.com",
      password: "123456789",
      cPassword: "123456789",
    },
    validationSchema: validation,
    onSubmit: (values) => handleSubmit(values),
  });
  const { validateForm } = formik;
  useEffect(() => {
    // console.log(validation);
    validateForm();

    // console.log("validationcghanger");
  }, [validation]);
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
        <span className="text-red-500 font-normal px-2">Login</span>
      </div>
      <div className="my-32 flex flex-col">
        <div className="flex justify-center gap-x-5 my-20">
          <button
            className={"text-xl font-bold " + (logReg ? "" : "text-gray-400")}
            onClick={() => setLogReg(1)}
          >
            Login
          </button>
          |
          <button
            className={"text-xl font-bold " + (logReg ? "text-gray-400" : "")}
            onClick={() => setLogReg(0)}
          >
            Register
          </button>
        </div>
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
                    {logReg ? "Sign in" : "Register "}
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    autocomplete="off"
                    onSubmit={formik.handleSubmit}
                  >
                    <TextField
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      variant="standard"
                      margin="normal"
                      required
                      fullWidth
                      id="theEmail"
                      label="Email Address"
                      type="email"
                      name="email"
                      autoComplete="off"
                      autoFocus
                    />
                    <div
                      className={
                        "w-[50vw] max-w-xl transition duration-1000 " +
                        (passReset && logReg ? "translate-x-[80vw]" : " ")
                      }
                    >
                      <TextField
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
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
                    <div
                      className={
                        " w-full transition duration-1000 " +
                        (logReg ? "translate-x-[100vw]" : " ")
                      }
                    >
                      <TextField
                        value={formik.values.cPassword}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.cPassword &&
                          Boolean(formik.errors.cPassword)
                        }
                        helperText={
                          formik.touched.cPassword && formik.errors.cPassword
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
                    <div
                      className={
                        " w-full transition duration-700 " +
                        (logReg ? " -translate-y-[80px] " : " ") +
                        (passReset && logReg ? " -translate-y-[140px] " : "")
                      }
                    >
                      <Button
                        type="button"
                        onClick={() =>
                          !passReset
                            ? formik.handleSubmit()
                            : formikReset.handleSubmit()
                        }
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
                        ) : logReg ? (
                          !passReset ? (
                            "Sign In"
                          ) : (
                            "Reset password"
                          )
                        ) : (
                          "Register"
                        )}
                      </Button>
                      <div
                        className={
                          "flex justify-end mr-5 mt-5" +
                          (logReg == 0 &&
                            " opacity-0 transition-all duration-500")
                        }
                      >
                        <button
                          className="underline"
                          onClick={() => setPassReset(!passReset)}
                          disabled={resSpinner || !logReg}
                          type="button"
                        >
                          {passReset ? "Cancel" : "Reset Your password"}
                        </button>
                      </div>
                    </div>
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
