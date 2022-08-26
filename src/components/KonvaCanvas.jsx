import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Iconbar from "./Iconbar";

const KonvaCanvas = () => {
  const stageRef = useRef();
  const percentWidth = (window.innerWidth / 100) * 65;
  const [images, setImages] = useState([
    { id: 0, icon: "" },
  ]);

  const imgPos = {
    x: 300,
    y: 300,
  }

  const handleDragStart = (e) => {
    e.target.setAttrs({
      scaleX: 1.1,
      scaleY: 1.1,
    });
  }

  const handleDragEnd = (e) => {
    e.target.to({
      duration: 0.2,
      easing: Konva.Easings.EaseInOut,
      scaleX: 1,
      scaleY: 1,
    });
    console.log(e.target.attrs)
    // setImages((current) => [...current, { id: current.length, icon: e.target.attrs.image.src }]);
  }

  console.log(`Logging images var: ${images}`);


  const [] = useState([])
  const addImages = (obj) => {
    setImages((current) => [...current, obj]);
    // setImages((current) => [...current, {
    //   x: e.target.x(),
    //   y: e.target.y(),
    // }
    // ]);
    let stage = stageRef.current;
  };

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
        x={imgPos.x}
        y={imgPos.y}
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        // onDragMove={(e) => console.log(e.target.attrs.x)}
        // draggable
        shadowBlur={5}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // onDragEnd={
        //   (e) => {
        //     setImages((current) => [...current, {


        //       // x: e.target.x(),
        //       // y: e.target.y(),
        //     }
        //     ]);
        //   }}
        // console.log(e.target.attrs.x);
        // console.log(e.target.attrs.y);
        scaleX={Image.isDragging ? 1.5 : 1}
      />
    );
  };

  return (
    <>
      <div className="konvaContainer"
      >
        <Stage width={percentWidth} height={window.innerHeight} ref={stageRef}>
          <Layer>
            {images.map((img) => {
              return (
                <URLImage
                  image={img.icon}
                  key={img.id}
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
