/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';

const width = window.innerWidth;


const CONSTRAINTS = {
	BASIC: {audio:false,  video: { aspectRatio: window.innerHeight / window.innerWidth } },
    FRONT_CAMERA: (deviceID) => {
		return { video: { deviceId: deviceID } }
	},
}
let initialLoadDone = false;
let frontCamera = true;
let cameraStream = null;

const createVideoTag = (stream) => {
	const cont = document.getElementById('testId');
	cont.innerHTML = '';
	const videoTag = document.createElement('video');
	videoTag.srcObject = stream;
	// videoTag.hidden = true;
	videoTag.width = width;
	videoTag.height= 600
	videoTag.id = 'player'
	videoTag.autoplay = true;
	videoTag.currentTime = 0;
	videoTag.controls = false;
	videoTag.muted = true;
	// videoTag.oncanplay = () => {
	// 	console.log('handleCanPlay');
	// 	videoTag.hidden = false;
	// 	videoTag.play();
	// 	cont.click();
	// };
	cont.appendChild(videoTag);
}

export function useCameraStream(cameraStatus, backCamera, onChange) {

	const [mediaStream, setMediaStream] = useState(null);
	// const [frontCamera, setFrontCamera] = useState(backCamera ? false : true);
	const [loading, setLoading] = useState(true);
	const [streamAvailable, setStreamAvailable] = useState(false);
	const [switchingCamera, setSwitchingCamera] = useState(false);
	const [firstCameraStream, setFirstCameraStream] = useState(null);
	const [backCameraStream, setBackCameraStream] = useState(null);
	const [ad, setAd] = useState([]);

	const videoRef = useRef();
	const testVideoRef = useRef();

	const openMediaDevices = async (constraints) => {
		console.log('opening camera', constraints);
    	const getUserMediaResult =  await navigator.mediaDevices.getUserMedia(constraints);
		return getUserMediaResult;
	}

	const closeMediaDevices = () => {
		if(mediaStream){
			mediaStream.getTracks().forEach(track => track.stop())
			setMediaStream(null);
		}
	}

	const init = async () => {
		const enumeratorPromise = await navigator.mediaDevices.enumerateDevices();
		console.log('enumeratorPromise', enumeratorPromise)
		const test = {};
		enumeratorPromise.forEach((device) => {
			if(device.label.includes("front")){
				test['front'] = device.deviceId;
			}else if(device.label.includes("back")){
				test['back'] = device.deviceId;
			}
		})
		console.log(test);
		setAd(test);
		
	}

	useEffect(async () => {
		if(ad){
			try {
				// videoRef.current.hidden = true;
				const stream = await openMediaDevices(CONSTRAINTS.FRONT_CAMERA(frontCamera ? ad['front'] : ad['back']));
				console.log('Got MediaStream:', stream);
				createVideoTag(stream);
				// initialLoadDone = true;
				// if(frontCamera){
				// 	setFirstCameraStream(stream);
				// }else{
				// 	setBackCameraStream(stream);
				// }
				// setMediaStream(stream);
				cameraStream = stream;
				// videoRef.current.srcObject = cameraStream;
			} catch(error) {
				console.error('Error accessing media devices.', error);
				console.log('OverconstrainedError', error.name);
				if(error.name === 'OverconstrainedError'){
					const stream = await openMediaDevices(CONSTRAINTS.BASIC);
					setMediaStream(stream);
					createVideoTag(stream);
				}
			}
		}
	}, [ad])

	const updateMediaDevices = async () => {
		try {
			console.log('updateMediaDevices', frontCamera)
			setSwitchingCamera(true);
			onChange();
			// const tracks = mediaStream.getTracks();
			// videoRef.current.pause();
			// testVideoRef.current.hidden = false;
			// videoRef.current.hidden = true;
			// tracks.forEach(track => track.stop());
			// videoRef.current.hidden = true;
			window.cameraStream = cameraStream;
			// console.log(cameraStream)
			// console.log('asdas', cameraStream.getVideoTracks()[0].applyConstraints())

			// cameraStream.getVideoTracks()[0].applyConstraints(frontCamera ? CONSTRAINTS.FRONT_CAMERA : CONSTRAINTS.BACK_CAMERA).then(() => {
			// 	console.log('allalala switch done');
			//   })
			//   .catch(e => {
			// 	console.log('allalala switch not done');
			// 	// The constraints could not be satisfied by the available devices.
			//   });
			// const stream = await openMediaDevices(CONSTRAINTS.BACK_CAMERA);
			// cameraStream.addTrack(stream);
			// createVideoTag(stream);

			// videoRef.current.load();
			// videoRef.current.play();

			// cameraStream = stream;
			// console.log('Got MediaStream:', stream);
			// videoRef.current.srcObject = cameraStream;
			const stream = await openMediaDevices(CONSTRAINTS.FRONT_CAMERA(frontCamera ? ad['front'] : ad['back']));
				console.log('Got MediaStream:', stream);
				createVideoTag(stream);
				// initialLoadDone = true;
				// if(frontCamera){
				// 	setFirstCameraStream(stream);
				// }else{
				// 	setBackCameraStream(stream);
				// }
				// setMediaStream(stream);
				cameraStream = stream;
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

	// useEffect(() => {
	// 	if(initialLoadDone){
	// 		updateMediaDevices()
	// 	}
	// }, [frontCamera]);
	
	return { toggleCamera, videoRef, loading, streamAvailable, switchingCamera, testVideoRef, backCameraStream, firstCameraStream };
}