import React, { useRef, useState } from 'react';
import * as fp from 'fingerpose'
import { drawHand } from './canvasDraw'
import { webcam } from '@tensorflow/tfjs-data';

import victory from '../victory.png'
import thumbs_up from '../thumbs_up.png'

export const DetectHand = async (net, ref_canvas, ref_webcam) => {



    // console.log(ref_webcam)
    

    if (typeof ref_webcam.current !== "undefined" &&
        ref_webcam.current !== null &&
        ref_webcam.current.video.readyState === 4) {
        const video = ref_webcam.current.video;
        const videoWidth = ref_webcam.current.video.videoWidth;
        const videoHeight = ref_webcam.current.video.videoHeight;


        ref_webcam.current.video.width = videoWidth;
        ref_webcam.current.video.height = videoHeight;


        ref_canvas.current.width = videoWidth;
        ref_canvas.current.height = videoHeight


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
            const gesture = await GE.estimate(hand[0].landmarks, 8);



            //retrieves gesture coressponding to highest confidence score
            if(gesture.gestures !== undefined && gesture.gestures.length > 0 ){

                return gesture;
                // const confidenceScore = gesture.gestures.map((accuracy) => accuracy.confidence);
                // console.log(Math.max.apply(null, confidenceScore))
                // //returning index 
                // const highestScore = confidenceScore.indexOf(Math.max.apply(null, confidenceScore));
                // console.log(gesture.gestures[highestScore].name)
                // // setGesture(gesture.gestures[highestScore].name);
                // // console.log(currentGesture);
            }

        }


        const canvas = ref_canvas.current.getContext("2d");
        drawHand(hand, canvas)
    }

}