import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Iconbar from "./Iconbar";

const KonvaCanvas = () => {
  const stageRef = useRef();
  const percentWidth = (window.innerWidth / 100) * 65;
  const [images, setImages] = useState([
    { id: 0, icon: "", x: percentWidth / 2, y: window.innerHeight / 2 },
  ]);
  console.log(images);

  const addImages = (obj) => {
    setImages((current) => [...current, obj]);
  };

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


    return (
      <Image
        // ref={imgRef}
        image={img}
        draggable="true"
        
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        // onDragMove={(e) => console.log(e.target.attrs.x)}
        onDragStart={(e) => {
          // setImages(
          //   (img.x = e.target.attrs.x),
          //   (img.y = e.target.attrs.y)
          // );
        }}
        onDragEnd={(e) => {
          console.log(img);
          // setImages(
          //   (img.x = e.target.attrs.x),
          //   (img.y = e.target.attrs.y)
          // );
        }}
      />
    );
  };

  return (
    <>
      <div className="konvaContainer">
        <Stage width={percentWidth} height={window.innerHeight} ref={stageRef}>
          <Layer>
            {images.map((img) => {
              return (
                <URLImage
                  image={img.icon}
                  key={img.id}
                  x={img.x}
                  y={img.y}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>

      <Iconbar
        images={images}
        setImages={setImages}
        addImages={addImages}
        percentWidth={percentWidth}
      />
    </>
  );
};

export default KonvaCanvas;
