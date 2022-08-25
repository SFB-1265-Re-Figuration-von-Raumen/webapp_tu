import React, { useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

const aktis = import.meta.glob("../assets/svg/categories/aktis/*.svg", {
  as: "raw",
});
const atmos = import.meta.glob("../assets/svg/categories/atmos/*.svg", {
  as: "raw",
});
const orte = import.meta.glob("../assets/svg/categories/orte/*.svg", {
  as: "raw",
});
const personen = import.meta.glob("../assets/svg/categories/personen/*.svg", {
  as: "raw",
});
const svgArray = [aktis, orte, personen, atmos];

function getSvgUrl(name) {
  return new URL(`../svg/${name}`, import.meta.url).href;
}

const Iconbar = ({ images, addImages, percentWidth}) => {
  return (
    <div className="iconBarContainer">
      {svgArray.map((index, key) => {
        return (
          <ScrollContainer
            className={`scroll-container iconToolbarRow ${index}`}
            id="xDragToolbar"
            key={key}
          >
            {Object.keys(index).map((key, i) => {
              return (
                <img
                  key={i}
                  src={getSvgUrl(key)}
                  alt={key}
                  className="icon"
                  onClick={() => {
                    addImages({
                      id: images.at(-1).id + 1,
                      icon: getSvgUrl(key),
                      x: percentWidth / 2,
                      y: window.innerHeight / 2,
                    });
                  }}
                />
              );
            })}
          </ScrollContainer>
        );
      })}
    </div>
  );
};

export default Iconbar;
