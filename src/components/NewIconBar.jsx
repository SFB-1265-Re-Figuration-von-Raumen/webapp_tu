import * as React from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import { personen, aktis, orte, atmos } from "../assets/svgr_output/ArrayIcons";

const arrayIconArray = [personen, aktis, orte, atmos];

const svgConvaEvent = (i) => {
  console.log(`hii ${i}`);
};

export default function NewIconBar() {
  return (
    <div className="iconBarContainer">
      {arrayIconArray.map((index, i) => {
        <ScrollContainer key={i}
          className={`scroll-container iconToolbarRow`}
          id="xDragToolbar"
        >
          {/* {index.map(({ name, icon }) => {
            return React.cloneElement(icon, {
              key: `icon-${name}`,
              onClick: () => {
                svgConvaEvent(name);
              },
            });
          })} */}
        </ScrollContainer>;
      })}
    </div>
  );
}
