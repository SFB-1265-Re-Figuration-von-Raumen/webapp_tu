import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer, Group, Text } from "react-konva";
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
  name,
  arrayPos,
  deleteMode,
  freeDraw,
  setFreeDraw,
  isEditing,
  setIsEditing,
  connectMode,
  handleDrag,
  handleClickTap,
  fromShapeId,
}) => {
  isSelected ? !freeDraw : null;
  const trRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
console.log(id);

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current] /*  || [textRef.current] */);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const SVG = image;
  const url = "data:image/svg+xml;base64," + window.btoa(SVG);
  const [img] = useImage(url);

  // create a useRef for the Text props
  const textRef = useRef(0);
  const imgRef = useRef(0);
  // console.log(imgRef);
console.log(selectedId);

  return (
    <>
      <Group draggable={freeDraw ? "false" : "true"} visible="true">
        <Text
          ref={textRef}
          {...shapeProps}
          arrayPos={arrayPos}
          isSelected={id === selectedId}
          // onClick={handleClickTap(textAnnotations)}
          // onTap={handleClickTap(textAnnotations)}
          onSelect={() => {
            selectShape(id);
          }}
          fill={
            isEditing && isSelected ? "transparent" : theme.palette.primary.main
          }
          // lineCap={"butt"}
          // lineJoin={"bevel"}
          strokeEnabled={true}
          wrap={"word"}
          // onClick={id ? isSelected = id : isSelected = null}
          
          draggable={freeDraw ? "false" : "true"}
          onDragStart={(e) => {
            handleDrag(e, images, setImages, arrayPos, id);
          }}
          onDragMove={(e) => {
            handleDrag(e, images, setImages, arrayPos);
          }}
          onDragEnd={(e) => {
            handleDrag(e, images, setImages, arrayPos);
          }}
          text={name.split(/(?=[A-Z])/).join(" ")}
          x={x}
          y={y}
          borderStroke={"black"}
          fontSize={20}
          fontFamily={theme.typography.fontFamily}
          // we offset the text on x axis according to the text width
          // offsetY={imgRef.current.attrs.offsetY}
          // next we need to offset the text on y axis according to the image height
          // how do we get the image height since we are using useImage hook?
          offsetX={textRef.current.textWidth / 2 - textRef.current.textWidth}
          offsetY={img ? -img.height : null}
          // this does not work!
          onDblClick={() => {
            setFreeDraw(false);

            setIsEditing(true);
          }}
          onDblTap={() => {
            setFreeDraw(false);

            setIsEditing(true);
          }}
          onTransformEnd={() => {
            setFreeDraw(false);

            //   // transformer is changing scale of the node
            //   // and NOT its width or height
            //   // but in the store we have only width and height
            //   // to match the data better we will reset scale on transform end
            const node = textRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            node.scaleX(1);
            node.scaleY(1);
            // onChange({
            //   ...shapeProps,
            //   x: node.x(),
            //   y: node.y(),
            //   // set minimal value
            //   // width: Math.max(5, node.width() * scaleX),
            //   // height: Math.max(node.height() * scaleY),
            // });
            // //   // we will reset it back
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              fontSize: Math.max(5, node.width() * scaleX),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
        />
        <Image
          ref={imgRef}
          {...shapeProps}
          arrayPos={arrayPos}
          image={img}
          isSelected={id === selectedId}
          onClick={(e) => handleClickTap(e, images, arrayPos, id)}
          onTap={(e) => handleClickTap(e, images, arrayPos, id)}
          x={x}
          y={y}
          shadowBlur={fromShapeId ? 10 : null}
          shadowColor={fromShapeId ? "pink" : null}
          // I will use offset to set origin to the center of the image
          // offsetX={imgRef.current.attrs.offsetX}
          // offsetY={imgRef.current.attrs.offsetY}
          draggable={freeDraw ? "false" : "true"}
          onDragStart={(e) => {
            handleDrag(e, images, setImages, arrayPos);
          }}
          onDragMove={(e) => {
            handleDrag(e, images, setImages, arrayPos);
          }}
          onDragEnd={(e) => {
            handleDrag(e, images, setImages, arrayPos);
          }}
          onTransform={() => {
            setFreeDraw(false);
            const node = textRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
            });

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              fontSize: Math.max(5, node.width() * scaleX),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
          }}
          onTransformEnd={(e) => {
            setFreeDraw(false);

            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = imgRef.current;
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
      </Group>
      {!connectMode && isSelected && (
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
