import { SetMealOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Html } from "react-konva-utils";

const TextInputIcon = ({
  x,
  y,
  id,
  isEditing,
  setIsEditing,
  arrayPos,
  images,
  setImages,
  theme,
  name,
}) => {
  useEffect(() => {
    // console.log(document.getElementById(`editInputOf:${id}`));
    const isUpdated = async () => {
      await id;
      const cursorInput = document.getElementById(`editInputOf:${id}`);
      const end = cursorInput.value.length;
      cursorInput.setSelectionRange(end, end);
      cursorInput.focus();
    };
    isUpdated();
  }, [isEditing, id]);

  const [input, setInput] = useState(name);
  const RETURN_KEY = 13;
  const ESCAPE_KEY = 27;
  const handleEscapeKeys = (e) => {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      const copy = images.slice();
      copy[arrayPos].name = input;
      setImages(copy);
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
        id={`editInputOf:${id}`}
        value={input}
        style={{
          background: "transparent",
          border: "none",
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

export default TextInputIcon;
