import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import React, { useState } from "react";
import "./Audio.css";
export default function Audio() {
  const recorderControls = useAudioRecorder();
  const [curText, setCurText] = useState(
    "Muitas gracias afición, esto es para vosotros "
  );
  const [accuracy, setAccuracy] = useState("");
  const [base64Audio, setBase64Audio] = useState("");
  function blobToBase64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });
  }
  async function fetchAccuracy() {
    // const res = await
    // console.log(res);
    // return res;
  }

  //   useEffect(() => {});
  const addAudioElement = async (blob) => {
    blobToBase64(blob).then((base64) => {
      setBase64Audio(base64);
      axios
        .post("http://localhost:8010/audio-to-base64", {
          description: curText,
          audio: base64,
        })
        .then((res) => {
          console.log(res.data);
        });
    });
    //   const measuredAccuracy = res.data;
    //   setAccuracy(measuredAccuracy);

    // const audio = document.createElement("audio");

    // audio.src = url;
    // audio.controls = true;
    // //document.body.appendChild(audio);
    // console.log(audio);
  };

  return (
    <div>
      <div className="container1 bg-white">
        <div className="display bg-white text-white flex flex-col p-8 h-1/2 m-4 rounded-md">
          <div className=" h-full bg-black/50 flex flex-col justify-center my-2  rounded-lg ">
            {curText}{" "}
          </div>
          <div className=" h-full bg-black/50 flex flex-col justify-center my-2  rounded-lg">
            This is user speech text.
          </div>
          <div>{accuracy}</div>
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
