import React, { useState, useRef, useEffect } from "react";
import { Transformer, Text } from "react-konva";

const TextModal = ({
  textAnnotations,
  setTextAnnotations,
  shapeProps,
  checkDeselect,
  selectedId,
  selectShape,
  onSelect,
  isSelected,
  text,
  onChange,
  id,
  x,
  y,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();
  useEffect(() => {
    if (isSelected) {
      console.log("isSelected");

      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDragStart = (e) => {
    isSelected
      ? null
      : e.target.setAttrs({
          scaleX: 1.1,
          scaleY: 1.1,
        });
  };
  function savePosition(pos, x, y) {
    // console.log(`arrayPos is ${pos}, x is ${x}, y is ${y}`);

    const newText = textAnnotations[pos];
    newText.x = x;
    newText.y = y;
    // console.log(newText);
    const updatedTexts = Object.keys(textAnnotations).map((key, i) => {
      if (key === pos) {
        return newText;
      }
      return textAnnotations[key];
    });
    // console.log(updatedTexts);
    setTextAnnotations(updatedTexts);
    // console.log(Texts);
  }
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

    // here we need to update the Texts state
    // with the new x and y values
    // for the current Text
    // respective to the index "arrayPos"

    savePosition(e.target.attrs.arrayPos, e.target.attrs.x, e.target.attrs.y);
  };
  return (
    <>
      <Text
        ref={shapeRef}
        {...shapeProps}
        arrayPos={id}
        isSelected={id === selectedId}
        onClick={() => {
          selectShape(id);
        }}
        onSelect={() => {
          selectShape(id);
        }}
        // onClick={id ? isSelected = id : isSelected = null}
        onTap={onSelect}
        draggable="true"
        text={text}
        x={x}
        y={y}
        fontSize={20}
        width={200}
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
          anchorCornerRadius={5}
          enabledAnchors={"middle-left, middle-right"}
          borderStroke={"black"}
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

export default TextModal;
