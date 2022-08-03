import React from "react";
import { Stage, Layer } from "react-konva";
import { createRoot } from 'react-dom/client';
import useImage from 'use-image';

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const KonvaCanvas = () => {
  return (
    <div className="konvaContainer">
      {/* 
        Stage - is a div wrapper 
        Layer - is an actual 2d canvas element, so you can have several layers inside the stage
        Rect and Circle are not DOM elements. They are 2d shapes on canvas 
        */}
      <Stage width={65} height={100}>
        <Layer>
        
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaCanvas;
