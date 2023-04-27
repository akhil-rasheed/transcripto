import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import TextToSpeech from "google-cloud-text-to-speech";

import "./Audio.css";

const words = [
  "Eu estou procurando por",
  "Você tem?",
  "Gostaria de experimentar?",
  "Onde é que estão os balneários?",
  "Onde tem uma loja de roupas femininas?",
  "Pode-se pagar com cartão de crédito",
];

export default function Audio() {
  const recorderControls = useAudioRecorder();
  const [curIndex, setcurIndex] = useState(0);
  const [transcriptResult, setTranscriptResult] = useState([]);
  const [transcription, setTranscription] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (curIndex > words.length - 1) {
      setcurIndex(0);
    }
  }, [curIndex]);
  function blobToBase64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });
  }

  const addAudioElement = async (blob) => {
    blobToBase64(blob).then((base64) => {
      axios
        .post("http://localhost:8010/audio-to-base64", {
          description: words[curIndex],
          audio: base64,
        })
        .then((res) => {
          console.log(res.data);
          setTranscriptResult(res.data.taggedList);
          setAccuracy(res.data.accuracy);
          setTranscription(res.data.transcription);
          setShowResult(true);
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
      <div className="container1 bg-white h-screen">
        <div className="display bg-white     text-white flex flex-col p-8 h-1/2 m-4 rounded-md">
          <div className="h-full bg-black/50 text-5xl flex flex-col justify-center my-2  rounded-lg">
            {words[curIndex]}{" "}
          </div>
          <div className="h-full bg-black/50 text-5xl flex flex-col justify-center my-2  rounded-lg">
            <div>
              {showResult
                ? words[curIndex]
                    .toLowerCase()
                    .split(" ")
                    .map((word) => {
                      let classname = "";
                      const record = transcriptResult.find(
                        (xWord) => xWord.matchedWord === word
                      );
                      if (record && record.tag === "Correct") {
                        classname = "correct";
                      } else if (record && record.tag === "Partial") {
                        classname = "partial";
                      } else {
                        classname = "wrong";
                      }
                      return (
                        <span key={word.matchedWord} className={classname}>
                          {word}
                        </span>
                      );
                    })
                : null}
            </div>
          </div>
        </div>
        <div>
          <p>
            {transcription} - {accuracy}
          </p>
          <button
            onClick={() => {
              setcurIndex(curIndex + 1);
              setTranscriptResult([]);
              setShowResult(false);
            }}
          >
            Next
          </button>
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
          {/* <TextToSpeech
            text={words[curIndex]}
            voiceList={[
              { name: "English (US) Male", value: "en-US-Wavenet-A" },
              { name: "English (US) Female", value: "en-US-Wavenet-E" },
            ]}
            defaultVoice="en-US-Wavenet-E"
            secretKey="AIzaSyCqQICOuuRMjN6wxv7SCWG6N2prMmd9GpY"
            showAudioControl={true}
            showSettings={false}
            type="Page"
          ></TextToSpeech> */}
        </div>
      </div>
    </div>
  );
}
