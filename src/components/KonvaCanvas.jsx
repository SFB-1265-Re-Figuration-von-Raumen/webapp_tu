import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import URLImage from "./URLImage";
import Iconbar from "./Iconbar";

//  at the moment we need to find a way to position the image
//  id in state when added. when we move an image, we want
//  to update its x and y in images state.

const KonvaCanvas = () => {
  const stageRef = useRef();
  const percentWidth = (window.innerWidth / 100) * 65;
  const [images, setImages] = useState([{ id: 0, icon: "", x: 300, y: 300 }]);
  const [lastDist, setLastDist] = useState(0);
  const [lastCenter, setLastCenter] = useState(null);

  const addImages = (obj) => {
    setImages((current) => [...current, obj]);
  };
  const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const getCenter = (p1, p2) => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  };

  return (
    <>
      <div className="konvaContainer">
        <Stage
          width={percentWidth}
          height={window.innerHeight}
          ref={stageRef}
          onTouchMove={(e) => {
            e.evt.preventDefault();
            var touch1 = e.evt.touches[0];
            var touch2 = e.evt.touches[1];

            if (touch1 && touch2) {
              // if the stage was under Konva's drag&drop
              // we need to stop it, and implement our own pan logic with two pointers
              if (isDragging()) {
                stopDrag();
              }

              var p1 = {
                x: touch1.clientX,
                y: touch1.clientY,
              };
              var p2 = {
                x: touch2.clientX,
                y: touch2.clientY,
              };

              if (!lastCenter) {
                setLastCenter(getCenter(p1, p2));
                return;
              }
              const newCenter = getCenter(p1, p2);

              const dist = getDistance(p1, p2);

              if (!lastDist) {
                setLastDist(dist);
              }

              // local coordinates of center point
              var pointTo = {
                x: (newCenter.x - x()) / scaleX(),
                y: (newCenter.y - y()) / scaleX(),
              };

              var scale = scaleX() * (dist / lastDist);

              scaleX(scale);
              scaleY(scale);

              // calculate new position of the stage
              var dx = newCenter.x - lastCenter.x;
              var dy = newCenter.y - lastCenter.y;

              var newPos = {
                x: newCenter.x - pointTo.x * scale + dx,
                y: newCenter.y - pointTo.y * scale + dy,
              };

              position(newPos);

              setLastDist(dist);
              setLastCenter(newCenter);
            }
          }}
          onTouchEnd={() => {
            setLastDist();
            setLastCenter(null);
          }}
        >
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
