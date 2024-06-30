import React, { useRef } from "react";
import { sponsors } from "@/data/sponsors";
import styles from "./styles/Sponsors.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import AnimateText from "@/components/AnimateText";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

function SponsorsG() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".gsapcard:not(:first-child)",
      {
        x: 2000,
        rotate: -90,
      },
      {
        x: 0,
        stagger: 1,
        rotate: 0,
        scrollTrigger: {
          pin: container.current,
          scrub: true,
        },
      }
    );
  });
  return (
    <div
      className="w-full h-screen flex justify-center items-center flex-col"
      ref={container}
    >
      <AnimateText text="Sponsors >>" />
      {sponsors.map((item, i) => {
        return (
          <div
            key={item}
            className="absolute gsapcard drop-shadow-xl w-80 h-96 overflow-hidden rounded-xl bg-[#3d3c3d]"
          >
            <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#fff]">
              <div className={`${styles.cardImage} swipercard`}>
                <img
                  className={styles.cardImageSrc}
                  src={item.logo}
                  alt={item.alt}
                />
              </div>
            </div>
            <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
          </div>
        );
      })}
    </div>
  );
}

export default SponsorsG;
