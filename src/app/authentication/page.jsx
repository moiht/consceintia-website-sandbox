"use client";
import { increment } from "@/lib/features/counter/counterSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { sendSignup } from "@/lib/features/auth/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Authentication() {
  const router = useRouter();
  // const [user, setuser] = useState(0);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let sendData = async () => {
    let res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let resjson = await res.json();
    if (res.status == 200) {
      toast.success(resjson.msg);
      router.push("/home");
    }
  };

  if (!auth.signupdone) {
    sendData();
    dispatch(sendSignup(true));
  } else {
  }

  return (
    <div className="flex align-center justify-center">
      <ReactLoading type={"bubbles"} color={"#fff"} height={40} width={200} />
    </div>
  );
}
