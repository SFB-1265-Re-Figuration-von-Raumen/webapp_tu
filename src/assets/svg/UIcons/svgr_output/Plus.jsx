import * as React from "react";

const SvgPlus = (props) => (
  <svg
    id="plus_svg__uuid-7b1cd523-cbff-497b-9016-1a39b5bb6275"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 68.67 69.52"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <clipPath id="plus_svg__clip-path">
        <path className="plus_svg__cls-1" d="M10.2 8.77h48.19v49.75H10.2z" />
      </clipPath>
      <style>
        {
          ".plus_svg__cls-1,.plus_svg__cls-3{fill:none}.plus_svg__cls-3{stroke:#000;stroke-width:.9px}"
        }
      </style>
    </defs>
    <path
      className="plus_svg__cls-1"
      d="M12.63 19.5c-1.09.88-2 3.22-2 5.22V50.2a7.88 7.88 0 0 0 7.88 7.88H44a7.86 7.86 0 0 0 5.87-2.63"
      style={{
        clipPath: "url(#plus_svg__clip-path)",
      }}
    />
    <path
      className="plus_svg__cls-3"
      d="M34.33 22.12v25.27M46.94 34.76H21.65"
    />
  </svg>
);

export default SvgPlus;
