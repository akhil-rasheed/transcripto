import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import React, { useState } from "react";
import "./Audio.css";
export default function Audio() {
    const recorderControls = useAudioRecorder();
    const [curText, setCurText] = useState("Sample text");
    const [accuracy, setAccuracy] = useState("");
    const addAudioElement = async (blob) => {
        const url = URL.createObjectURL(blob);
        try {
            const res = await axios.post(
                "http://localhost:8080/audio-to-base64",
                {
                    description: curText,
                    audio: blob,
                }
            );
            const measuredAccuracy = res.data;
            setAccuracy(measuredAccuracy);
        } catch (err) {
            console.log(err);
        }

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
                    <div id="displayText">{curText} </div>
                    <div id="recordText">This is user speech text.</div>
                    <div>{accuracy}</div>
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
