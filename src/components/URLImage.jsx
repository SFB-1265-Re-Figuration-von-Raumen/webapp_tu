import React, { useRef, useEffect } from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

const URLImage = ({
  theme,
  selectShape,
  selectedId,
  shapeProps,
  onSelect,
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
  setFreeDraw
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function savePosition(pos, x, y) {
    // console.log(`arrayPos is ${pos}, x is ${x}, y is ${y}`);

    const newImage = images[pos];
    // console.log(newImage);
    newImage.x = x;
    newImage.y = y;
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
    isSelected
      ? null
      : e.target.setAttrs({
        scaleX: 1.1,
        scaleY: 1.1,
      });
  };

  const handleDragEnd = (e) => {
    isSelected
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

    savePosition(e.target.attrs.arrayPos, e.target.attrs.x, e.target.attrs.y);
  };


  const [img] = useImage(image);
  return (
    <>
      <Image
        ref={shapeRef}
        {...shapeProps}
        arrayPos={arrayPos}
        image={img}
        draggable="true"
        isSelected={id === selectedId}

        // onDragStart={() => setFreeDraw(false)}
        // we need to find a way to set freeDraw to false when drag starts

        onClick={() => {
          // we switch off free draw mode when we click on an image
          setFreeDraw(false);
          console.log("clicked");
          if (deleteMode) {
            images.splice(arrayPos, 1);
          }
          selectShape(id);
        }}
        onSelect={() => {
          selectShape(id);
        }}
        // onClick={id ? isSelected = id : isSelected = null}
        onTap={onSelect}
        x={x}
        y={y}
        // I will use offset to set origin to the center of the image
        // offsetX={img ? img.width / 2 : 0}
        // offsetY={img ? img.height / 2 : 0}
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
