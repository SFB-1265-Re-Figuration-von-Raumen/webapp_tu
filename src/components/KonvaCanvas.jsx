import React, { useState, useRef } from "react";
import { Stage, Layer, Line} from "react-konva";
import URLImage from "./URLImage";
import Iconbar from "./Iconbar";
import ControlPanel from "./ControlPanel";
import TextModal from "./TextModal";
import { Slider } from "@mui/material";

//  at the moment we need to find a way to position the image
//  id in state when added. when we move an image, we want
//  to update its x and y in images state.

const KonvaCanvas = () => {
  const stageRef = useRef();
  const percentWidth = (window.innerWidth / 100) * 65;
  const [images, setImages] = useState([{ id: 0, icon: "", x: 300, y: 300 }]);
  const [selectedId, selectShape] =  useState(null);
  const [textAnnotations, setTextAnnotations] = useState([
    { id: 0, text: "", x: 300, y: 300 },
  ]);

  //ZOOM STUFF 
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0
  });

  function handleWheel(e) {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStage({
      scale: newScale,
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale
    });
  }
// END OF ZOOM FUNCTIONS

    function checkDeselect(e) {
      // deselect when clicked on empty area
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        selectShape(null);
      }
    }

    // PENTOOL ##############################

      const [tool, setTool] = useState('pen');
      const [lines, setLines] = useState([]);
      const isDrawing = useRef(false);
      const [strokeSlide, setStroke] = React.useState(5); //experimental
      const shapeInUse = useRef(false);
      const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
      };

      const handleMouseMove = (e) => {
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
    const addImages = (obj) => {
      setImages((current) => [...current, obj]);
    };
    return (

      
      <>
        <div className="konvaContainer">
          <Stage
            width={percentWidth}
            height={window.innerHeight}
            ref={stageRef}
            //onMouseDown={checkDeselect} -- Temporary disabled
            onTouchStart={checkDeselect}
            onWheel={handleWheel}
            scaleX={stage.scale}
            scaleY={stage.scale}
            x={stage.x}
            y={stage.y}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onMouseDown={handleMouseDown}
          >
            <Layer>
              {images.map((img, i) => {
                return (
                  <URLImage
                    image={img.icon}
                    key={i}
                    id={img.id}
                    x={img.x}
                    y={img.y}
                    images={images}
                    setImages={setImages}
                    shapeProps={img}
                    checkDeselect={checkDeselect}
                    selectedId={selectedId}
                    OnDragStart={shapeInUse === true}
                    selectShape={selectShape}
                    isSelected={img.id === selectedId}
                    onChange={(newAttrs) => {
                      const imgs = images.slice();
                      imgs[i] = newAttrs;
                      setImages(imgs);
                    } } />
                );
              })}
            </Layer>
            <Layer>
              {textAnnotations.map((annotation, i) => {
                return (
                  <TextModal
                    text={annotation.text}
                    key={i}
                    id={annotation.id}
                    x={annotation.x}
                    y={annotation.y}
                    textAnnotations={textAnnotations}
                    setTextAnnotations={setTextAnnotations}
                    shapeProps={annotation}
                    checkDeselect={checkDeselect}
                    selectedId={selectedId}
                    selectShape={selectShape}
                    isSelected={annotation.id === selectedId}
                    onChange={(newAttrs) => {
                      const text = textAnnotations.slice();
                      text[i] = newAttrs;
                      setTextAnnotations(text);
                    } } />
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
                line.tool === 'eraser' ? 'destination-out' : 'source-over'}
            />
          ))}
        </Layer>
          </Stage>
        </div>
        <div className="iconBarContainer">
          <ControlPanel
            textAnnotations={textAnnotations}
            setTextAnnotations={setTextAnnotations}
            percentWidth={percentWidth}
            selectShape={selectShape} />
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
            percentWidth={percentWidth} />
        </div>
      </>
    );
  }



export default KonvaCanvas;

