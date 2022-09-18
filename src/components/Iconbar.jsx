import { Box, Button, Card, Grid, Typography } from "@mui/material";
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
              <img
                src="../public/svg/ux-icon_custom-icon.svg"
                alt=""
                className="iconBar--customIconBtn"
              />

              <ScrollContainer
                className={`scroll-container iconToolbarRow ${index}`}
                id="xDragToolbar"
                key={key + 2}
              >
                {Object.keys(index).map((key, i) => {
                  return (
                    <Box
                      sx={{
                        height: "100%",
                        // borderLeft: "1px solid",
                        width: "auto",
                      }}
                      key={i + 4}
                    >
                      <img
                        key={i + 3}
                        src={getSvgUrl(key)}
                        alt={key}
                        className="icon"
                        onClick={() => {
                          addImages({
                            // id: images.at(-1).id + 1,
                            id: `${key}`,
                            icon: getSvgUrl(key),
                            x: defaultPos.x,
                            y: defaultPos.y,
                          });
                        }}
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
