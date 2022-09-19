import React from "react";
import { Slider } from "@mui/material";
import { Box } from "@mui/system";
const FreeDrawControls = ({ theme, strokeSlide, setStroke, tool }) => {
  return (
    <Box borderTop={`1px solid ${theme.palette.primary.main}`}>
      <Box mx={2} my={1}>
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
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
          min={1}
        />
      </Box>
    </Box>
  );
};

export default FreeDrawControls;
