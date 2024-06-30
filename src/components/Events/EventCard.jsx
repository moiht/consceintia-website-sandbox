import React from "react";
import styles from "./styles/EventCard.module.css";
import EventInnerCard from "./EventInnerCard";

export default function EventCard() {
  return (
    <div className={`p-5`}>
      <EventInnerCard />
    </div>
  );
}
