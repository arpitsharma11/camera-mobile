/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useCameraStream } from './hooks';

const width = window.innerWidth;

export const Camera = () => {

	const [start, setStart] = useState({});
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	// const cameraRef = useRef();

	const { toggleCamera, videoRef, loading, streamAvailable, switchingCamera } = useCameraStream(start, false);

	const handleCanPlay = () => {
		console.log('pipipi');
		setIsVideoPlaying(true);
		videoRef.current.play();
	}

	const onPlay = () => {
		console.log('lalalalalal');
	}

	useEffect(() => {
		console.log('lalalalalal', streamAvailable);
		// if(!streamAvailable){
		// 	setIsVideoPlaying(false);
		// }
	}, [streamAvailable])

	useEffect(() => {
		console.log('isVideoPlaying', isVideoPlaying);
	}, [isVideoPlaying]);

	return (
		<div>
			<div>Camera</div>
			<video  width={`${width}px`} height="600px" autoPlay hidden={!isVideoPlaying} ref={videoRef} muted playsInline onCanPlay={handleCanPlay} controls={false} 
				style={switchingCamera ? { 
					filter: 'blur(15px)',
					objectFit: 'cover', } : {}}
			/>
			<button onClick={() => setStart(!start)} >{ start ? 'Stop' : 'Start' }</button><br/>
			<button onClick={toggleCamera} >Rotate</button>
		</div>
	);
}

export default Camera;