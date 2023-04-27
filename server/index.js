import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import speech from "@google-cloud/speech";
import fs from "fs";
import textToSpeech from "@google-cloud/text-to-speech";

import util from "util";
// Creates a client

const app = express();
//Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("combined"));
app.use(express.static("public"));

app.post("/get-audio", (req, res) => {
  const text = req.body.text;
  ssmlToAudio(text);
});

app.post("/audio-to-base64", (req, res) => {
  const { description, audio } = req.body;
  detectSpeech(audio).then(
    ({ transcription, confidence, detectedWordList }) => {
      const taggedList = analyseSpeech(description, detectedWordList);
      console.log(transcription, confidence, taggedList);
      res.send({ transcription, confidence, taggedList });
    }
  );
});

const PORT = process.env.PORT || 8010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function detectSpeech(base64audio) {
  const client = new speech.SpeechClient();
  const encoding = "WEBM_OPUS";
  const sampleRateHertz = 48000;
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
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");

  const detectedWordList = response.results[0].alternatives[0].words.map(
    (xWord) => [xWord.word.toLowerCase(), xWord.confidence]
  );
  const confidence = response.results[0].alternatives[0].confidence;

  return { transcription, confidence, detectedWordList };
}

function analyseSpeech(phrase, wordList) {
  const phraseArray = phrase.toLowerCase().split(" ");
  console.log(phraseArray, wordList);
  const filteredWordList = wordList.filter((word) => {
    return phraseArray.includes(word[0]);
  });
  const taggedWordList = filteredWordList.map((word) => {
    let tag = "";
    if (word[1] > 0.75) tag = "Correct";
    else if (word[1] > 0.5) tag = "Partial";
    return {
      matchedWord: word[0],
      tag: tag,
    };
  });
  return taggedWordList;
}

async function ssmlToAudio(audText) {
  const client = new textToSpeech.TextToSpeechClient();

  const request = {
    input: { text: audText },
    voice: { languageCode: "pt-PT", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "MP3" },
  };
  console.log(request.input);

  // Performs the Text-to-Speech request
  const [response] = await client.synthesizeSpeech(request);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(
    `./public/${audText
      .toLowerCase()
      .replaceAll(/\s/g, "")
      .replace(/\?/g, "")}.mp3`,
    response.audioContent,
    "binary"
  );
  // Write the binary audio content to a local file
}
