import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import * as aktis from "../assets/svg/categories/akti/svgr_output/index";
import * as personen from "../assets/svg/categories/person/svgr_output/index";
import * as orte from "../assets/svg/categories/spot/svgr_output/index";
import * as atmos from "../assets/svg/categories/atmo/svgr_output/index";
import AddIconButton from "./ui/AddIconButton";


const svgArray = [aktis, orte, personen, atmos];
const categories = ["AKTIVITÄTEN", "ORTE", "PERSONEN", "ATMOSPHÄREN"];


const Iconbar = ({ images, addImages, percentWidth, theme, stageRef, stageScale }) => {
  const defaultPos = {
    x: percentWidth / 2,
    y: window.innerHeight / 2,
  };

  const toggleClick = (icon, key, name) => {
    const stagePos = stageRef.current.getAbsolutePosition();
    const element = document.getElementById(`${icon}-w-key:${key}`);

    const scale = stageScale.scale


    addImages({
      // id: images.at(-1).id + 1,
      id: `icon_${key}`,
      icon: element.outerHTML,
      x: defaultPos.x / scale - stagePos.x / scale,
      y: defaultPos.y / scale - stagePos.y / scale,
      name: name,
    });
  };


  return (
    <>
      {svgArray.map((index, key) => (
        <Grid key={key * 0.77} item height>
          <Box
            key={key}
            sx={{
              borderTop: "1px solid",
              borderColor: "primary.main",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              "&.iconBar__outer::after": {
                background: `linear-gradient(to right, rgba(255,255,255,0) 70%, ${theme.palette.secondary.bg} 90%);`
              }
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
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 0.25rem",
                        borderRadius: "20px",
                        backgroundColor: theme.palette.primary.light,
                        aspectRatio: "1/1",
                        border: `1px solid ${theme.palette.primary.dark}`,
                      }}
                    >
                      <Icon
                        onClick={(e) => {
                          toggleClick(icon, key, icon);
                        }}
                        key={`${icon}-w-key:${Math.random()}`}
                        className="icon"
                        id={`${icon}-w-key:${key}`}
                        width={null}
                        height={null}
                      />
                    </div>
                  );
                })}
              </ScrollContainer>
            </Box>
          </Box>
        </Grid>
      ))
      }
    </>
  );
};

export default Iconbar;
