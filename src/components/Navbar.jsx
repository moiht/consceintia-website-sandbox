import React from "react";
import Link from "next/link";
import styles from "./styles/NavbarButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setHamburger } from "../lib/features/navbar/navbarSlice";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Footer() {
  const hamburgerOpen = useSelector((state) => state.navbar.hamburgerOpen);
  const dispatch = useDispatch();

  const btnClick = () => {
    dispatch(setHamburger());
  };

  const router = useRouter();

  const login = () => {
    toast.loading("Loading");
    router.push("/sign-in");
  };

  const dboard = () => {
    toast.loading("Loading");
    router.push("/dashboard");
  };

  return (
    <div>
      <header className="fixed bg-transparent backdrop-blur-xl shadow-lg w-screen grid-cols-3 lg:grid-cols-3 text-[14px] font-[400] top-0 h-24 z-50 flex justify-between items-center text-white p-4">
        <div className="hidden lg:inline-flex justify-start w-full lg:ml-16 xl:ml-24 items-center">
          <Link href={"localhost:3000"}>
            <img src="/images/logo.png" alt="Website Logo" className="h-8" />
          </Link>
        </div>
        <div className="hidden lg:inline-flex text-[14px] font-[500] justify-center gap-8 w-full items-center">
          <Link
            href={"/home"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            HOME
          </Link>
          <Link
            href={"/events"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            EVENTS
          </Link>
          <Link
            href={"/workshops"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            WORKSHOPS
          </Link>
          <Link
            href={"/merchandise"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            MERCHANDISE
          </Link>
          <Link
            href={"/accommodation"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            ACCOMMODATION
          </Link>
        </div>
        <div className="hidden lg:inline-flex w-full justify-end lg:mr-16 xl:mr-24 items-center">
          <SignedIn>
            <button type="button" className={styles.btn} onClick={dboard}>
              <strong className={styles.strong}>DASHBOARD</strong>
              <div className={styles["container-stars"]}>
                <div className={styles.stars}></div>
              </div>

              <div className={styles.glow}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
              </div>
            </button>
          </SignedIn>
          <SignedOut>
            <button type="button" className={styles.btn} onClick={login}>
              <strong className={styles.strong}>SIGN IN</strong>
              <div className={styles["container-stars"]}>
                <div className={styles.stars}></div>
              </div>

              <div className={styles.glow}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
              </div>
            </button>
          </SignedOut>
        </div>

        {/* Hamburger Menu */}
        <div className="inline-flex w-full h-full lg:hidden"></div>
        <div className="inline-flex lg:hidden justify-center w-full h-full lg:ml-16 xl:ml-24 items-center">
          <Link href={"localhost:3000"}>
            <img src="/images/logo.png" alt="Logo" className="h-8" />
          </Link>
        </div>

        <div className="inline-flex justify-end w-full mr-2 sm:mr-6 md:mr-10 lg:hidden z-50">
          <div className={styles.hamburger}>
            <button
              className="flex justify-center items-center"
              data-collapse-toggle="navbar-hamburger"
              type="button"
              aria-controls="navbar-hamburger"
              aria-expanded="false"
              onClick={btnClick}
            >
              <input className={styles.checkbox} type="checkbox" />
              <svg fill="none" viewBox="0 0 50 50" height="50" width="50">
                <path
                  className={`${styles.lineTop} ${styles.line}`}
                  stroke-linecap="round"
                  stroke-width="4"
                  stroke="black"
                  d="M6 11L44 11"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-width="4"
                  stroke="black"
                  d="M6 24H43"
                  className={`${styles.lineMid} ${styles.line}`}
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-width="4"
                  stroke="black"
                  d="M6 37H43"
                  className={`${styles.lineBottom} ${styles.line}`}
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        id="navbar-hamburger"
        className={`${
          hamburgerOpen ? "block" : "hidden"
        } fixed w-full top-20 pt-12 pb-12 z-[1000] lg:hidden bg-transparent backdrop-blur-xl shadow-lg`}
      >
        <div className="grid justify-center gap-10">
          <Link
            href={"/home"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            HOME
          </Link>
          <Link
            href={"/events"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            EVENTS
          </Link>
          <Link
            href={"/workshops"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            WORKSHOPS
          </Link>
          <Link
            href={"/merchandise"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            MERCHANDISE
          </Link>
          <Link
            href={"/accommodation"}
            className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
          >
            ACCOMMODATION
          </Link>
          <SignedIn>
            <Link
              href={"/dashboard"}
              onClick={dboard}
              className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
            >
              DASHBOARD
            </Link>
          </SignedIn>
          <SignedOut>
            <Link
              href={"/sign-in"}
              onClick={login}
              className={`${styles["menu__link"]} ${styles["glow"]} ${styles.a}`}
            >
              SIGN IN
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
