import { useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export default function Audio() {
  const recorderControls = useAudioRecorder();
  const [url, setUrl] = useState("");
  const addAudioElement = (blob) => {
    console.log("ENtered");

    const newurl = URL.createObjectURL(blob);
    setUrl(newurl);
    console.log(url);
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
      <button onClick={recorderControls.stopRecording}>Stop recording</button>
      <button onClick={play}>play recording</button>
    </div>
  );
}
