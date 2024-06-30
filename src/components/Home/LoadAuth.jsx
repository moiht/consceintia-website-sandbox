"use client";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setIsUser } from "@/lib/features/auth/authSlice";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function LoadAuth() {
  const isUser = useSelector((state) => state.auth.isUser);
  const dispatch = useDispatch();
  const getUser = async () => {
    let res = await fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let resjson = await res.json();
    if (res.status == 200) {
      dispatch(setIsUser(true));
      console.log(isUser);
      dispatch(setUser(resjson.user));
    } else {
      dispatch(setIsUser(false));
      // toast.error(resjson.msg);
    }
  };

  const { isSignedIn, user } = useUser();
  if (isSignedIn && !isUser) {
    getUser();
  }

  return <div></div>;
}
