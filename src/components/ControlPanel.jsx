import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import * as UIcons from "../assets/svg/UIcons/svgr_output/index";
import theme from "../themes/SoftIce";

const ControlPanel = ({
  textAnnotations,
  setTextAnnotations,
  percentWidth,
  selectShape,
  deleteMode,
  setDeleteMode,
  freeDraw,
  setFreeDraw,
  isEditing,
  isSelected,
  connectMode,
  setConnectMode,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const defaultPos = {
    x: percentWidth / 2,
    y: window.innerHeight / 2,
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    if (isSelected) selectShape(null);
    setOpen(true);
    setDeleteMode(false);
    setFreeDraw(false);
    setConnectMode(false);
  };
  const handleSubmit = () => {
    setTextAnnotations((current) => [
      ...current,
      {
        id: `textAnnotation${textAnnotations.length}`,
        text: textInput,
        x: defaultPos.x,
        y: defaultPos.y,
      },
    ]);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >

      <Grid
        container
        sx={{
          // height: "10vh"
          // height: "auto",
        }}
      >
        <Grid
          item
          // xs={3}
          sx={{
            borderRight: "1px solid",
            borderColor: "primary.main",
          }}
        >

          <Button
            onClick={() => {
              if (freeDraw) {
                setFreeDraw(false);
              } else {
                setFreeDraw(true);
                setDeleteMode(false);
                setConnectMode(false);
              }
            }}
            style={{
              backgroundColor: `${freeDraw ? "pink" : "transparent"}`,
              aspectRatio: "1/1",
            }}
          >
            <UIcons.UxIconFreeDrawMode
              alt="Free Draw Mode"
              className="nav--button"
              theme={theme}
            />
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            borderRight: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Button
            style={{
              backgroundColor: `${connectMode ? "pink" : "transparent"}`,
            }}
          >
            <UIcons.UxIconConnectionMode
              alt="Connection Mode"
              className="nav--button"
              onClick={() => {
                if (connectMode) {
                  setConnectMode(false);
                } else {
                  setFreeDraw(false);
                  setDeleteMode(false);
                  setConnectMode(true);
                }
              }}
              theme={theme}
            />
          </Button>
        </Grid>
        <Grid
          item
          // xs={3}
          sx={{
            borderRight: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Button
            onClick={() => {
              if (deleteMode) {
                setDeleteMode(false);
              } else {
                setFreeDraw(false);
                setDeleteMode(true);
              }
            }}
            style={{
              backgroundColor: `${deleteMode ? "pink" : "transparent"}`,
            }}
          >
            <UIcons.UxIconEraseMode alt="Erase Mode" className="nav--button" theme={theme} />
          </Button>
        </Grid>
        <Grid
          item
          // xs={3}
          sx={{ borderRight: "1px solid", borderColor: "primary.main" }}
        >
          <Button
            onClick={handleOpen}
            style={{ backgroundColor: `${isEditing ? "pink" : "transparent"}` }}
          >
            <UIcons.UxIconTextAnnotation
              alt="Text Annotation"
              className="nav--button"
              theme={theme}
            />
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <DialogContentText>
                Füge eine Beschreibung hinzu:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                placeholder="Beschreibung"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Abbrechen</Button>
              <Button
                type="submit"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Fertig
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      <Grid
        item
        // xs={4}
        sx={{
          borderRight: "1px solid",
          borderColor: "primary.main",
        }}
      ></Grid>
    </Box>
  );
};

export default ControlPanel;
