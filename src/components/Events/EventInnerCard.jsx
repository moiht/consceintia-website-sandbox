import React from "react";
import styles from "./styles/EventInnerCard.module.css";

export default function EventInnerCard() {
  return (
    <div className={styles.cardm}>
      <div className={styles.card}>
        <div className={styles.main}>23 °C</div>
        <div className={styles["mainsub"]}>Dunmore, Ireland</div>
      </div>

      <div className={styles["card2"]}>
        <div className={styles["upper"]}>
          <div className={styles["humidity"]}>
            <div className={styles["humiditytext"]}>
              Humidity
              <br />
              30%
            </div>
          </div>

          <div className={styles["air"]}>
            <div className={styles["airtext"]}>
              Wind
              <br />8 Km/h
            </div>
          </div>
        </div>

        <div className={styles["lower"]}>
          <div className={styles["aqi"]}>
            <div className={styles["aqitext"]}>
              AQI
              <br />
              30
            </div>
          </div>

          <div className={styles["realfeel"]}>
            <div className={styles["realfeeltext"]}>
              Real Feel
              <br />
              21 °C
            </div>
          </div>

          <div className={styles["pressure"]}>
            <div className={styles["pressuretext"]}>
              Pressure
              <br />
              1012 mbar
            </div>
          </div>
          <div className={styles["card3"]}>Healthy</div>
        </div>
      </div>
    </div>
  );
}
