import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Iconbar from "./Iconbar"

/* */
const percentWidth = (window.innerWidth / 100) * 65;
console.log(Math.round(percentWidth));

function getSvgUrl(name) {
  return new URL(`../svg/${name}`, import.meta.url).href;
}

const KonvaCanvas = () => {
  const stageRef = useRef();
  const [images, setImages] = useState([]);

  let posHist = [
    {
      x: 0,
      y: 0,
    },
  ];
  const [pos, setPos] = useState({
    position: posHist[0],
  });

  const URLImage = ({ image }) => {
    const [img] = useImage(image);
    const [canvasPos, setCanvasPos] = useState({
      x: percentWidth / 2,
      y: window.innerHeight / 2,
    });
    console.log(images.indexOf(image));

    return (
      <Image
        // ref={imgRef}
        image={img}
        draggable="true"
        key={images.indexOf(image)}
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        x={canvasPos.x}
        y={canvasPos.y}
        onDragMove={(e) => {
          console.log(e.target.attrs.x);
          console.log(e.target.attrs.y);
        }}
        onDragEnd={(e) => {
          setCanvasPos({ x: e.target.attrs.x, y: e.target.attrs.y });
        }}
        // onDragEnd={dragRef()}
      />
    );
  };

  return (
    <>
      <div className="konvaContainer">
        <Stage width={percentWidth} height={window.innerHeight} ref={stageRef}>
          <Layer>
            {images.map((image) => {
              return <URLImage image={image} key={image.indexOf} />;
            })}
          </Layer>
        </Stage>
      </div>

      <Iconbar images={images} setImages={setImages}/>
    </>
  );
};

export default KonvaCanvas;
