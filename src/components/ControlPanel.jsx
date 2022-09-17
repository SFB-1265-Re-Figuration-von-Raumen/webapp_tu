import React, { useState } from "react";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";

const ControlPanel = ({
  textAnnotations,
  setTextAnnotations,
  percentWidth,
  selectShape,
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
    selectShape(null);
    setOpen(true);
  };
  const handleSubmit = () => {
    setTextAnnotations((current) => [
      ...current,
      {
        id: `${textInput}${current.indexOf() + 1}`,
        text: textInput,
        x: defaultPos.x,
        y: defaultPos.y,
      },
    ]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // height: "10%",
        // borderBottom: "2px solid",
        // borderColor: "primary.main",
        // padding: "1rem",
      }}
    >
      {/* <Card sx={{ display: "flex", justifyContent: "space-around" }}> */}

      <Grid
        container
        sx={
          {
            // borderRight: "1px solid",
            // borderColor: "primary.main",
          }
        }
      >
        <Grid
          item
          xs={2}
          sx={{
            borderRight: "1px solid",
            borderColor: "primary.main",
          }}
        >
          {/* Z:\dev\gh\webapp_tu\public\svg\ux_icon_free-draw-mode.svg */}

          <Button>
            <img
              src="../public/svg/ux_icon_free-draw-mode.svg"
              alt="Free Draw Mode"
              className="nav--button"
            />
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            borderRight: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Button>
            <img
              src="../public/svg/ux-icon_connection-mode.svg"
              alt="Connection Mode"
              className="nav--button"
            />
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            borderRight: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Button>
            <img
              src="../public/svg/ux-icon_erase-mode.svg"
              alt="Erase Mode"
              className="nav--button"
            />
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ borderRight: "1px solid", borderColor: "primary.main" }}
        >
          <Button onClick={handleOpen}>
            <img
              src="../public/svg/ux_icon_text-annotation.svg"
              alt="Text Annotation"
              className="nav--button"
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
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Abbrechen</Button>
              <Button
                type="submit"
                onClick={() => {
                  handleSubmit();
                  handleClose();
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
        xs={4}
        sx={{
          borderRight: "1px solid",
          borderColor: "primary.main",
        }}
      ></Grid>

      {/* <br /> */}

      {/* </Card> */}
    </Box>
  );
};

export default ControlPanel;
