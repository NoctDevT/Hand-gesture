import './App.css';
import React, { useRef, useState, useEffect} from 'react';
import * as tensorflow from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam"
import { DetectHand } from './components/getGesture'

//Import FP
import victory from './victory.png'
import thumbs_up from './thumbs_up.png'





function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentGesture, setGesture] = useState(null);
  const image = {thumbs_up: thumbs_up, victory: victory};



  runHandPose(webcamRef, canvasRef);


  const styling = {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: "0",
    right: "0",
    textAlign: "center",
    zIndex: "9",
    width: "640",
    height: "480"
  }


  return (
    <div className="App">
      <header className="App-header">

        <Webcam ref={webcamRef}
          style={styling} />

        <canvas ref={canvasRef}
          style={styling}
        />
      </header>
    </div>
  );
}


const runHandPose = async (webcamRef, canvasRef) => {
  const net = await handpose.load();
  console.log('Model Loaded');
  if (webcamRef) {
    setInterval(() => {
       this.x = DetectHand(net, canvasRef, webcamRef)
    }, 100)
  };
}

export default App;
