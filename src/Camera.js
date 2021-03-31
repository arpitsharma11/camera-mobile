/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { useCameraStream } from './hooks';

export const Camera = () => {

	const [start, setStart] = useState({});
	// const cameraRef = useRef();

	const { toggleCamera, videoRef, loading, streamAvailable } = useCameraStream(start, false);

	// const openMediaDevices = async (constraints) => {
  //   return await navigator.mediaDevices.getUserMedia(constraints);
	// }

	// const init = async () => {
	// 	try {
	// 		const stream = await openMediaDevices({'video':true,'audio':true});
	// 		console.log('Got MediaStream:', stream);
	// 		cameraRef.current.srcObject = stream;
	// 	} catch(error) {
	// 		console.error('Error accessing media devices.', error);
	// 		alert('error');
	// 	}
	// }

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