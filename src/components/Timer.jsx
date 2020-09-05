import React from 'react';
import './Timer.css';

const Timer = ({
  timerTitle,
  formattedTime,
  btnFunction,
  btnText
}) => {
  return (
    <div className="timer-container">
      <h2 className="timer-type">{timerTitle}</h2>
      <h1 className="timer">{formattedTime}</h1>
      <button className="start-btn" type="button" onClick={btnFunction}>{btnText}</button>
  </div>
  );
}

export default Timer;