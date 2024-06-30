import React from "react";
import Image from "next/image";
import img from "../../public/images/webintrogif.gif";
import styles from "./styles/splashscreen.module.css";

export default function SplashScreen() {
  return (
    <div className={styles.body}>
      <div className={styles.center}>
        <div className={styles.ring}></div>
        <Image className={styles.img} src={img} alt="" unoptimized={true} />
        {/* <span>loading...</span> */}
      </div>
    </div>
  );
}
