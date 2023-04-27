import { useState } from "react";
import "./App.css";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

function App() {
    const recorderControls = useAudioRecorder();
    const [url, setUrl] = useState("");
    const addAudioElement = (blob) => {
        const newurl = URL.createObjectURL(blob);
        setUrl(newurl);
        // const audio = document.createElement("audio");
        // audio.src = newurl;
        // audio.controls = true;
        // document.body.appendChild(audio);
    };

    const play = () => {
        const audio = new Audio(url);
        audio.play();
    };

    return (
        <div>
            <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob)}
                recorderControls={recorderControls}
            />
            <button onClick={recorderControls.stopRecording}>
                Stop recording
            </button>
            <button onClick={play}>play recording</button>
        </div>
    );
}

export default App;
