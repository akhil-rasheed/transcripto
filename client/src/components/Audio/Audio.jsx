import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import React from "react";
import "./Audio.css";
export default function Audio() {
  const recorderControls = useAudioRecorder();
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");

    audio.src = url;
    audio.controls = true;
    //document.body.appendChild(audio);
    console.log(audio);
  };

  return (
    <div>
      <div className="container1">
        <div className="display">
          <div id="displayText">This is a sample text. </div>
          <div id="recordText">This is user speech text.</div>
        </div>
        <div className="record">
          <div className="recordComp">
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
            />
          </div>
          <div className="recordComp">
            <button onClick={recorderControls.stopRecording}>
              Stop recording
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
