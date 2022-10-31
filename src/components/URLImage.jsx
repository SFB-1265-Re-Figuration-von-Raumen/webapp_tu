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
  lines,
  setLines,
  layerRef,
  stageRef,
  index,
  isEditing,
  setIsEditing,
  textAnnotations,
  setTextAnnotations,
  connectMode,
  setConnectMode,
  connectedNodes,
  setConnectedNodes,
}) => {
  isSelected ? !freeDraw : null;
  const trRef = useRef();


  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current] /*  || [textRef.current] */);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  const SVG = image;
  const url = "data:image/svg+xml;base64," + window.btoa(SVG);

  const checkDeletePoint = () => {
    setFreeDraw(false);
  };


  // console.log(nodeUpdater);

  const [img] = useImage(url);

  // console.log(connectedNodes);

  const handleClickTap = (e, array) => {
    setFreeDraw(false);

    if (deleteMode) {
      array.splice(arrayPos, 1);
    } else if (freeDraw) {
      selectShape(null);
    } else if (connectMode) {
      console.log("clicked " + e.target + array);
    } else selectShape(id);
  };

  // create a useRef for the Text props
  const textRef = useRef(0);
  const imgRef = useRef(0);
  // console.log(imgRef);

  return (
    <>
      {/* <Group  visible="true" opacity={1}>
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


          text={name.split(/(?=[A-Z])/).join(" ")}
          x={x}
          y={y}
          borderStroke={"black"}
          fontSize={20}
          fontFamily={theme.typography.fontFamily}
          height={undefined}
          
          // we offset the text on x axis according to the text width
          offsetX={textRef.current.textWidth / 2}
          // offsetY={imgRef.current.attrs.offsetY}
          // next we need to offset the text on y axis according to the image height
          // how do we get the image height since we are using useImage hook?

          // offsetY={img.height / -2}
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
        /> */}
        <Image
          ref={imgRef}
          {...shapeProps}
          arrayPos={arrayPos}
          image={img}
          isSelected={id === selectedId}
          onClick={(e) => handleClickTap(e, images)}
          onTap={(e) => handleClickTap(e, images)}
          x={x}
          y={y}
          onTransform={
            () => {
              if (lines.length >= 0) {
                setLinesBeforeTransform(lines);
              }
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
            }
            // setAttrs({
            //   width: Math.max(this.width() * this.scaleX(), 20),
            //   height: Math.max(this.height() * this.scaleY(), 40),
            //   scaleX: 1,
            //   scaleY: 1,
            // })
          }
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

            // const newLine = lines.slice();
            // const lastLineGone = newLine.splice(1, -1);
            // setLines((before) => [
            //   ...(linesBeforeTransform
            //     ? before === linesBeforeTransform
            //     : before),
            //   lastLineGone,
            // ]);
          }}
        />
      {/* </Group> */}
      {/* {!connectMode && isSelected && (
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
      )} */}
    </>
  );
};

export default URLImage;
