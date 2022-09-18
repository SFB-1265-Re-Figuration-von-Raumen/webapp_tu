import Konva from "konva";
import React, { useState, useRef, useEffect } from "react";
import { Transformer, Text } from "react-konva";
import theme from "../Themes";

const TextModal = ({
  selectShape,
  selectedId,
  shapeProps,
  onSelect,
  isSelected,
  onChange,
  textAnnotations,
  setTextAnnotations,
  id,
  x,
  y,
  arrayPos,
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
    const newText = textAnnotations[pos];
    newText.x = x;
    newText.y = y;
    const updatedTexts = Object.keys(textAnnotations).map((key, i) => {
      if (key === pos) {
        return newText;
      }
      return textAnnotations[key];
    });
    setTextAnnotations(updatedTexts);
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

    // here we need to update the Texts state
    // with the new x and y values
    // for the current Text
    // respective to the index "arrayPos"

    savePosition(e.target.attrs.arrayPos, e.target.attrs.x, e.target.attrs.y);
  };

  const handleEdit = (e) => {
    setTextAnnotations((current) => [(current = e.target.value)]);
  };
  return (
    <>
      <Text
        ref={shapeRef}
        {...shapeProps}
        arrayPos={arrayPos}
        isSelected={id === selectedId}
        onClick={() => {
          selectShape(id);
        }}
        onSelect={() => {
          selectShape(id);
        }}
        fill={theme.palette.primary.main}
        // lineCap={"butt"}
        // lineJoin={"bevel"}
        strokeEnabled={true}
        wrap={"word"}
        // onClick={id ? isSelected = id : isSelected = null}
        onTap={onSelect}
        draggable="true"
        // text={text}
        x={x}
        y={y}
        borderStroke={"black"}
        fontSize={20}
        fontFamily={theme.typography.fontFamily}
        height={undefined}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDblClick={handleEdit}
        onTransform={
          () => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              // width: Math.max(5, node.width() * scaleX),
              // height: Math.max(node.height() * scaleY),
            });
            //   // we will reset it back
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
        onTransformEnd={() => {
          //   // transformer is changing scale of the node
          //   // and NOT its width or height
          //   // but in the store we have only width and height
          //   // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            // width: Math.max(5, node.width() * scaleX),
            // height: Math.max(node.height() * scaleY),
          });
          //   // we will reset it back
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
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          padding={5}
          anchorCornerRadius={50}
          enabledAnchors={["middle-left", "middle-right"]}
          borderStroke={theme.palette.primary.main}
          anchorStroke={theme.palette.primary.main}
          anchorSize={25}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 20) {
              return oldBox;
            }
            return newBox;
          }}
          //   onDblClick={Transformer.hide()}
        />
      )}
    </>
  );
};

export default TextModal;
