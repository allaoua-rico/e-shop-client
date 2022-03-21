import { HiOutlineMailOpen } from "react-icons/hi";
import { FiFacebook, FiInstagram, FiLinkedin } from "react-icons/fi";
import Link from "next/link";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_b09q964",
        "template_op8ycwe",
        form.current,
        "user_xGpbGhfgYimOY1FILIx0a"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="my-14 ">
      <hr className="h-[1px] w-full bg-[#e8e8e8] my-14 " />

      <div className="flex flex-col gap-y-3 md:flex-row gap-x-9 md:items-center md:my-20 lg:my-40">
        <div>
          <h2 className="flex gap-x-2 text-4xl md:text-4xl font-light">
            <span className="font-semibold">Keep  </span> Connected
          </h2>
          <p className="text-[#999999] py-2">
            Get updates by subscribe our weekly newsletter
          </p>
        </div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className=" h-fit pb-2 flex items-center w-full border-b border-[#999999]"
        >
          <div className="basis-11/12">
            <input
              type="email"
              required
              className="bg-transparent w-full p-4 outline-0	"
              placeholder="Enter Your Email"
              label="Email"
              name="email"
            />
          </div>
          <button
            type="submit"
            className="font-bold group  basis-1/12 h-full flex-grow flex items-center justify-center gap-x-3"
          >
            <HiOutlineMailOpen className="group-hover:stroke-red-500 duration-300 transition-all w-[25px] h-[25px]" />
            <div className="group-hover:text-red-500 duration-300 transition-all">
              SEND
            </div>
          </button>
        </form>
      </div>
      <hr className="h-[1px] w-full bg-[#e8e8e8]  my-14" />
      <div className="flex flex-col items-center gap-y-3 my-8">
        <h3 className="font-bold text-sm">FOLLOW ME</h3>
        <div className="flex gap-x-5">
          <FiFacebook className="hover:stroke-red-500 w-[19px] h-[19px] duration-300 cursor-pointer" />
          <FiInstagram className="hover:stroke-red-500 w-[19px] h-[19px] duration-300 cursor-pointer" />
          <FiLinkedin className="hover:stroke-red-500 w-[19px] h-[19px] duration-300 cursor-pointer" />
        </div>
      </div>
      <div className="text-center text-[#999999]">
        <p>
          Mern stack web app written from scratch from front to end, design
          inspired
          <br />
          from the template :
        </p>
        <Link href="https://live.hasthemes.com/html/2/norda-preview/norda/index-2.html">
          <a
            className="text-blue-400 ml-1"
            href="https://live.hasthemes.com/html/2/norda-preview/norda/index-2.html"
          >
            NORDA
          </a>
        </Link>
        <p>
          I used Tailwind CSS for all the styling (animations included), and
          SwiperJs for the carousels.
        </p>
      </div>
    </div>
  );
}
