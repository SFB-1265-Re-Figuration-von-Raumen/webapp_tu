import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import URLImage from "./URLImage"
import Iconbar from "./Iconbar";


//  at the moment we need to find a way to position the image
//  id in state when added. when we move an image, we want
//  to update its x and y in images state.

const KonvaCanvas = () => {
  const stageRef = useRef();
  const percentWidth = (window.innerWidth / 100) * 65;
  const [images, setImages] = useState([{ id: 0, icon: "", x: 300, y: 300 }]);

  

  const addImages = (obj) => {
    setImages((current) => [...current, obj]);
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
                  id={img.id}
                  x={img.x}
                  y={img.y}
                  images={images}
                  setImages={setImages}
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
