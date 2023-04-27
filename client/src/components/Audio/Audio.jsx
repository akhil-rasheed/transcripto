import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "react-countup";

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
  const [accuracy, setAccuracy] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (curIndex > words.length - 1) {
      setcurIndex(0);
    }
  }, [curIndex]);

  useEffect(() => {
    setPreviousScore(currentScore);
    const newScore = currentScore + accuracy;
    setCurrentScore(newScore);
  }, [accuracy]);

  function blobToBase64(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(blob);
    });
  }

  const addAudioElement = async (blob) => {
    blobToBase64(blob).then((base64) => {
      toast.promise(
        axios
          .post("http://localhost:8010/audio-to-base64", {
            description: words[curIndex],
            audio: base64,
          })
          .then((res) => {
            console.log(res.data);
            setTranscriptResult(res.data.taggedList);
            setAccuracy(res.data.confidence * 100);

            setTranscription(res.data.transcription);
            setShowResult(true);
          }),
        {
          pending: "Evaluating",

          error: "error!",
        }
      );
    });

    //   const measuredAccuracy = res.data;
    //   setAccuracy(measuredAccuracy);

    // const audio = document.createElement("audio");

    // audio.src = url;
    // audio.controls = true;
    // //document.body.appendChild(audio);
    // console.log(audio);
  };
  function playAudio() {
    const audio = document.getElementById("my-audio");
    console.log(
      `http://localhost:8010/${words[curIndex]
        .toLowerCase()
        .replaceAll(/\s/g, "")
        .replace(/\?/g, "")}.mp3`
    );
    document.getElementById("my-audio").src = `http://localhost:8010/${words[
      curIndex
    ]
      .toLowerCase()
      .replaceAll(/\s/g, "")
      .replace(/\?/g, "")}.mp3`;
    audio.play();
  }

  const notify = () =>
    toast.success("🦄 Wow so easy!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return (
    <div>
      <div className="display  text-white flex flex-col p-4 lg:p-8 h-1/2 lg:m-4 rounded-md">
        <div className="h-full bg-black/75  text-2xl lg:text-5xl flex flex-row justify-center items-center my-2  rounded-lg">
          <button
            onClick={playAudio}
            className="h-10 w-10 text-sm m-8 p-2 bg-purple-400 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
            >
              <title>volume-high</title>
              <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
            </svg>
          </button>
          {words[curIndex]}{" "}
        </div>
        <div className="h-full bg-black/75 text-5xl flex flex-row justify-center items-center my-2  rounded-lg">
          <div className="recordComp p-8">
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
              color="purple"
            />
          </div>
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
      <div className="record">
        <ToastContainer />
        <audio id="my-audio">
          <source src="" type="audio/mpeg" />
        </audio>
      </div>
      <div className="bg-black text-white p-8 flex flex-row w-full ">
        <div className="flex flex-row w-1/2 items-center justify-center">
          <div className="text-lg flex flex-row items-center justify-center ">
            Accuracy:
            <span className="text-green-400 text-5xl px-8">
              {accuracy.toString().slice(0, 2)}%
            </span>
          </div>
          <div className="text-lg flex flex-row items-center justify-center ">
            Score:
            <span className="text-green-400 text-5xl px-8">
              <CountUp
                start={Math.floor(previousScore)}
                end={Math.floor(currentScore)}
                duration={2.75}
                onEnd={() => console.log("Ended! 👏")}
                onStart={() => console.log("Started! 💨")}
              ></CountUp>
            </span>
          </div>
        </div>

        <button
          className="w-1/2 h-20 bg-purple-400"
          onClick={() => {
            setcurIndex(curIndex + 1);
            setTranscriptResult([]);
            setShowResult(false);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
