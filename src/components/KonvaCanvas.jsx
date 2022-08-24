import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Iconbar from "./IconBar";

const KonvaCanvas = () => {
  const dragUrl = useRef();
  const stageRef = useRef();
  // this is the state for setting the icon from iconBar.jsx onclick
  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log(images);
  }, []);



  const injectIcon = (icon) => {
    images.push(icon);
  };
  const URLImage = ({ image }) => {
    const [img] = useImage(image);
    return (
      <Image
        image={image}
        x={image.x}
        y={image.y}
        draggable="true"
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };
  return (
    <>
      <div className="konvaContainer">
        <Stage width={65} height={100} ref={stageRef}>
          <Layer>
            {images.map((image) => {
                return <URLImage image={image} />;
              })}
          </Layer>
        </Stage>
        {/* </div> */}
      </div>
      <Iconbar
        injectIcon={injectIcon}
        dragUrl={dragUrl}
        images={images}
        setImages={setImages}
        stageRef={stageRef}
      />
    </>
  );
};

export default KonvaCanvas;
