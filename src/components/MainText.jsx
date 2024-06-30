import React from "react";
import styles from "./styles/MainText.module.css";

export default function MainText() {
  return (
    <div className={styles.mainBody}>
      <video className={styles.mainVideo} autoPlay muted loop>
        <source src="/images/newtextbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h2 className={`${styles.mainH2} text-[24vw] md:text-[18vw]`}>
        COMING SOON
      </h2>
    </div>
  );
}
