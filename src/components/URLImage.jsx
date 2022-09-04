import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";


const URLImage = ({ images, setImages, image, id, x, y }) => {
  function savePosition(pos, x, y) {

    console.log(`arrayPos is ${pos}, x is ${x}, y is ${y}`);

    const newImage = images[pos];
    newImage.x = x;
    newImage.y = y;
    console.log(newImage);
    const updatedImages = Object.keys(images).map((key, i) => {
      if (key === pos) {
        return newImage;
      }
      return images[key];
    });
    console.log(updatedImages);
    setImages(updatedImages);
    console.log(images);
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

    // here we need to update the images state
    // with the new x and y values
    // for the current image
    // respective to the index "arrayPos"

    savePosition(e.target.attrs.arrayPos, e.target.attrs.x, e.target.attrs.y);
  };

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
    />
  );
};

export default URLImage