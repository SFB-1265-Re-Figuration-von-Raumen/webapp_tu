import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import * as aktis from "../assets/svg/categories/aktis/svgr_output";
// import AddIconButton from "./ui/AddIconButton";

// import {
//   AktiBusfahren,
//   AktiChattenn,
//   AktiFahrradfahren,
//   AktiLesen,
// } from "../assets/svg/categories/aktis/svgr_output/index";
// // console.log(aktis);
// const aktis = [
//   { name: "busfahren", icon: <AktiBusfahren /> },
//   { name: "chatten", icon: <AktiChattenn /> },
//   { name: "fahrradfahren", icon: <AktiFahrradfahren /> },
//   { name: "lesen", icon: <AktiLesen /> },
// ];

// const svgArray = [aktis, orte, personen, atmos];
const categories = ["AKTIVITÄTEN", "ORTE", "PERSONEN", "ATMOSPHÄREN"];
// const addIcon = import.meta.glob("")

function getSvgUrl(name) {
  return new URL(`../svg/${name}`, import.meta.url).href;
}
const RenderedIcon = ({ akti }) => {
  return <>{akti}</>;
};

const Iconbar = ({ images, addImages, percentWidth, theme }) => {
  const defaultPos = {
    x: percentWidth / 2,
    y: window.innerHeight / 2,
  };
  const toggleClick = (icon, name) => {
    addImages({
      // id: images.at(-1).id + 1,
      id: `icon_${name}`,
      icon: icon,
      x: defaultPos.x,
      y: defaultPos.y,
    });
  };
  console.log(images);

  return (
    <>
      {Object.keys(aktis).map((akti, key) => {
        const Component = aktis[akti];
        return (
          <Component
            onClick={(e) => {

console.log(e.target);

            }}
            key={key}
          />
        );
      })}
      {/* {aktis.map(({ name, icon }) => {
        return React.cloneElement(icon, {
          key: `${name}`,
          onClick: (e) => {
            addImages(icon, name);
          },
        });
      })} */}
      {/* {iconElements.map(({ name, icon }) => {
        return React.cloneElement(icon, {
          key: `icon-${name}`,
          onClick: () => {
            handleIconClick(name);
          },
        });
      })} */}
    </>

    // <>
    //   {svgArray.map((index, key) => (
    //     <Grid key={key * 0.77} item height>
    //       <Box
    //         key={key}
    //         sx={{
    //           // display: "flex",
    //           // flexDirection: "ro w",
    //           borderTop: "1px solid",
    //           borderColor: "primary.main",
    //           // padding: "0.25rem",
    //           height: "100%",
    //           display: "flex",
    //           flexDirection: "column",
    //           // backgroundImage: "linear-gradient(to left, #000000, #ffffff)",
    //         }}
    //         className="iconBar__outer"
    //       >
    //         <Typography color="primary" fontWeight="bold" key={key + 1} p>
    //           {categories[key]}
    //         </Typography>
    //         <Box
    //           key={key + 3}
    //           sx={{
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             // borderLeft: "1px solid",
    //             overflowX: "hidden",
    //             height: "100%",
    //           }}
    //         >
    //           <AddIconButton theme={theme} />
    //           <ScrollContainer
    //             className={`scroll-container iconToolbarRow ${index}`}
    //             id="xDragToolbar"
    //             key={key + 2}
    //           >
    //             {Object.keys(index).map((key, i) => {
    //               {/* { console.log(`hello ${key}`) } */ }
    //               return (
    //                 <Box
    //                   sx={{
    //                     height: "100%",
    //                     width: "auto",
    //                   }}
    //                   key={i + 4}
    //                 >
    //                   <img
    //                     key={i + 3}
    //                     src={getSvgUrl(key)}
    //                     alt={key}
    //                     className="icon"
    //                     style={{
    //                       border: `1px solid ${theme.palette.primary.dark}`,
    //                       backgroundColor: theme.palette.primary.light,
    //                     }}
    //                     onClick={() => {
    //                       addImages({
    //                         // id: images.at(-1).id + 1,
    //                         id: `${key}`,
    //                         icon: getSvgUrl(key),
    //                         x: defaultPos.x,
    //                         y: defaultPos.y,
    //                       });
    //                     }}
    //                   />
    //                 </Box>
    //               );
    //             })}
    //           </ScrollContainer>
    //         </Box>
    //       </Box>
    //     </Grid>
    //   ))
    //   }
    // </>
  );
};

export default Iconbar;
