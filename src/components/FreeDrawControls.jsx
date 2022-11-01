import React, { useState } from "react";
import { Slider, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { MuiColorInput } from "mui-color-input";
const FreeDrawControls = ({
  theme,
  strokeSlide,
  setStroke,
  tool,
  setTool,
  lineColor,
  setLineColor,
}) => {
  return (
    <Box borderTop={`1px solid ${theme.palette.primary.main}`}>
      <Box mx={2} my={1} >
        {/* <Select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <MenuItem value="pen">FreeDraw</MenuItem>
          <MenuItem value="eraser">Erase</MenuItem>
        </Select> */}
        <MuiColorInput
          value={lineColor}
          onChange={(color) => setLineColor(color)}
          // color={theme.palette.primary.main}
          sx={{
            "& .MuiInputBase-input": {
              color: theme.palette.primary.main,
            },
          }}
        />
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
