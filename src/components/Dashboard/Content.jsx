import React from "react";
import ContentTop from "@/components/Dashboard/ContentTop";
import styles from "@/components/styles/SidebarContent.module.css";
import ContentMain from "./ContentMain";

function Content() {
  return (
    <div className={`${styles["dashboard-main-content"]}`}>
      <ContentTop />
      <ContentMain />
    </div>
  );
}

export default Content;
