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
  connectMode,
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

  console.log(shapeProps);
const handleTransform = (ref) => {
  const node = ref.current;
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();



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
    height: Math.max(100, node.height() * scaleY),
  });
  // ref.width = node.width()
  // ref.height = node.height()
}


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
          // width={shapeProps.width}
          // height={shapeProps.height}
          theme={theme}
          textAnnotations={textAnnotations}
          setTextAnnotations={setTextAnnotations}
          offsetX={shapeRef ? shapeRef.width / 2 * -0.05 : null}
          offsetY={shapeRef ? shapeRef.height / 2 * -0.05 : null}
        />
      )}
      <Text
        ref={shapeRef}
        {...shapeProps}
        arrayPos={arrayPos}
        isSelected={id === selectedId}
        onClick={(e) => handleClickTap(e, textAnnotations, arrayPos, id)}
        onTap={(e) => handleClickTap(e, textAnnotations, arrayPos, id)}
        shadowBlur={fromShapeId && connectMode ? 10 : null}
        shadowColor={fromShapeId ? "pink" : null}
        onSelect={() => {
          selectShape(id);
        }}
        fill={
          isEditing && isSelected ? "transparent" : theme.palette.primary.main
        }
        // lineCap={"butt"}
        lineJoin={"bevel"}
        wrap={"word"}
        align={"center"}
        
        // onClick={id ? isSelected = id : isSelected = null}
        // text={text}
        x={x}
        y={y}
        height={undefined}
        offsetX={shapeProps.width / 2 || null}
        offsetY={shapeProps.height / 2 || null}
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
        onTransformStart={()=>handleTransform(shapeRef)}
        onTransform={()=>handleTransform(shapeRef)}
        onTransformEnd={()=>handleTransform(shapeRef)}
      />
      {isSelected && (
        <>
          <Transformer
            ref={trRef}
            padding={5}
            anchorCornerRadius={50}
            enabledAnchors={[
              "middle-left",
              "middle-right",
              
            ]}
            borderStroke={theme.palette.primary.main}
            anchorStroke={theme.palette.primary.main}
            anchorSize={15}
            centeredScaling={true}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 20) {
                return oldBox;
              }
              return newBox;
            }}

          />
        </>
      )}
    </>
  );
};

export default TextModal;
