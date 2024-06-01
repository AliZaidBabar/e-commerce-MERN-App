import React from 'react';

function ProgressBar({ value ,label}) {
  return (
    <div className="progress mt-2" role="progressbar" aria-label="Basic example" aria-valuenow={value} aria-valuemin="0" aria-valuemax="100">
      <div className="progress-bar " style={{ width: `${value}%` ,backgroundColor:'black'}}>{label}</div>
    </div>
  );
}

function App() {
  return (
    <div>
      <ProgressBar value={0} label="1 Star Ratings"/>
      <ProgressBar value={25} label="2 Star Ratings"/>
      <ProgressBar value={50} label="3 Star Ratings"/>
      <ProgressBar value={75} label="4 Star Ratings"/>
      <ProgressBar value={100} label="5 Star Ratings"/>
    </div>
  );
}

export default App;