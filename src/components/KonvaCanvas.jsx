import React, { useState, useRef, useEffect } from "react";

import { Stage, Layer, Line, Rect, Transformer } from "react-konva";
import { jsPDF } from "jspdf";
import URLImage from "./URLImage";
import Iconbar from "./Iconbar";
import ControlPanel from "./ControlPanel";
import TextModal from "./TextModal";
import FreeDrawControls from "./FreeDrawControls";
import { Box, Button, useTheme } from "@mui/material";
import * as UIcons from "../assets/svg/UIcons/svgr_output/index";

//  at the moment we need to find a way to position the image
//  id in state when added. when we move an image, we want
//  to update its x and y in images state.

const KonvaCanvas = () => {
  const theme = useTheme();
  const stageRef = useRef();
  const layeRef = useRef();
  const selectionRectRef = useRef();
  const Konva = window.Konva;
  const isSelected = useState(null);

  const percentWidth = (window.innerWidth / 100) * 70;
  const defaultPos = {
    x: percentWidth / 2,
    y: window.innerHeight / 2,
  };

  const [images, setImages] = useState([]);
  const [textAnnotations, setTextAnnotations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedId, selectShape] = useState(null);
  const [freeDraw, setFreeDraw] = useState(false);
  const [connectMode, setConnectMode] = useState(false);
  const [fromShapeId, setFromShapeId] = useState(null);
  const [connectors, setConnectors] = React.useState([]);
  // useEffect(() => {
  //   // console.log("useEffect");
  //   const updateArr = () => {
  //     const imagesCopy = images.slice();
  //     setImages(imagesCopy);
  //     const textsCopy = textAnnotations.slice();
  //     setTextAnnotations(textsCopy);
  //   };
  // });
  useEffect(() => {
    setFromShapeId(null);
  }, [!connectMode]);
  const trRef = useRef();
  //ZOOM STUFF
  const [stageScale, setStageScale] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  // Download Button Function for pngs // we dont need this anymore if we export pdf via external library
  // quickfix to get the current width and height of the stage --> how to do this better? @gg @alza
  // i tried stageRef.current.height() --> this gives me a smaller pdf than the actual stage size --> shrug Emoji
  const pdfWidth = percentWidth; // this is just how we calculate the width of our stage below
  const pdfHeight = window.innerHeight; //this is just how we calculate the height of our stage below
  //handle the export of the Canvas Stage as a pdf
  const handleExport = () => {
    // This is the Old png export code
    //const uri = stageRef.current.toDataURL();
    //console.log(uri);
    //downloadURI(uri, 'Canvas.png');
    const pdf = new jsPDF("l", "px", [pdfWidth * 2, pdfHeight * 2]); // times 2 just a quickfix atm so everything fits on pdf (lol)
    pdf.addImage(
      stageRef.current.toDataURL({ pixelRatio: 2 }), // pixel ratio bigger = better
      0,
      0,
      pdfWidth,
      pdfHeight
    );
    pdf.save("canvas.pdf");
  };

  const handleStageClick = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      setIsEditing(false);
    }
  };

  const handleClickTap = (e, array, arrayPos, id) => {
    setFreeDraw(false);
    if (deleteMode) {
      if (array === connectors) {
        if ((e.target = "Line")) {
          connectors.splice(arrayPos, 1);
        }
      }

      const filteredConnectors = connectors.filter((connector) => {
        return connector.from !== id && connector.to !== id;
      });

      setConnectors(filteredConnectors);

      array.splice(arrayPos, 1);
    } else if (freeDraw) {
      selectShape(null);
    } else if (connectMode) {
      if (fromShapeId) {
        const newConnector = {
          from: fromShapeId,
          to: array[arrayPos].id,
          id: connectors.length,
        };
        setConnectors(connectors.concat([newConnector]));
        setFromShapeId(null);
      } else {
        setFromShapeId(array[arrayPos].id);
      }
    } else {
      selectShape(id);
    }
  };

  const handleDrag = (e, stateArr, setStateArr, i) => {
    setFreeDraw(false);
    const copy = stateArr.slice();
    copy[i].x = e.target.attrs.x;
    copy[i].y = e.target.attrs.y;
    setStateArr(copy);
  };

  const addImages = (obj) => {
    setFreeDraw(false);
    images.length >= 0
      ? (obj.id = obj.id + `${images.length + 1}`)
      : (obj.id = obj.id + `1`);
    setImages((current) => [...current, obj]);
  };
  // pinch zoom

  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getCenter(p1, p2) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }
  let lastCenter = null;
  let lastDist = 0;
  const handlePinchZoom = (e) => {
    e.evt.preventDefault();
    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];
    const stage = stageRef;
    if (touch1 && touch2) {
      // if the stage was under Konva's drag&drop
      // we need to stop it, and implement our own pan logic with two pointers
      if (stage.isDragging()) {
        stage.stopDrag();
      }

      var p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };
      var p2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      };

      if (!lastCenter) {
        lastCenter = getCenter(p1, p2);
        return;
      }
      var newCenter = getCenter(p1, p2);

      var dist = getDistance(p1, p2);

      if (!lastDist) {
        lastDist = dist;
      }

      // local coordinates of center point
      var pointTo = {
        x: (newCenter.x - stage.x()) / stage.scaleX(),
        y: (newCenter.y - stage.y()) / stage.scaleX(),
      };

      var scale = stage.scaleX() * (dist / lastDist);

      stage.scaleX(scale);
      stage.scaleY(scale);

      // calculate new position of the stage
      var dx = newCenter.x - lastCenter.x;
      var dy = newCenter.y - lastCenter.y;

      var newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      };

      stage.position(newPos);

      lastDist = dist;
      lastCenter = newCenter;
    }
  };
  const handleTouchEnd = () => {
    lastDist = 0;
    lastCenter = null;
    if (freeDraw) {
      isDrawing.current = false;
    }
  };
  // PENTOOL ##############################

  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([{}]);
  const isDrawing = useRef(false);
  const [strokeSlide, setStroke] = useState(5); //experimental
  const handleMouseDown = (e) => {
    if (freeDraw) {
      isDrawing.current = true;
      const pos = e.target.getStage().getRelativePointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };
  const [lineColor, setLineColor] = useState("#000000");
  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (freeDraw) {
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getRelativePointerPosition();
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lastLine.strokeWidth = strokeSlide;
      lastLine.color = lineColor;

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleTouchStart = (e) => {
    if (freeDraw) {
      isDrawing.current = true;
      const pos = e.target.getStage().getRelativePointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };
  const handleTouchMove = (e) => {
    if (freeDraw) {
      isDrawing.current = true;
      const pos = e.target.getStage().getRelativePointerPosition();
      // setLines([...lines, { tool, points: [pos.x, pos.y] }]);

      const stage = e.target.getStage();
      const point = stage.getRelativePointerPosition();
      let lastLine = lines[lines.length - 1];
      // add point

      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lastLine.strokeWidth = strokeSlide;
      lastLine.color = lineColor;

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      if (!isDrawing.current) {
        return;
      }
    }
    handlePinchZoom(e);
  };

  function handleWheel(e) {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    // console.log(stage);

    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getRelativePointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getRelativePointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStageScale({
      scale: newScale,
      x:
        (stage.getRelativePointerPosition().x / newScale - mousePointTo.x) *
        newScale,
      y:
        (stage.getRelativePointerPosition().y / newScale - mousePointTo.y) *
        newScale,
    });
  }
  // END OF ZOOM FUNCTIONS
  const handleZoomIn = (e) => {
    const stage = stageRef.current.attrs;
    // console.log(stage.x);
    // console.log(stage.y);
    // console.log(stage.scaleX);
    // console.log(stage.width + stage.x / stage.scaleX);
    // console.log(stage.height + stage.y / stage.scaleY);
    const centerStage = {
      x: stage.width / 2 - stage.x / stage.scaleX,
      y: stage.height / 2 - stage.y / stage.scaleY,
    };
    const newScale = stage.scaleX * 1.05;
    setStageScale({
      scale: newScale,
      x: (centerStage.x / newScale - centerStage.x) * newScale,
      y: (centerStage.y / newScale - centerStage.y) * newScale,
    });
  };
  const handleZoomOut = (e) => {
    const stage = stageRef.current.attrs;
    // console.log(stage.x);
    // console.log(stage.y);
    // console.log(stage.scaleX);
    // console.log(stage.width + stage.x / stage.scaleX);
    // console.log(stage.height + stage.y / stage.scaleY);
    const centerStage = {
      x: stage.width / 2 - stage.x / stage.scaleX,
      y: stage.height / 2 - stage.y / stage.scaleY,
    };
    const newScale = stage.scaleX / 1.05;
    setStageScale({
      scale: newScale,
      x: (centerStage.x / newScale - centerStage.x) * newScale,
      y: (centerStage.y / newScale - centerStage.y) * newScale,
    });
  };

  return (
    <>
      <div
        className="konvaContainer"
        style={{ backgroundColor: theme.palette.secondary.canvas }}
      >
        <>
          <Stage
            draggable={freeDraw ? false : true}
            onWheel={handleWheel}
            scaleX={stageScale.scale}
            scaleY={stageScale.scale}
            x={stageScale.x}
            y={stageScale.y}
            width={percentWidth}
            height={window.innerHeight}
            ref={stageRef}
            onClick={(e) => handleStageClick(e)}
            onTap={(e) => handleStageClick(e)}
            onMousemove={handleMouseMove}
            onMouseup={(e) => handleTouchEnd(e)}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={(e) => handleTouchMove(e)}
            onTouchEnd={() => handleTouchEnd()}
            // onDragStart={updateOrigin}
          >
            <Layer ref={layeRef}>
              {lines.map((line, i) => (
                <Line
                  key={i}
                  points={line.points}
                  stroke={line.color}
                  draggable={freeDraw ? false : true}
                  strokeWidth={line.strokeWidth}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  onClick={() => {
                    if (deleteMode) {
                      lines.splice(line, 1);
                    }
                  }}
                  onTap={() => {
                    if (deleteMode) {
                      lines.splice(line, 1);
                    }
                  }}
                  globalCompositeOperation={
                    line.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              ))}
              {connectors.map((con) => {
                const from =
                  images.find((s) => s.id === con.from) ||
                  textAnnotations.find((s) => s.id === con.from);
                const to =
                  images.find((s) => s.id === con.to) ||
                  textAnnotations.find((s) => s.id === con.to);

                // console.log(from);
                const width = from.x - to.x;
                const height = from.y - to.y;
                const radius = Math.min(20, Math.abs(height), Math.abs(width));
                return (
                  <Line
                    opacity={0.5}
                    key={con.id}
                    dash={[20, 10]}
                    lineCap="round"
                    points={[from.x, from.y, to.x, to.y]}
                    stroke={theme.palette.primary.main}
                    onClick={(e) =>
                      handleClickTap(e, connectors, con.id, con.id)
                    }
                    onTap={(e) => handleClickTap(e, connectors, con.id, con.id)}
                    // offsetX={img.width}
                  />
                );
              })}
              {images.map((img, i) => {
                return (
                  <URLImage
                    image={img.icon}
                    theme={theme}
                    key={i}
                    index={img}
                    name={img.name}
                    arrayPos={images.indexOf(img)}
                    id={img.id}
                    x={img.x}
                    y={img.y}
                    draggable
                    images={images}
                    setImages={setImages}
                    shapeProps={img}
                    checkDeselect={handleClickTap}
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
                    freeDraw={freeDraw}
                    setFreeDraw={setFreeDraw}
                    lines={lines}
                    setLines={setLines}
                    selectionRectRef={selectionRectRef}
                    layeRef={layeRef}
                    stageRef={stageRef}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    textAnnotations={textAnnotations}
                    setTextAnnotations={setTextAnnotations}
                    connectMode={connectMode}
                    setConnectMode={setConnectMode}
                    handleDrag={handleDrag}
                    handleClickTap={handleClickTap}
                    fromShapeId={fromShapeId}
                  />
                );
              })}
              {textAnnotations.map((annotation, i) => {
                return (
                  <TextModal
                    theme={theme}
                    text={annotation.text}
                    key={i}
                    annotation={annotation}
                    id={annotation.id}
                    x={annotation.x}
                    y={annotation.y}
                    arrayPos={textAnnotations.indexOf(annotation)}
                    textAnnotations={textAnnotations}
                    setTextAnnotations={setTextAnnotations}
                    shapeProps={annotation}
                    checkDeselect={handleClickTap}
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
                    freeDraw={freeDraw}
                    setFreeDraw={setFreeDraw}
                    trRef={trRef}
                    layeRef={layeRef}
                    stageRef={stageRef}
                    handleDrag={handleDrag}
                    handleClickTap={handleClickTap}
                    fromShapeId={fromShapeId}
                    connectMode={connectMode}
                  />
                );
              })}
            </Layer>
          </Stage>
        </>
        <div
          className="zommContainer"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "1rem",
            gap: ".5rem",
            display: "flex",
          }}
        >
          <Button
            letiant="outlined"
            color="secondary"
            onClick={(e) => handleZoomOut(e)}
            onMouseDown={(e) => (e ? handleZoomOut(e) : null)}
          >
            <UIcons.UxIconZoomOut
              alt="minus zoom"
              className="zoomyZoom"
              width={null}
              height={null}
            />
          </Button>
          <Button
            letiant="outlined"
            color="secondary"
            onClick={(e) => handleZoomIn(e)}
          >
            <UIcons.UxIconZoomIn
              alt="plus zoom"
              className="zoomyZoom"
              width={null}
              height={null}
            />
          </Button>
          <div className="export--btn">
            <Button letiant="outlined" color="secondary" onClick={handleExport}>
              <span style={{ color: theme.palette.primary.main }}>Export</span>
              <UIcons.UxIconExport
                alt="epxort"
                className="zoomyZoom"
                width={null}
                height={null}
              />{" "}
            </Button>
          </div>
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
            backgroundColor: "secondary.bg",
          }}
        >
          <ControlPanel
            textAnnotations={textAnnotations}
            setTextAnnotations={setTextAnnotations}
            percentWidth={percentWidth}
            selectShape={selectShape}
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
            freeDraw={freeDraw}
            setFreeDraw={setFreeDraw}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            connectMode={connectMode}
            setConnectMode={setConnectMode}
            theme={theme}
          />
          {freeDraw && (
            <FreeDrawControls
              strokeSlide={strokeSlide}
              tool={tool}
              setTool={setTool}
              theme={theme}
              setStroke={setStroke}
              lineColor={lineColor}
              setLineColor={setLineColor}
            />
          )}

          <Iconbar
            stageRef={stageRef}
            theme={theme}
            images={images}
            setImages={setImages}
            addImages={addImages}
            percentWidth={percentWidth}
            stageScale={stageScale}
            defaultPos={defaultPos}
          />
        </Box>
      </div>
    </>
  );
};

export default KonvaCanvas;
