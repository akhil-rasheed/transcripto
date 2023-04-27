import React from "react";
import Navbar from "../components/Navbar/navbar";
import "react-circular-progressbar/dist/styles.css";
import Progress from "../components/Dash/progress";
import Board from "../components/Dash/Leaderboard/Board";
export default function Dashboard() {
  const percentage = 66;
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#e9d5ff",
          height: "90vh",
        }}
      >
        <Progress />
        <Board />
      </div>
    </>
  );
}
