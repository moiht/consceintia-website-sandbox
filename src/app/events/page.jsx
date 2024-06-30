'use client'
import React from 'react';

import Navbar from "@/components/Navbar";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';




import { Banner } from "./components/Banner";

import { Projects } from "./components/Projects";


function App() {
  return (
    <><Navbar /><div className="App">

      <Banner />

      <Projects />
    </div></>
  );
}

export default App;
