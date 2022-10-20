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
}) => {
  isSelected ? !freeDraw : null;
  const trRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [linesBeforeTransform, setLinesBeforeTransform] = useState([]);
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

  const handleDragStart = (e) => {
    setFreeDraw(false);
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
    setFreeDraw(false);
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

  const handleClickTap = (array) => {
    setFreeDraw(false);

    if (deleteMode) {
      array.splice(arrayPos, 1);
    } else if (freeDraw) {
      selectShape(null);
    }
    selectShape(id);
  };

  // create a useRef for the Text props
  const textRef = useRef(0);
  const imgRef = useRef(0);
  console.log(imgRef);

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
          text="llargest bapperlargest bapperlargest bapperlargest bapperargest bapper"
          x={x}
          y={y}
          borderStroke={"black"}
          fontSize={20}
          fontFamily={theme.typography.fontFamily}
          height={undefined}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
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
        />
        <Image
          ref={imgRef}
          {...shapeProps}
          arrayPos={arrayPos}
          image={img}
          isSelected={id === selectedId}
          onClick={handleClickTap}
          onTap={handleClickTap}
          x={x}
          y={y}
          // I will use offset to set origin to the center of the image
          // offsetX={imgRef.current.attrs.offsetX}
          // offsetY={imgRef.current.attrs.offsetY}
          shadowBlur={3}
          draggable={freeDraw ? "false" : "true"}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
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

            const newLine = lines.slice();
            const lastLineGone = newLine.splice(1, -1);
            return setLines((before) => [
              ...(linesBeforeTransform
                ? before === linesBeforeTransform
                : before),
              lastLineGone,
            ]);
          }}
        />
      </Group>
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
