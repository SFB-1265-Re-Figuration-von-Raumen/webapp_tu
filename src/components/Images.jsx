import React from "react";
import IMAGE from "./IMAGE";

export default function Images() {
  return (
    <div className="image--container">
      <img src={IMAGE.t1} />
      <img src={IMAGE.t2} />
      <img src={IMAGE.t3} />
      <img src={IMAGE.t4} />
      <img src={IMAGE.t5} />
    </div>
  );
}
