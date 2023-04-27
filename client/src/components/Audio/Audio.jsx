import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Audio.css";

const words = [
    "Olá",
    "Bom Dia",
    "Boa Tarde",
    "Boa Noite",
    "Prazer",
    "Por favor",
    "De nada",
    "Obrigada",
];

export default function Audio() {
    const recorderControls = useAudioRecorder();
    const [curIndex, setcurIndex] = useState(0);
    const [transcriptResult, setTranscriptResult] = useState([]);
    const [base64Audio, setBase64Audio] = useState("");

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
                    description: words[curIndex],
                    audio: base64,
                })
                .then((res) => {
                    console.log(res.data);
                    setTranscriptResult(JSON.parse(res.data));
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
            <div className="container1">
                <div className="display">
                    <div id="displayText">{words[curIndex]} </div>
                    <div id="recordText">
                        <ul>
                            {transcriptResult.length === 0
                                ? ""
                                : transcriptResult.map((wordRecord) => {
                                      return (
                                          <li>
                                              {wordRecord.matchedWord} -{" "}
                                              {wordRecord.tag}
                                          </li>
                                      );
                                  })}
                        </ul>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => {
                            setcurIndex(curIndex + 1);
                        }}
                    >
                        Next
                    </button>
                </div>
                <div className="record">
                    <div className="recordComp">
                        <AudioRecorder
                            onRecordingComplete={(blob) =>
                                addAudioElement(blob)
                            }
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
