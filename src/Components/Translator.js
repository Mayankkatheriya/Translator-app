import React, { useState } from "react";
import { selectOptions } from "./TranslateUtils";
import Languages from "./Languages";
import axios from "axios";
// import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const Translator = () => {
  const [textInput, setTextInput] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [resultText, setResultText] = useState("");
  // const { transcript,  browserSupportsSpeechRecognition } = useSpeechRecognition();
  // const startListening = () => {
  //   SpeechRecognition.startListening({ continuous: true, language: 'en : US' })
  //   setTextInput(transcript)
  // };

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  const handleTranslate = async () => {
    const url = "https://text-translator2.p.rapidapi.com/translate";
    const apiKey = "4c22b22ea5mshad8042ea161777ap1f82dcjsn3ca6fadbaa2d";
    const headers = {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      "content-type": "application/x-www-form-urlencoded",
    };
    const data = {
      source_language: sourceLang,
      target_language: targetLang,
      text: textInput,
    };

    try {
      let response = await axios.post(url, data, { headers });
      const result = response.data;
      if (result.status === "success") {
        let translatedText = result.data.translatedText;
        setResultText(translatedText);
      } else {
        alert("Error in translation!");
      }
    } catch (error) {
      console.log(error);
      alert("Error occurred while translating", error);
    }
  };

  return (
    <div className="translator">
      <h1>Translator App</h1>
      <div className="tools">
        {/* User Input */}

        <div className="input-text">
          <div className="action-btn">
            <button
              className="action"
              title="Start"
              //  onClick={startListening}
            >
              <i class="fa-solid fa-microphone-lines"></i>
            </button>
            <button
              className="action"
              title="Stop"
              // onClick={() => SpeechRecognition.stopListening()}
            >
              <i class="fa-solid fa-pause"></i>
            </button>
          </div>

          {/* DropDown for source languages */}
          <Languages
            id="source"
            languages={selectOptions}
            onChange={(e) => setSourceLang(e.target.value)}
            value={sourceLang}
          />
          <textarea
            id="text"
            value={textInput}
            placeholder="Enter Text Here..."
            onChange={(e) => setTextInput(e.target.value)}
          ></textarea>
        </div>

        {/* Result */}
        <div className="result-text">
          <div className="action-btn">
            <button
              className="action"
              title="Copy"
              onClick={() => navigator.clipboard.writeText(resultText)}
            >
              <i class="fa-solid fa-copy"></i>
            </button>
          </div>

          {/* DropDown for Target languages */}
          <Languages
            id="target"
            languages={selectOptions}
            onChange={(e) => setTargetLang(e.target.value)}
            value={targetLang}
          />
          <textarea
            id="text"
            placeholder="Translated Text"
            value={resultText}
            readOnly
          ></textarea>
        </div>
      </div>
      {/* Translate button */}
      <button className="tranlate-btn" onClick={handleTranslate}>
        Translate
      </button>
    </div>
  );
};

export default Translator;
