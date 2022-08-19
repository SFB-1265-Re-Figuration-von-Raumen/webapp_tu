import React from "react";

import { Stage, Layer } from "react-konva"; import useImage from "use-image";

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
      <Stage width={65} height={100}>
        <Layer></Layer>
      </Stage>
      </div>
  );
};

export default KonvaCanvas;
