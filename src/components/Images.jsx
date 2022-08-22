import React from "react";

const svgArray = import.meta.glob(
  "../assets/svg/*.svg"
); /* wrong highlighting*/

console.log(svgArray);

export default function Images() {
  const svgGallery = [];
  for (const path in svgArray) {
    svgArray[path]().then((mod) => {
      console.log(path, mod);
    });
  }

  return <div className="image--container">{svgGallery}</div>;
}
