import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import Mailto from "@/components/Mailto";

export default function Footer() {
  return (
    <div className="w-full bg-richblack-800 text-white py-10 text-lg hover:">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center lg:gap-[360px] px-4">
        <div className="flex items-center">
          <img src={"/images/logo.png"} alt="" className="w-24" />
          <div className="ml-4 md:ml-8 hidden sm:block">
            <div className="grid grid-cols-3 mt-2 gap-4">
              {/* {FooterLinks.map((ele) => (
                <Link
                  key={ele.id}
                  to={ele.path}
                  className="text-gray-300 mr-4  hover:text-yellow-200"
                >
                  {ele.title}
                </Link>
              ))} */}
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0">
          <p className="text-lg font-semibold">Follow Us!</p>
          <div className="flex mt-2 ">
            <Link
              href={"https://facebook.com/Conscientia.iist"}
              className="text-gray-300 hover:text-yellow-200 mr-4"
            >
              <FaFacebook />
            </Link>
            <Link
              href={"https://linkedin.com/in/conscientia-iist"}
              className="text-gray-300 hover:text-yellow-200 mr-4"
            >
              <FaLinkedin />
            </Link>
            <Link
              href={
                "https://instagram.com/conscientia.iist?igshid=YmMyMTA2M2Y="
              }
              className="text-gray-300 hover:text-yellow-200 mr-4"
            >
              <FaInstagram />
            </Link>
            <Link
              href={"https://youtube.com/channel/UCx47j3_OXElUMTBbMe-jYjw"}
              className="text-gray-300 hover:text-yellow-200"
            >
              <FaYoutube />
            </Link>
          </div>
          <div className="flex flex-col mt-4">
            <p className="text-lg font-semibold">
              For any queries, contact us at:
            </p>
            <Mailto
              email="conscientiateamiist@gmail.com"
              className="text-gray-300 hover:text-white"
            />
            <p>Phone Number: 9170150037/8092105162</p>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-300 mt-8">
        © Conscientia 2024, Indian Institute Of Space Science And Technology,
        Thiruvananthapuram, Kerala - 695547
      </p>
    </div>
  );
}
