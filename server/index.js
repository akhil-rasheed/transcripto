import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import speech from "@google-cloud/speech";
import fs from "fs";

const app = express();
//Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("combined"));

app.post("/audio-to-base64", (req, res) => {
  const { description, audio } = req.body;
  const base64 = audio.toString("base64");

  res.send(base64);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function detectSpeech(base64audio) {
  const client = new speech.SpeechClient();
  const encoding = "LINEAR16";
  const sampleRateHertz = 44100;
  const languageCode = "pt-PT";
  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    enableWordTimeOffsets: true,
    enablePhonemeTimeOffsets: true,
    enableWordConfidence: true,
  };
  const audio = {
    content: base64audio,
  };

  const request = {
    config: config,
    audio: audio,
  };
  const [operation] = await client.longRunningRecognize(request);

  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();

  for (word in response.results[0].alternatives[0].words) {
    console.log(word);
  }
}
