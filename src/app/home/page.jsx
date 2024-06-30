"use client";
import {
  SignedOut,
  SignInButton,
  SignedIn,
  SignOutButton,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AnimateText from "@/components/AnimateText";
import Sponsors from "@/components/Sponsors";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SponsorsG from "@/components/SponsorsG";

export default function Home() {
  const router = useRouter();
  toast.dismiss();
  return (
    <div className="overflow-x-hidden pt-24">
      <Navbar />
      <section className="z-40 relative bg-black bg-opacity-70 text-base text-white font-light p-4 mb-8 lg:mb-10">
        {/* <AnimateText text="Previous Sponsor" /> */}
        <SponsorsG />
        {/* <Sponsors /> */}
      </section>
      <div className="bg-black z-50 bg-opacity-95">
        <Footer />
      </div>
    </div>
  );
}
