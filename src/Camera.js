/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useCameraStream } from './hooks';

export const Camera = () => {

	const [start, setStart] = useState({});
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);
	// const cameraRef = useRef();

	const { toggleCamera, videoRef, loading, streamAvailable } = useCameraStream(start, false);

	const handleCanPlay = () => {
		console.log('pipipi');
		setIsVideoPlaying(true);
		videoRef.current.play();
	}

	const onPlay = () => {
		console.log('lalalalalal');
	}

	useEffect(() => {
		if(!streamAvailable){
			setIsVideoPlaying(false);
		}
	}, [streamAvailable])

  return (
    <div>
			<div>Camera</div>
			<video onPause={onPlay} hidden={!isVideoPlaying} ref={videoRef} muted playsInline autoPlay onCanPlay={handleCanPlay} controls={false} />
			<button onClick={() => setStart(!start)} >{ start ? 'Stop' : 'Start' }</button><br/>
			<button onClick={toggleCamera} >Rotate</button>
		</div>
	);
}

export default Camera;