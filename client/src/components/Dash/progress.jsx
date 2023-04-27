import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function Progress() {
  const percentage = 66;
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: 200,
          height: 200,
        }}
      >
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            rotation: 0.25,

            strokeLinecap: "butt",

            textSize: "20px",

            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 1.0,

            // Colors
            pathColor: `#4ade80`,
            textColor: "black",
            textSize: "10px",
            trailColor: "#dcfce7",
            backgroundColor: "#4ade80",
          })}
        />
        Your Accuracy
      </div>
    </>
  );
}
