import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import {
  personen,
  aktis,
  orte,
  atmos,
} from "../assets/svgr_output/ObjectIcons";

// const svgArray = import.meta.glob(
//   "../assets/svg/*.svg"
// ); /* wrong highlighting*/

// console.log(svgArray);

// export default function Images() {
//   const svgGallery = [];
//   for (const path in svgArray) {
//     svgArray[path]().then((mod) => {
//       console.log(path, mod);
//     });
//   }


const objectIconArray = [personen, aktis, orte, atmos];

export default function Iconbar() {
  const svgConvaEvent = (i) => {
    console.log(`hii ${i}`);
  };

  return (
    <div className="iconBarContainer">
      {objectIconArray.map((object, i) => {
        return (
          <ScrollContainer
            key={i}
            className={`scroll-container iconToolbarRow ${object}`}
            id="xDragToolbar"
          >
            {Object.keys(object).map(function (key, j) {
              return (
                <div onClick={() => svgConvaEvent(key)} key={key}>
                  {React.createElement(object[key], { key: j }, key)}
                </div>
              );
            })}
          </ScrollContainer>
        );
      })}
    </div>
  );
}

