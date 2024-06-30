"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense, useEffect, useRef, useState } from "react";
import { makeStore } from "@/lib/store";
import { Provider } from "react-redux";
import SplashScreen from "@/components/SplashScreen";
import { useCallback } from "react";
import Particles from "react-particles";
import { particleOptions } from "@/data/particlesOptions";
import { loadSlim } from "tsparticles-slim";
import { ClerkProvider } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import LoadAuth from "@/components/Home/LoadAuth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const storeRef = useRef();
  const [isloading, setloading] = useState(true);
  setTimeout(() => {
    setloading(false);
  }, 2500);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  console.log("Layout Called");

  return (
    <Provider store={storeRef.current}>
      <ClerkProvider>
        <html lang="en">
          <body>
            <Toaster />
            <LoadAuth />
            {isloading ? (
              <SplashScreen />
            ) : (
              <div className={inter.className}>{children}</div>
            )}
            <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={particleOptions}
            />
          </body>
        </html>
      </ClerkProvider>
    </Provider>
  );
}
