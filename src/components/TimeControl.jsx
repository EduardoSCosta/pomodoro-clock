import React from 'react';
import './TimeControl.css';

const TimeControl = ({
  controlTimeDown,
  controlTimeUp,
  formattedTime,
  controlTitle
}) => {
  return (
    <div className="controls-container">
      <h3 className="btn-type" >{controlTitle}</h3>
      <div className="btn-wrapper">
        <button className="control-btn minus-btn" type="button" onClick={controlTimeDown}>-</button>
        <span className="time-text" >{formattedTime}</span>
        <button className="control-btn plus-btn" type="button" onClick={controlTimeUp}>+</button>
      </div>
  </div>
  );
}

export default TimeControl;