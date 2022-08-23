import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";

// import {
//   personen,
//   aktis,
//   orte,
//   atmos,
// } from "../assets/svgr_output/ObjectIcons";

// console.log(svgArray);

// const objectIconArray = [personen, aktis, orte, atmos];

const svgArray = import.meta.glob("../assets/svg/*.svg", {
  as: "raw",
}); /* wrong highlighting*/

function getSvgUrl(name) {
  return new URL(`../svg/${name}`, import.meta.url).href;
}

export default function Iconbar() {
  const svgConvaEvent = (i) => {
    // console.log(`hii ${i}`);
  };

  return (
    <div className="iconBarContainer">
      {Object.keys(svgArray).map((key, i) => {
        return (
          <img
            key={i}
            src={getSvgUrl(key)}
            alt={key}
            className="icon"
            onClick={() => svgConvaEvent(i)}
          />
        );
      })}
    </div>
  );
}
