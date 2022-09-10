import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

const URLImage = ({
  selectShape,
  selectedId,
  shapeProps,
  onSelect,
  isSelected,
  images,
  setImages,
  image,
  id,
  x,
  y,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    if (isSelected) {
      console.log("isSelected");

      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function savePosition(pos, x, y) {
    // console.log(`arrayPos is ${pos}, x is ${x}, y is ${y}`);

    const newImage = images[pos];
    newImage.x = x;
    newImage.y = y;
    // console.log(newImage);
    const updatedImages = Object.keys(images).map((key, i) => {
      if (key === pos) {
        return newImage;
      }
      return images[key];
    });
    // console.log(updatedImages);
    setImages(updatedImages);
    // console.log(images);
  }

  const handleDragStart = (e) => {
    e.target.setAttrs({
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };

  const handleDragEnd = (e) => {
    e.target.to({
      duration: 0.2,
      easing: Konva.Easings.EaseInOut,
      scaleX: 1,
      scaleY: 1,
    });
    // onChange({
    //   ...shapeProps,
    //   x: e.target.x(),
    //   y: e.target.y(),
    // });

    // here we need to update the images state
    // with the new x and y values
    // for the current image
    // respective to the index "arrayPos"

    savePosition(e.target.attrs.arrayPos, e.target.attrs.x, e.target.attrs.y);
  };

  const [img] = useImage(image);
  // console.log(isSelected);
  return (
    <>
      <Image
        ref={shapeRef}
        {...shapeProps}
        arrayPos={id}
        image={img}
        draggable="true"
        isSelected={id === selectedId}
        onClick={() => {
          selectShape(id);
        }}
        onSelect={() => {
          selectShape(id);
        }}
        // onClick={id ? isSelected = id : isSelected = null}
        onTap={onSelect}
        onChange={(newAttrs) => {
          const imgs = images.slice();
          imgs[i] = newAttrs;
          setImages(imgs);
        }}
        x={x}
        y={y}
        // I will use offset to set origin to the center of the image
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        shadowBlur={3}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          Image.onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default URLImage;
