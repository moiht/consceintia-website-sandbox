"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import Sidebar from "@/components/Dashboard/Sidebar";
import Content from "@/components/Dashboard/Content";
import "./styles.css";

export default function Dashboard() {
  toast.dismiss();
  const cUser = useSelector((state) => state.auth.currUser);
  const dispatch = useDispatch();
  console.log(cUser);

  return (
    <div className="dashboardmain">
      <Sidebar />
      <Content />
    </div>
  );
}
