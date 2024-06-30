"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import { Projects } from "../events/components/Projects";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Workshop1 from "./workshop1";
export default function Workshops() {

  return (
    <div>
      <Navbar />
  
      <div className="App">
      
     
      <Projects />
      
   
      </div>
      
    </div>
  );
}

