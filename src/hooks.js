/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

const CONSTRAINTS = {
	BASIC: {audio:false,  video: true},
	BACK_CAMERA: {audio:false,  video: { facingMode: { exact: "environment" }, width: { exact: 640 }, height: { exact: 480 } }},
	FRONT_CAMERA: {audio:false,  video: { facingMode: { exact: "user" }, width: { exact: 640 }, height: { exact: 480 } }}
}

let initialLoadDone = false;

export function useCameraStream(cameraStatus, backCamera) {

	const [mediaStream, setMediaStream] = useState(null);
	const [frontCamera, setFrontCamera] = useState(backCamera ? false : true);
	const [loading, setLoading] = useState(true);
	const [streamAvailable, setStreamAvailable] = useState(false);

	const videoRef = useRef();

	const openMediaDevices = async (constraints) => {
		setLoading(true);
    	const getUserMediaResult =  await navigator.mediaDevices.getUserMedia(constraints);
		setLoading(false);
		return getUserMediaResult;
	}

	const closeMediaDevices = () => {
		if(mediaStream){
			mediaStream.getTracks().forEach(track => track.stop())
			setMediaStream(null);
		}
	}

	const init = async () => {
		try {
			const stream = await openMediaDevices(frontCamera ? CONSTRAINTS.FRONT_CAMERA : CONSTRAINTS.BACK_CAMERA);
			console.log('Got MediaStream:', stream);
			initialLoadDone = true;
			setMediaStream(stream);
		} catch(error) {
			console.error('Error accessing media devices.', error);
			console.log('OverconstrainedError', error.name);
			if(error.name === 'OverconstrainedError'){
				const stream = await openMediaDevices(CONSTRAINTS.BASIC);
				setMediaStream(stream);
			}
		}
	}

	const updateMediaDevices = async () => {
		try {
			const tracks = mediaStream.getTracks();
			tracks.forEach(track => track.stop());
			setMediaStream(null);
			const stream = await openMediaDevices(frontCamera ? CONSTRAINTS.FRONT_CAMERA : CONSTRAINTS.BACK_CAMERA);
			setMediaStream(stream);
		} catch(error) {
			console.log(error);
		}
	}

	const toggleCamera = () => {
		setFrontCamera(!frontCamera);
	}
	
	useEffect(() => {
		if(cameraStatus){
			init();
		} else {
			closeMediaDevices()
		}
	}, [cameraStatus]);

	useEffect(() => {
		if(mediaStream && videoRef && videoRef.current){
			videoRef.current.srcObject = mediaStream;
			setStreamAvailable(true);
		}
		if(!mediaStream){
			setStreamAvailable(false);
		}
	}, [mediaStream, videoRef]);

	useEffect(() => {
		console.log('streamAvailable', streamAvailable);
	}, [streamAvailable]);

	useEffect(() => {
		if(initialLoadDone){
			updateMediaDevices()
		}
	}, [frontCamera]);
	
	return { toggleCamera, videoRef, loading, streamAvailable };
}