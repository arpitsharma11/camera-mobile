/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useCameraStream } from './hooks';

const width = window.innerWidth;

export const Camera = () => {

	const [start, setStart] = useState({});
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	// const cameraRef = useRef();

	const onChange = () => {
		console.log('switchinggggg');
		setIsVideoPlaying(false);
	}

	const { toggleCamera, videoRef, testVideoRef, loading, streamAvailable, switchingCamera } = useCameraStream(start, false, onChange );

	const handleCanPlay = () => {
		console.log('handleCanPlay');
		setIsVideoPlaying(true);
		videoRef.current.play();
	}

	const onPlay = () => {
		console.log('onPlay');
	}

	const onPause = () => {
		console.log('onPause');
	}

	const onPlaying = () => {
		console.log('onPlaying');
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
				hidden={!isVideoPlaying}
				ref={videoRef}
				muted
				onCanPlay={handleCanPlay}
				controls={false}
				onPause={onPause}
				onPlay={onPlay}
				onPlaying={onPlaying}
			/>
			<button onClick={() => setStart(!start)} >{ start ? 'Stop' : 'Start' }</button><br/>
			<button onClick={toggleCamera} >Rotate</button>
		</div>
	);
}

export default Camera;