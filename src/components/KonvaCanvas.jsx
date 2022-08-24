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

/* */
const percentWidth = (window.innerWidth / 100) * 65;
console.log(Math.round(percentWidth));

const svgArray = [aktis, orte, personen, atmos];
function getSvgUrl(name) {
  return new URL(`../svg/${name}`, import.meta.url).href;
}


const KonvaCanvas = () => {
  const stageRef = useRef();
  const [images, setImages] = useState([]);

  let posHist = [
    {
      x: 0,
      y: 0
    },
  ]
  const [pos, setPos] = useState({
    position: posHist[0]
  })

  const URLImage = ({ image }) => {
    const [img] = useImage(image);
    const [canvasPos, setCanvasPos] = useState({ x: percentWidth / 2, y: window.innerHeight / 2 });

    const imgRef = useRef();
    function dragRef() {
      // this.position.x = offsetX
      console.log(imgRef.current)
    }


    return (
      <Image
        ref={imgRef}
        image={img}
        draggable="true"
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        x={canvasPos.x}
        y={canvasPos.y}
        // onDragEnd={(e) => {
        //   // setCanvasPos({ x: e.target.attrs.x, y: e.target.attrs.y });
        //   console.log(e.target.attrs.x);
        //   console.log(e.target.attrs.y);
        // }
        // }
        onDragEnd={dragRef()}
      />
    );
  };

  return (
    <>

      <div className="konvaContainer">
        <Stage width={percentWidth} height={window.innerHeight} ref={stageRef}>
          <Layer >
            {images.map((image) => {
              return <URLImage image={image} key={image.indexOf} />;
            })}
          </Layer>
        </Stage>
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
