import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import * as aktis from "../assets/svg/categories/aktis/svgr_output";
import * as personen from "../assets/svg/categories/personen/svgr_output";
import * as orte from "../assets/svg/categories/orte/svgr_output";
import * as atmos from "../assets/svg/categories/atmos/svgr_output";
import AddIconButton from "./ui/AddIconButton";

const svgArray = [aktis, orte, personen, atmos];
const categories = ["AKTIVITÄTEN", "ORTE", "PERSONEN", "ATMOSPHÄREN"];
// const addIcon = import.meta.glob("")

const Iconbar = ({ images, addImages, percentWidth, theme, stageRef }) => {
  const defaultPos = {
    x: percentWidth / 2,
    y: window.innerHeight / 2,
  };

  const toggleClick = (icon, key) => {
    const stagePos = stageRef.current.getAbsolutePosition();
    const element = document.getElementById(`${icon}-w-key:${key}`);
    addImages({
      // id: images.at(-1).id + 1,
      id: `icon_${key}`,
      icon: element.outerHTML,
      x: defaultPos.x - stagePos.x,
      y: defaultPos.y - stagePos.y,
    });
  };

  return (
    <>
      {svgArray.map((index, key) => (
        <Grid key={key * 0.77} item height>
          <Box
            key={key}
            sx={{
              // display: "flex",
              // flexDirection: "ro w",
              borderTop: "1px solid",
              borderColor: "primary.main",
              // padding: "0.25rem",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              // backgroundImage: "linear-gradient(to left, #000000, #ffffff)",
            }}
            className="iconBar__outer"
          >
            <Typography color="primary" fontWeight="bold" key={key + 1} p>
              {categories[key]}
            </Typography>
            <Box
              key={key + 3}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // borderLeft: "1px solid",
                overflowX: "hidden",
                height: "100%",
              }}
            >
              <AddIconButton theme={theme} />
              <ScrollContainer
                className={`scroll-container iconToolbarRow`}
                id="xDragToolbar"
                key={key + 2}
              >
                {Object.keys(index).map((icon, key) => {
                  const Icon = index[icon];
                  return (
                    <Box
                      sx={{
                        // height: "100%",
                        // width: "auto",
                        alignContent: "center",
                        borderRadius: "20%",
                        margin: "0 1rem",
                        border: `1px solid ${theme.palette.primary.dark}`,
                        backgroundColor: theme.palette.primary.light,
                      }}
                      alignItems="center"
                      justifyContent="center"
                      key={key + 4}
                    >
                      <Icon
                        onClick={(e) => {
                          toggleClick(icon, key);
                        }}
                        key={`${icon}-w-key:${Math.random()}`}
                        style={{
                          margin: "1rem",
                          padding: "0",
                          width: "4rem",
                          height: "4rem",
                        }}
                        id={`${icon}-w-key:${key}`}
                      />
                    </Box>
                  );
                })}
              </ScrollContainer>
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default Iconbar;
