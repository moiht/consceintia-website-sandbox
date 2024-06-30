import Image from "next/image";
import Link from "next/link";
import Homecontent from "@/components/Homecontent";
import Footer from "@/components/Footer";
import Sponsors from "@/components/Sponsors";
import { Metadata } from "next";
import MainText from "@/components/MainText";
import AnimateText from "@/components/AnimateText";
import {
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Conscientia 2k24",
  description:
    "Conscientia 2k24 is a technical fest conducted by the Department of Computer Science and Engineering, College of Engineering, Chengannur.",
  icons: {
    icon: "/images/logo.png", // /public path
  },
  url: "https://conscientia.co.in",
  type: "website",
  siteName: "Conscientia 2k24",
};

export default function Home() {
  redirect("/home");
  return (
    <div className=" overflow-x-hidden">
      <SignedOut>
        <span className="text-white">
          Hello, Please <Link href={"/sign-in"}>log in</Link>
        </span>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      {/* <Homecontent /> */}
      {/* <MainText /> */}
      <section className="z-40 relative bg-black bg-opacity-70 text-base text-white font-light p-4 mb-8 lg:mb-10">
        <AnimateText text="Previous Sponsor" />
        <Sponsors />
      </section>
      <div className="bg-black z-50 bg-opacity-95">
        <Footer />
      </div>
    </div>
  );
}
