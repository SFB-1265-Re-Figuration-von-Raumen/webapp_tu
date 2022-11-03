import React, { useRef, useEffect, useState } from "react";
import { Image, Transformer, Group, Text } from "react-konva";
import useImage from "use-image";
import TextInputIcon from "./TextInputIcon";

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
  setConnectMode,
  handleDrag,
  handleClickTap,
  fromShapeId,
}) => {
  isSelected ? !freeDraw : null;
  const trRef = useRef();
  const [nodeScale, setNodeScale] = useState(null);
  console.log(nodeScale);

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
  // console.log(img.naturalWidth);

  const handleTransform = (ref) => {
    setFreeDraw(false);
    const node = ref.current;
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
    img.width = node.width();
    img.height = node.height();
  }


  return (
    <>
      <Group draggable={freeDraw ? "false" : "true"} visible="true">
        <Image
          ref={imgRef}
          {...shapeProps}
          arrayPos={arrayPos}
          image={img}
          isSelected={id === selectedId}
          onClick={(e) => handleClickTap(e, images, arrayPos, id)}
          onTap={(e) => handleClickTap(e, images, arrayPos, id)}
          shadowBlur={fromShapeId ? 60 : null}
          shadowColor={fromShapeId ? theme.palette.primary.main : null}
          draggable={freeDraw ? "false" : "true"}
          onDragStart={(e) => {
            handleDrag(e, images, setImages, arrayPos, id);
          }}
          onDragMove={(e) => {
            handleDrag(e, images, setImages, arrayPos, id);
          }}
          onDragEnd={(e) => {
            handleDrag(e, images, setImages, arrayPos, id);
          }}

          onTransformStart={() => handleTransform(imgRef)}
          onTransform={() => handleTransform(imgRef)}
          onTransformEnd={() => handleTransform(imgRef)}
          offsetX={img ? img.width / 2 : null}
          offsetY={img ? img.height / 2 : null}
          x={x}
          y={y}
        />
        {isEditing && isSelected && (
          <TextInputIcon
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            id={id}
            arrayPos={arrayPos}
            width={shapeProps.scaleX}
            height={shapeProps.scaleY}
            name={name}
            theme={theme}
            images={images}
            setImages={setImages}
            x={img ? x + img.width * -0.3 : x}
            y={img ? y + img.height / 3 : y}
            offsetX={img ? img.width * -0.005 : null}
            offsetY={img ? img.height * -0.001 : null}
          />
        )}
        <Text
          ref={textRef}
          {...shapeProps}
          arrayPos={arrayPos}
          onSelect={() => {
            selectShape(id);
          }}
          onClick={() => {
            setIsEditing(true)
            selectShape(id)
            setConnectMode(false)
          }}
          isSelected={id === selectedId}
          fill={isEditing && isSelected ? "transparent" : theme.palette.primary.main}
          strokeEnabled={true}
          wrap={"word"}
          draggable={freeDraw ? "false" : "true"}
          onDragStart={(e) => {
            handleDrag(e, images, setImages, arrayPos, id);
          }}
          onDragMove={(e) => {
            handleDrag(e, images, setImages, arrayPos, id);
          }}
          onDragEnd={(e) => {
            handleDrag(e, images, setImages, arrayPos, id);
          }}
          text={name}
          borderStroke={"black"}
          fontSize={20}
          fontFamily={theme.typography.fontFamily}
          onDblClick={() => {
            setFreeDraw(false);

            setIsEditing(true);
          }}
          onDblTap={() => {
            setFreeDraw(false);

            setIsEditing(true);
          }}
          x={img ? x + img.width * -0.3 : x}
          y={img ? y + img.height / 3 : y}
          offsetX={img ? img.width * -0.005 : null}
          offsetY={img ? img.height * -0.001 : null}
        />

      </Group>
      {!connectMode && isSelected && (
        <Transformer
          ref={trRef}
          anchorCornerRadius={50}
          borderDash={[20, 10]}
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
