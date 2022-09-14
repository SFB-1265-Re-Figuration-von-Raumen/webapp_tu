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
} from "@mui/material";
import { DeleteRounded, TextFields } from "@mui/icons-material";

const ControlPanel = ({
  textAnnotations,
  setTextAnnotations,
  percentWidth,
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
    setOpen(true);
  };
  const handleSubmit = () => {
    setTextAnnotations((current) => [
      ...current,
      {
        id: current.at(-1).id + 1,
        text: textInput,
        x: defaultPos.x,
        y: defaultPos.y,
      },
    ]);
  };

  return (
    <Card sx={{ display: "flex", justifyContent: "space-around" }}>
      <TextFields onClick={handleOpen} sx={{ cursor: "pointer" }} />
      <DeleteRounded />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>Füge eine Beschreibung hinzu:</DialogContentText>
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
    </Card>
  );
};

export default ControlPanel;
