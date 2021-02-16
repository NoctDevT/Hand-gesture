import './App.css';
import logo from './logo.svg';
import React, { useRef, useState } from 'react';
import * as tensorflow from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose"
import Webcam from "react-webcam"
import { drawHand } from './utilities'

//Import FP
import * as fp from 'fingerpose'
import victory from './victory.png'
import thumbs_up from './thumbs_up.png'


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null)


  const runHandPose = async () => {
    const net = await handpose.load()
    console.log('Model Loaded');

    setInterval(() => {
      detectHand(net)
    }, 100)
  };

  const detectHand = async (net) => {

    if (typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;


      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;


      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight


      //Make detections

      const hand = await net.estimateHands(video);
      // console.log(hand);


      // Using fingerpose to identify gestures
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ])

        //Waiting for gestures to return and using a confidence score of 8 
        const gesture = await GE.estimate(hand[0].landmarks, 8)
        console.log(gesture);

      }


      const canvas = canvasRef.current.getContext("2d");
      drawHand(hand, canvas)
    }

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
