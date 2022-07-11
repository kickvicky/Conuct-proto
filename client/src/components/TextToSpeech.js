import React, { useState, useEffect } from 'react'
import './index.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'



const TextToSpeech = () => {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      // mic.onend = () => {
      //   console.log('continue..')
      //   mic.start()
      // }
    } else {
      mic.stop()
      // mic.onend = () => {
      //   console.log('Stopped Mic on Click')
      // }
    }
    mic.onstart = () => {
      // console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob(savedNotes, { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "MinOfMeet.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <>
      <div className="container">
        <div className="box">
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <br />
          <p>{note}</p>
        </div>
        <div className="box" id='notes'>
          <h2>Notes 📝</h2>
          {/* <input id="myInput" /> */}
          <button onClick={downloadTxtFile}>Download Notes</button>
          <br />
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default TextToSpeech
