import React, { useState, useRef } from "react";

import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Iconbar from "./IconBar";

const KonvaCanvas = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [image, setImage] = useState("");
  const injectImage = (img) => {
    URLImage(img);
  };
  const URLImage = ({ image }) => {
    const [img] = useImage(image.src);
    return (
      <Image
        image={image}
        x={image.x}
        y={image.y}
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
      />
    );
  };
  return (
    <>
      <div className="konvaContainer">
        {/* <div
          onDrop={(e) => {
            e.preventDefault();
            // register event position
            stageRef.current.setPointersPositions(e);
            // add image
            setImages(
              images.concat([
                {
                  ...stageRef.current.getPointerPosition(),
                  src: dragUrl.current,
                  id: images.toString(),
                },
              ])
            );
          }}
          onDragOver={(e) => e.preventDefault()}
        > */}
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
        injectImage={(img) => setImage(img)}
        dragUrl={dragUrl}
        images={images}
        setImages={setImages}
        stageRef={stageRef}
      />
    </>
  );
};

export default KonvaCanvas;
