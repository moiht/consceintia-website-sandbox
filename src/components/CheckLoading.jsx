"use client";

import { useSignIn } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function CheckLoading() {
  const { isLoaded, signIn } = useSignIn();
  if (isLoaded) {
    toast.dismiss();
  }
  return <div></div>;
}
