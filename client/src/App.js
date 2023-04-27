import logo from './logo.svg';
import './App.css';

function App() {
  return (
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
    )
  );
}

export default App;
