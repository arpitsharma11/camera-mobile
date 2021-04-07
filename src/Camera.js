/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useCameraStream } from './hooks';

const width = window.innerWidth;

let firstLoad = true;

export const Camera = () => {

	const [start, setStart] = useState({});
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	// const cameraRef = useRef();

	const onChange = () => {
		console.log('switchinggggg');
		videoRef.current.hidden = true;
		setIsVideoPlaying(false);
	}

	const { toggleCamera, videoRef, testVideoRef, loading, streamAvailable, switchingCamera, firstCameraStream, backCameraStream } = useCameraStream(start, false, onChange );

	// const handleCanPlay = () => {
	// 	console.log('handleCanPlay');
	// 	if(firstLoad){
	// 		console.log('handleCanPlay without time');
	// 		setIsVideoPlaying(true);
	// 		videoRef.current.hidden = false;
	// 		firstLoad = false;
	// 	}else{
	// 		console.log('handleCanPlay with time');
	// 		setTimeout(() => {
	// 			setIsVideoPlaying(true);
	// 			videoRef.current.hidden = false;
	// 		}, 100)
	// 	}
	// }

	const onPlay = () => {
		console.log('onPlay');
	}

	const onPause = () => {
		console.log('onPause');
	}

	const onLoadedData = () => {
		console.log('onLoadedData');
	}

	const onLoadStart = () => {
		console.log('onLoadStart');
	}

	// useEffect(() => {
	// 	if(!streamAvailable){
	// 		setIsVideoPlaying(false);
	// 	}
	// }, [streamAvailable])

	useEffect(() => {
		console.log('isVideoPlaying', isVideoPlaying);
	}, [isVideoPlaying]);

	return (
		<div>
			<div>Camera</div>
			<video
				id="cameraTest"
				width={`${width}px`}
				height="600px"
				autoPlay
				ref={videoRef}
				muted
				// onCanPlay={handleCanPlay}
				controls={false}
				onPause={onPause}
				onPlay={onPlay}
				onLoadStart={onLoadStart}
				onLoadedData={onLoadedData}
				hidden
			/>
			{/* {!isVideoPlaying && <div>Loading</div>} */}
			<button onClick={() => setStart(!start)} >{ start ? 'Stop' : 'Start' }</button><br/>
			<button onClick={toggleCamera} >Rotate</button>
		</div>
	);
}

export default Camera;