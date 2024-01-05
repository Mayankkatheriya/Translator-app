import React, { useState } from "react";
import { selectOptions } from "./TranslateUtils";
import Languages from "./Languages";
import axios from "axios";

const Translator = () => {
  const [textInput, setTextInput] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [resultText, setResultText] = useState("");

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
      alert("Error occurred while translating");
    }
  };

  return (
    <div className="translator">
      <h1>Translator App</h1>
      <div className="tools">
        {/* User Input */}
        <div className="input-text">
          {/* DropDown for source languages */}
          <Languages
            id="source"
            languages={selectOptions}
            onChange={(e) => setSourceLang(e.target.value)}
            value={sourceLang}
          />
          <textarea
            id="text"
            cols="30"
            rows="10"
            value={textInput}
            placeholder="Enter Text"
            onChange={(e) => setTextInput(e.target.value)}
          ></textarea>
        </div>

        {/* Result */}
        <div className="result-text">
          {/* DropDown for Target languages */}
          <Languages
            id="target"
            languages={selectOptions}
            onChange={(e) => setTargetLang(e.target.value)}
            value={targetLang}
          />
          <textarea
            id="text"
            cols="30"
            rows="10"
            placeholder="Translated Text"
            value={resultText}
            readOnly
          ></textarea>
        </div>
      </div>
      {/* Translate button */}
      <button onClick={handleTranslate}>Translate</button>
    </div>
  );
};

export default Translator;
