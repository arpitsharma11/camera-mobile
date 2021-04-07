/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

const CONSTRAINTS = {
	BASIC: {audio:false,  video: true},
    FRONT_CAMERA: { audio: false, video: { facingMode: { exact: 'user' } } },
  	BACK_CAMERA: {
		audio: false,
		video: {
		facingMode: { exact: 'environment' },
		width: { min: 640, ideal: 1920, max: 1920 },
		height: { min: 400, ideal: 1080 },
		},
	},
}
let initialLoadDone = false;
let frontCamera = true;
let cameraStream = null;

export function useCameraStream(cameraStatus, backCamera, onChange) {

	const [mediaStream, setMediaStream] = useState(null);
	// const [frontCamera, setFrontCamera] = useState(backCamera ? false : true);
	const [loading, setLoading] = useState(true);
	const [streamAvailable, setStreamAvailable] = useState(false);
	const [switchingCamera, setSwitchingCamera] = useState(false);
	const [firstCameraStream, setFirstCameraStream] = useState(null);
	const [backCameraStream, setBackCameraStream] = useState(null);

	const videoRef = useRef();
	const testVideoRef = useRef();

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
			videoRef.current.hidden = true;
			const stream = await openMediaDevices(frontCamera ? CONSTRAINTS.FRONT_CAMERA : CONSTRAINTS.BACK_CAMERA);
			console.log('Got MediaStream:', stream);
			initialLoadDone = true;
			// if(frontCamera){
			// 	setFirstCameraStream(stream);
			// }else{
			// 	setBackCameraStream(stream);
			// }
			// setMediaStream(stream);
			cameraStream = stream;
			videoRef.current.srcObject = cameraStream;
			// videoRef.current.hidden = false;
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
			setSwitchingCamera(true);
			onChange();
			// const tracks = mediaStream.getTracks();
			// videoRef.current.pause();
			// testVideoRef.current.hidden = false;
			// videoRef.current.hidden = true;
			// tracks.forEach(track => track.stop());
			videoRef.current.hidden = true;
			
			const stream = await openMediaDevices(frontCamera ? CONSTRAINTS.FRONT_CAMERA : CONSTRAINTS.BACK_CAMERA);

			cameraStream = stream;
			videoRef.current.srcObject = cameraStream;
			// videoRef.current.hidden = false;
			// videoRef.current.play();
			// testVideoRef.current.hidden = true;
			// videoRef.current.hidden = false;
			// if(frontCamera){
			// 	setFirstCameraStream(stream);
			// 	setBackCameraStream(null);
			// }else{
			// 	setBackCameraStream(stream);
			// }
		} catch(error) {
			console.log(error);
		}
	}

	const toggleCamera = () => {
		frontCamera = !frontCamera;
		console.log('frontCamera', frontCamera);
		updateMediaDevices();
	}
	
	useEffect(() => {
		if(cameraStatus){
			init();
		} else {
			closeMediaDevices()
		}
	}, [cameraStatus]);

	// useEffect(() => {
	// 	if(mediaStream && videoRef && videoRef.current){
	// 		videoRef.current.srcObject = mediaStream;
	// 		// testVideoRef.current.srcObject = mediaStream;
	// 		setStreamAvailable(true);
	// 	}
	// 	if(!mediaStream){
	// 		setStreamAvailable(false);
	// 	}

	// 	if(mediaStream && switchingCamera){
	// 		setSwitchingCamera(false);
	// 	}
	// }, [mediaStream, videoRef]);

	// useEffect(() => {
	// 	if(firstCameraStream && !backCameraStream){
	// 		console.log('go to front stream');
	// 		videoRef.current.srcObject = firstCameraStream;
	// 	}

	// 	if(!firstCameraStream && backCameraStream){
	// 		console.log('go to back stream');
	// 		videoRef.current.srcObject = backCameraStream;
	// 	}

	// 	console.log('')
	// }, [firstCameraStream, backCameraStream])

	useEffect(() => {
		console.log('streamAvailable', streamAvailable);
	}, [streamAvailable]);

	useEffect(() => {
		if(initialLoadDone){
			updateMediaDevices()
		}
	}, [frontCamera]);
	
	return { toggleCamera, videoRef, loading, streamAvailable, switchingCamera, testVideoRef, backCameraStream, firstCameraStream };
}