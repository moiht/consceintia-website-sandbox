import React from "react";
import styles from "./styles/AnimateText.module.css";

export default function AnimateText({ text }) {
  return (
    <div className={styles.mybody}>
      <h1 className={styles.myh1}>{text}</h1>
    </div>
  );
}
