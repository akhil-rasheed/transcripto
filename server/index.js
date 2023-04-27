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
  detectSpeech(audio).then((result) => {
    res.send(result);
  });
});

const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function detectSpeech(base64audio) {
  const client = new speech.SpeechClient();
  const encoding = "WEBM_OPUS";
  const sampleRateHertz = 48000;
  const languageCode = "en-US";
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
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  const confidence = response.results[0].alternatives[0].confidence;
  console.log(transcription);
  return { transcription, confidence };
}
