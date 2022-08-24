import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
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

const KonvaCanvas = () => {
  // const dragUrl = useRef();
  const stageRef = useRef();
  // this is the state for setting the icon from iconBar.jsx onclick
  const [images, setImages] = useState([]);
  

  const URLImage = ({ image }) => {
    const [img] = useImage(image);
    // console.log(img);
    
    return (
      <Image
        image={img}
        
        draggable="true"
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };
  // console.log(images);
  return (
    <>
      <div className="konvaContainer">
        
        <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
          <Layer >
            {images.map((image) => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
        {/* </div> */}
      </div>
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
                    onClick={() => setImages(current => [...current, getSvgUrl(key)])}
                  />
                );
              })}
            </ScrollContainer>
          );
        })}
      </div>
    </>
  );
};

export default KonvaCanvas;
