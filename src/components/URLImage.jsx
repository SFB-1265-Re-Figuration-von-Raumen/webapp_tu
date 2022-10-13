import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

const URLImage = ({
  theme,
  selectShape,
  selectedId,
  shapeProps,
  isSelected,
  onChange,
  images,
  setImages,
  image,
  id,
  x,
  y,
  arrayPos,
  deleteMode,
  freeDraw,
  setFreeDraw,
  lines,
  layerRef,
  stageRef,
  index,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const SVG = image;
  const url = "data:image/svg+xml;base64," + window.btoa(SVG);

  const checkDeletePoint = () => {
    if (freeDraw === true) {
      console.log(lines);
      lines.splice(lines.length - 1, 1);
      console.log(lines);
    }
    setFreeDraw(false);
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    if (freeDraw) {
      return;
    }
    checkDeletePoint();
    isSelected || isDragging
      ? null
      : e.target.setAttrs({
          scaleX: 1.1,
          scaleY: 1.1,
        });

  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    isSelected || isDragging
      ? null
      : e.target.to({
          duration: 0.2,
          easing: Konva.Easings.EaseInOut,
          scaleX: 1,
          scaleY: 1,
        });
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });

    // here we need to update the images state
    // with the new x and y values
    // for the current image
    // respective to the index "arrayPos"
    const idx = images.find((obj) => obj.id == id);
    console.log(idx);
    const arrCopy = images.slice();
    arrCopy.splice(images.indexOf(idx), 1);
    idx.x = e.target.attrs.x;
    idx.y = e.target.attrs.y;
    arrCopy.push(idx);
    setImages(arrCopy);
    // savePosition(id, e.target.attrs.x, e.target.attrs.y);
  };

  const [img] = useImage(url);

  const handleClickTap = () => {
    if (deleteMode) {
      images.splice(arrayPos, 1);
    } else if (freeDraw) {
      selectShape(null);
    }
    selectShape(id);
  };

  return (
    <>
      <Image
        ref={shapeRef}
        {...shapeProps}
        arrayPos={arrayPos}
        image={img}
        isSelected={id === selectedId}
        onClick={handleClickTap}
        onTap={handleClickTap}
        // onClick={id ? isSelected = id : isSelected = null}
        x={x}
        y={y}
        // I will use offset to set origin to the center of the image
        // offsetX={img ? img.width / 2 : 0}
        // offsetY={img ? img.height / 2 : 0}
        shadowBlur={3}
        // we need to find a way to set freeDraw to false when drag starts
        draggable={freeDraw ? "false" : "true"}
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
          onChange({
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
          anchorCornerRadius={50}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          borderStroke={theme.palette.primary.main}
          anchorStroke={theme.palette.primary.main}
          anchorSize={15}
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
