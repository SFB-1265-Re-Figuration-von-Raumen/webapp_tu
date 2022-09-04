import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

const URLImage = ({ handleDragStart, handleDragEnd, imgPos, image, id, x, y }) => {

    const [img] = useImage(image);

    return (
      <Image
        imagePos={imgPos}
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

  export default URLImage