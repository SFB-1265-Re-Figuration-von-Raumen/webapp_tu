import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

const aktis = import.meta.glob("../assets/svg/categories/aktis/*.svg", {
  eager: true,
});
const atmos = import.meta.glob("../assets/svg/categories/atmos/*.svg", {
  eager: true,
});
const orte = import.meta.glob("../assets/svg/categories/orte/*.svg", {
  eager: true,
});
const personen = import.meta.glob("../assets/svg/categories/personen/*.svg", {
  eager: true,
}); /* */

const svgArray = [aktis, orte, personen, atmos];
const categories = ["AKTIVITÄTEN", "ORTE", "PERSONEN", "ATMOSPHÄREN"];
// const addIcon = import.meta.glob("")

function getSvgUrl(name) {
  return new URL(`../svg/${name}`, import.meta.url).href;
}

const Iconbar = ({ images, addImages, percentWidth }) => {
  const defaultPos = {
    x: percentWidth / 2,
    y: window.innerHeight / 2,
  };

  return (
    <>
      {svgArray.map((index, key) => (
        <Box sx={{
          // display: "flex",
          // flexDirection: "row",
          borderTop: "1px solid",
          borderColor: "primary.main",
          padding: "0.25rem",
        }}>
          <Typography color="primary" fontWeight="bold">
            {categories[key]}
          </Typography>
          <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            overflowX: "hidden",
          }}>
            <Box>
              <Typography>
                {/* <Button variant="outlined"> */}
                  <img src="../public/svg/ux-icon_custom-icon.svg" alt=""/>
                {/* </Button> */}
              </Typography>
            </Box>
            <ScrollContainer
              className={`scroll-container iconToolbarRow ${index}`}
              id="xDragToolbar"
              key={key}
            >
              {Object.keys(index).map((key, i) => {
                return (
                  <img
                    key={i}
                    src={getSvgUrl(key)}
                    alt={key}
                    className="icon"
                    onClick={() => {
                      addImages({
                        id: images.at(-1).id + 1,
                        icon: getSvgUrl(key),
                        x: defaultPos.x,
                        y: defaultPos.y,
                      });
                    }} />
                );
              })}
            </ScrollContainer>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Iconbar;
