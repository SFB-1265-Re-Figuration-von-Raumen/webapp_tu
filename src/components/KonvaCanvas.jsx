import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Iconbar from "./Iconbar";

//  at the moment we need to find a way to position the image
//  id in state when added. when we move an image, we want
//  to update its x and y in images state.

const KonvaCanvas = () => {

  const stageRef = useRef();
  const percentWidth = (window.innerWidth / 100) * 65;
  const [images, setImages] = useState([
    { id: 0, icon: "", x: 0, y: 0 },
  ]);

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

    // here we need to update the images state 
    // with the new x and y values
    // for the current image
    // respective to the index "arrayPos"
    
    savePosition(e.target.attrs.arrayPos, e.target.attrs.x, e.target.attrs.y)
  }

  function savePosition(pos, x, y) {
    console.log(`arrayPos is ${pos}, x is ${x}, y is ${y}`)

    const newImage = images[pos]
    newImage.x = x
    newImage.y = y
    console.log(newImage);
    const updatedImages = Object.keys(images).map((key, i) => {
      if (key === pos) {
        return newImage
      }
      return images[key]
    })
    setImages(updatedImages)
  }


  const addImages = (obj) => {
    setImages((current) => [...current, obj]);
  };

  const URLImage = ({ image, id, x, y }) => {

    const [img] = useImage(image);

    return (
      <Image
        arrayPos={id}
        image={img}
        draggable="true"
        x={x}
        y={y}
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        shadowBlur={3}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
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
                  id={img.id}
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
