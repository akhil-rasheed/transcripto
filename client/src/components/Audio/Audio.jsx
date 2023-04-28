import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";

import { app, auth } from "../../firebase";
import { database } from "../../firebase";
import { doc, getDoc, setDoc, increment, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountUp from "react-countup";

import "./Audio.css";
import { AuthContext } from "../../Context/AuthContext";
import { async } from "@firebase/util";

const words = [
  "Bom dia",
  "Boa tarde",
  "Boa noite",
  "Até breve!",
  "Que tal amanhã?",
  "Por favor",
  "Com licença",
  "De nada",
  "Eu estou procurando por",
  "Você tem?",
  "Gostaria de experimentar?",
  "Onde é que estão os balneários?",
  "Onde tem uma loja de roupas femininas?",
  "Pode-se pagar com cartão de crédito",
  "Como eu chego ao",
  "Qual a distância até",
  "Quanto custa?",
  "Eu gostaria de outro quarto",
];

export default function Audio() {
  const recorderControls = useAudioRecorder();
  const [curIndex, setcurIndex] = useState(0);
  const [transcriptResult, setTranscriptResult] = useState([]);
  const [transcription, setTranscription] = useState("");
  const [accuracy, setAccuracy] = useState({ value: 0 });
  const [currentScore, setCurrentScore] = useState(0);
  const [previousScore, setPreviousScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const { user, name } = useContext(AuthContext);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (curIndex > words.length - 1) {
      setcurIndex(0);
      submit();
    }
    axios.post("http://localhost:8010/get-audio", { text: words[curIndex] });
  }, [curIndex]);

  useEffect(() => {
    setPreviousScore(currentScore);
    const newScore = currentScore + accuracy.value;
    setCurrentScore(newScore);
  }, [accuracy]);

  function submit() {
    const washingtonRef = doc(database, "users", user.email);

    // Atomically increment the population of the city by 50.
    updateDoc(washingtonRef, {
      count: increment(1),
      score: increment(currentScore / 18),
    });
    // let count1;
    // let score1;
    // getDoc(doc(database, "users", user.email)).then((docSnap) => {
    //   if (docSnap.exists()) {
    //     count1 = docSnap.data().count;
    //     score1 = docSnap.data().score;

    //     console.log("Document data:", docSnap.data());
    //   } else {
    //     console.log("No such document!");
    //   }
    // });

    // setDoc(doc(database, "users", user.email), {
    //   score: score1 + currentScore / 18,
    //   count: count1 + 1,
    // })
    //   .then(() => {
    //     console.log("Success");
    //   })
    //   .err(console.log());
    setFinished(true);
  }

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
            setAccuracy({ value: res.data.confidence * 100 });

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
      <div className="display  text-white flex flex-col p-4 lg:p-8 lg:m-4 rounded-md">
        <div className="h-full bg-black/75  text-2xl lg:text-5xl flex flex-row lg:justify-center items-center my-2  rounded-lg">
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
        <div className="h-full bg-black/75 text-2xl lg:text-5xl flex flex-row lg:justify-center items-center my-2  rounded-lg">
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
                      (xWord) => xWord.matchedWord === word.replace(/\?/g, "")
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
      {!finished && (
        <div className="bg-black fixed bottom-0 text-white p-8 flex flex-row w-full ">
          <div className="flex flex-col lg:flex-row w-1/2 items-center justify-center">
            <div className="text-lg flex flex-row items-center justify-center ">
              Accuracy:
              <span className="text-green-400 lg:text-5xl px-8">
                {accuracy.value.toString().slice(0, 2)}%
              </span>
            </div>
            <div className="text-lg flex flex-row items-center justify-center ">
              Score:
              <span className="text-green-400 lg:text-5xl px-8">
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
      )}
      {finished && (
        <div className="bg-black fixed bottom-0 text-white p-8  w-full ">
          <div className="flex flex-col h-full">
            <div className="flex flex-col mb-6 lg:flex-row w-full items-center justify-center">
              <div className="text-lg flex flex-row items-center justify-center ">
                <span className="text-purple-400 lg:text-3xl px-4">
                  Congratulations! 🎊
                </span>
              </div>
              <div className="text-lg flex flex-row  items-center justify-center ">
                <span className="text-purple-400 lg:text-3xl px-4">
                  Your accuracy was {Math.floor(currentScore / 18)}%
                </span>
              </div>
            </div>
            <div>
              <button className="bg-purple-400 text-3xl p-4 rounded-md">
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
