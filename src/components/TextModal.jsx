import Konva from "konva";
import React, { useRef, useEffect } from "react";
import { Transformer, Text, Rect } from "react-konva";
import TextInput from "./TextInput";

const TextModal = ({
  theme,
  selectShape,
  selectedId,
  shapeProps,
  isSelected,
  onChange,
  textAnnotations,
  setTextAnnotations,
  text,
  id,
  x,
  y,
  arrayPos,
  isEditing,
  setIsEditing,
  deleteMode,
  freeDraw,
  layerRef,
  stageRef,
  selectionRectRef,
  handleDrag,
  handleClickTap,
  fromShapeId,
}) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected, isEditing]);

  // here we need to update the Texts state
  // with the new x and y values
  // for the current Text
  // respective to the index "arrayPos"

  return (
    <>
      {isSelected && isEditing && (
        <TextInput
          x={x}
          y={y}
          text={text}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          id={id}
          arrayPos={arrayPos}
          width={shapeProps.scaleX}
          height={shapeProps.scaleY}
          placeholder={text}
          theme={theme}
          name={name}
        />
      )}
      <Text
        ref={shapeRef}
        {...shapeProps}
        arrayPos={arrayPos}
        isSelected={id === selectedId}
        onClick={(e) => handleClickTap(e, textAnnotations, arrayPos, id)}
        onTap={(e) => handleClickTap(e, textAnnotations, arrayPos, id)}
        shadowBlur={fromShapeId ? 10 : null}
        shadowColor={fromShapeId ? "pink" : null}
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
        // text={text}
        x={x}
        y={y}
        borderStroke={"black"}
        fontSize={20}
        fontFamily={theme.typography.fontFamily}
        draggable={freeDraw ? "false" : "true"}
        onDragStart={(e) => {
          handleDrag(e, textAnnotations, setTextAnnotations, arrayPos, id);
        }}
        onDragMove={(e) => {
          handleDrag(e, textAnnotations, setTextAnnotations, arrayPos, id);
        }}
        onDragEnd={(e) => {
          handleDrag(e, textAnnotations, setTextAnnotations, arrayPos, id);
        }}
        onDblClick={() => {
          setIsEditing(true);
        }}
        onDblTap={() => {
          setIsEditing(true);
        }}
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
        onTransformEnd={() => {
          //   // transformer is changing scale of the node
          //   // and NOT its width or height
          //   // but in the store we have only width and height
          //   // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
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
      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            padding={5}
            anchorCornerRadius={50}
            enabledAnchors={[
              "top-left",
              "bottom-left",
              "top-right",
              "bottom-right",
            ]}
            borderStroke={theme.palette.primary.main}
            anchorStroke={theme.palette.primary.main}
            anchorSize={15}
            centeredScaling={false}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 20) {
                return oldBox;
              }
              return newBox;
            }}
            //   onDblClick={Transformer.hide()}
          />
        </>
      )}
    </>
  );
};

export default TextModal;
