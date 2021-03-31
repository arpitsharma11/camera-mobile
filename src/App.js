import './App.css';
import Camera from './Camera';
import React from 'react';

// import { Camera } from 'react-cam';

function App() {
  return (<Camera />);
}

// function capture(imgSrc) {
//   console.log(imgSrc);
// }

// const App = () => {
//   const cam = useRef(null);
//   return (
//     <React.Fragment>
//       <Camera
//         showFocus={true}
//         front={false}
//         capture={capture}
//         ref={cam}
//         width="80%"
//         height="auto"
//         focusWidth="80%"
//         focusHeight="60%"
//         btnColor="white"
//       />
//       <button onClick={img => cam.current.capture(img)}>Take image</button>
//     </React.Fragment>
//   );
// };

export default App;
