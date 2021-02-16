import React, { useRef, useState } from 'react';
import * as fp from 'fingerpose'
import { drawHand } from './canvasDraw'

export const detectHand = async (net, canvasRef, webcamRef) => {

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