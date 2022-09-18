import React, { useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import URLImage from "./URLImage";
import Iconbar from "./Iconbar";
import ControlPanel from "./ControlPanel";
import TextModal from "./TextModal";
import { Box, Button } from "@mui/material";

//  at the moment we need to find a way to position the image
//  id in state when added. when we move an image, we want
//  to update its x and y in images state.

const KonvaCanvas = () => {
  const stageRef = useRef();
  const [stageScale, setStageScale] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });
  const percentWidth = (window.innerWidth / 100) * 65;
  const [images, setImages] = useState([{ x: 300, y: 300 }]);
  const [textAnnotations, setTextAnnotations] = useState([{}]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      setIsEditing(false);
    }
  };

  const addImages = (obj) => {
    images.length >= 0
      ? (obj.id = obj.id + `${images.length + 1}`)
      : (obj.id = obj.id + `1`);
    setImages((current) => [...current, obj]);
  };

  function handleWheel(e) {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStageScale({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
    });
  }

  const handleZoomIn = () => {
    setStageScale({
      scale: stageScale.scale + 0.1,
      x: stageScale.x + 0.1,
      y: stageScale.y + 0.1,
    });
  };
  const handleZoomOut = () => {
    setStageScale({
      scale: stageScale.scale - 0.1,
      x: stageScale.x - 0.1,
      y: stageScale.y - 0.1,
    });
  };
  return (
    <>
      <div className="konvaContainer">
        <Stage
          onWheel={handleWheel}
          scaleX={stageScale.scale}
          scaleY={stageScale.scale}
          x={stageScale.x}
          y={stageScale.y}
          width={percentWidth}
          height={window.innerHeight}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {images.map((img, i) => {
              return (
                <URLImage
                  image={img.icon}
                  key={i}
                  arrayPos={images.indexOf(img)}
                  id={img.id}
                  x={img.x}
                  y={img.y}
                  images={images}
                  setImages={setImages}
                  shapeProps={img}
                  checkDeselect={checkDeselect}
                  selectedId={selectedId}
                  selectShape={selectShape}
                  isSelected={img.id === selectedId}
                  onChange={(newAttrs) => {
                    const imgs = images.slice();
                    imgs[i] = newAttrs;
                    setImages(imgs);
                  }}
                />
              );
            })}
            {textAnnotations.map((annotation, i) => {
              return (
                <TextModal
                  text={annotation.text}
                  key={i}
                  id={annotation.id}
                  x={annotation.x}
                  y={annotation.y}
                  arrayPos={textAnnotations.indexOf(annotation)}
                  textAnnotations={textAnnotations}
                  setTextAnnotations={setTextAnnotations}
                  shapeProps={annotation}
                  checkDeselect={checkDeselect}
                  selectedId={selectedId}
                  selectShape={selectShape}
                  isSelected={annotation.id === selectedId}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  onChange={(newAttrs) => {
                    const text = textAnnotations.slice();
                    text[i] = newAttrs;
                    setTextAnnotations(text);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
        <div
          className="zommContainer"
          style={{ position: "absolute", bottom: "2rem", left: "1rem" }}
        >
          <Button variant="outlined" onClick={handleZoomIn}>
            <img src="../public/svg/plus.svg" alt="plus zoom" />
          </Button>
          <Button variant="outlined" onClick={handleZoomOut}>
            <img src="../public/svg/minus.svg" alt="minus zoom" />
          </Button>
        </div>
      </div>
      <div className="iconBarContainer">
        <Box
          sx={{
            borderLeft: "1px solid",
            borderColor: "primary.main",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            // padding: "0.25rem",
          }}
        >
          <ControlPanel
            textAnnotations={textAnnotations}
            setTextAnnotations={setTextAnnotations}
            percentWidth={percentWidth}
            selectShape={selectShape}
          />
          <Iconbar
            images={images}
            setImages={setImages}
            addImages={addImages}
            percentWidth={percentWidth}
          />
        </Box>
      </div>
    </>
  );
};

export default KonvaCanvas;
