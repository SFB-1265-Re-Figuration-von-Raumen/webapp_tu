import React, { useState, useRef } from "react";

import { Stage, Layer, Line } from "react-konva";

import URLImage from "./URLImage";
import Iconbar from "./Iconbar";
import ControlPanel from "./ControlPanel";
import TextModal from "./TextModal";

import { Box, Button, Slider } from "@mui/material";

//  at the moment we need to find a way to position the image
//  id in state when added. when we move an image, we want
//  to update its x and y in images state.

const KonvaCanvas = () => {
  const stageRef = useRef();

  const percentWidth = (window.innerWidth / 100) * 65;
  const [images, setImages] = useState([{}]);
  const [textAnnotations, setTextAnnotations] = useState([{}]);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [lastDist, setLastDist] = useState(0);
  const [lastCenter, setLastCenter] = useState(null);
  const [selectedId, selectShape] = useState(null);

  //ZOOM STUFF
  const [stageScale, setStageScale] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

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
  // END OF ZOOM FUNCTIONS

  // PENTOOL ##############################

  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [strokeSlide, setStroke] = useState(5); //experimental
  const handleMouseDown = (e) => {
    checkDeselect();
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    checkDeselect();
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

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

  console.log(lines);
  
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
          onMouseDown={() => handleMouseDown}
          onTouchStart={() => handleMouseDown}
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
                  deleteMode={deleteMode}
                  setDeleteMode={setDeleteMode}
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
                  deleteMode={deleteMode}
                  setDeleteMode={setDeleteMode}
                  onChange={(newAttrs) => {
                    const text = textAnnotations.slice();
                    text[i] = newAttrs;
                    setTextAnnotations(text);
                  }}
                />
              );
            })}
          </Layer>
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="black"
                strokeWidth={strokeSlide}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
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
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
          />
          <div>
            <select
              value={tool}
              onChange={(e) => {
                setTool(e.target.value);
              }}
            >
              <option value="nodraw"></option>
              <option value="pen">FreeDraw</option>
              <option value="eraser">Erase</option>
            </select>
            <Slider
              size="small"
              defaultValue={5}
              value={strokeSlide}
              onChange={(e) => {
                setStroke(e.target.value);
              }}
              getaria-label="Small"
              valueLabelDisplay="auto"
            />
          </div>

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
