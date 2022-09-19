import React, { useEffect, useState } from "react";
import { Html } from "react-konva-utils";


const TextInput = ({
  x,
  y,
  id,
  isEditing,
  setIsEditing,
  textAnnotations,
  setTextAnnotations,
  arrayPos,
  width,
  height,
  text,
  theme
}) => {

    useEffect(() => {
     
    }, [x, y]);
    
  const [input, setInput] = useState(text);
  const RETURN_KEY = 13;
  const ESCAPE_KEY = 27;
  const handleEscapeKeys = (e) => {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      const newTextAnnotation = [...textAnnotations];
      newTextAnnotation[arrayPos].text = input;
      setTextAnnotations(newTextAnnotation);
      setIsEditing(false);
    }
  };

  const handleTextChange = (e) => {
    setInput(e.currentTarget.value);
  };

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        onChange={handleTextChange}
        onKeyDown={handleEscapeKeys}
        x={x}
        y={y}
        id="editInput"
        value={input}
        style={{
          background: "transparent",
          border: "none",
          width: `${width}`,
          height: `${height}`,
          color: `${theme.palette.primary.main}`,
          fontFamily: `${theme.typography.fontFamily}`,
          fontSize: "20px",
          outline: "none",
          resize: "none",
        }}
      />
    </Html>
  );
};

export default TextInput;
