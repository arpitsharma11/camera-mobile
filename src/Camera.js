/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useCameraStream } from './hooks';

export const Camera = () => {

	const [start, setStart] = useState({});
	// const cameraRef = useRef();

	const { toggleCamera, videoRef, loading, streamAvailable } = useCameraStream(start, false);

  return (
    <div>
			<div>Camera</div>
			<video style={streamAvailable ? {}: {display:'none'} } ref={videoRef} muted playsInline controls={false} />
			<button onClick={() => setStart(!start)} >{ start ? 'Stop' : 'Start' }</button><br/>
			<button onClick={toggleCamera} >Rotate</button>
		</div>
	);
}

export default Camera;