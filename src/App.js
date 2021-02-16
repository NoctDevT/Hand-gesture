import './App.css';
import React, { useRef, useState } from 'react';
import * as tensorflow from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam"
import { detectHand } from './components/getGesture'

//Import FP
import victory from './victory.png'
import thumbs_up from './thumbs_up.png'


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null)

  const runHandPose = async () => {
    const net = await handpose.load()
    console.log('Model Loaded');

    if (webcamRef) {
      setInterval(() => {
        detectHand(net, canvasRef, webcamRef)
      }, 100)
    };
  }
  runHandPose();

  return (
    <div className="App">
      <header className="App-header">





        <Webcam ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            zIndex: "9",
            width: "640",
            height: "480"
          }} />

        <canvas ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: "0",
            right: "0",
            textAlign: "center",
            zIndex: "9",
            width: "640",
            height: "480"
          }}
        />
      </header>
    </div>
  );
}

export default App;
