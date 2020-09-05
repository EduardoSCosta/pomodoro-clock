import React, {useState, useEffect} from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import TimeControl from '../components/TimeControl';
import Timer from '../components/Timer';
import './Pomodoro.css';

const pomDuration = 1500;
const breakDuration = 300;

momentDurationFormatSetup(moment);

function Pomodoro() {
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(pomDuration);
  const [pomLength, setPomLenght] = useState(pomDuration);
  const [breakLength, setBreakLenght] = useState(breakDuration);
  const [isPom, setIsPom] = useState("Sessão");

  const formattedTime = moment.duration(timer, 's').format('mm:ss', {trim: false});
  const formattedPom = moment.duration(pomLength, 's').minutes();
  const formattedBreak = moment.duration(breakLength, 's').minutes();


  const isStarted = intervalId !== null;

  const startStop = () => {
    if(isStarted) {      
      clearInterval(intervalId);
      setIntervalId(null);
    } else{
      const newIntervalId = setInterval(() => {
        setTimer(prevTimeLeft => {
          const newTimeLeft = prevTimeLeft - 1;
          if(newTimeLeft >= 0) {
            return prevTimeLeft - 1;
          } else {
            return prevTimeLeft;
          }
        })
      }, 1000);
      setIntervalId(newIntervalId);
    }
  }

  const controlSessionUp = () => {
    setPomLenght(pomLength+60);
    if(isPom === "Sessão"){
      clearInterval(intervalId);
      setIntervalId(null);      
    }
  }

  const controlSessionDown = () => {
    if(pomLength > 60 ){
      setPomLenght(pomLength-60);
    } else {
      setPomLenght(60);
    }
    if(isPom === "Sessão"){
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  const controlBreakUp = () => {
    setBreakLenght(breakLength+60);
    if(isPom === "Intervalo"){
      clearInterval(intervalId);
      setIntervalId(null);      
    }
  }

  const controlBreakDown = () => {
    if(breakLength > 60 ){
      setBreakLenght(breakLength-60);
    } else {
      setBreakLenght(60);
    }
    if(isPom === "Intervalo"){
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }

  useEffect(() => {
    if(isPom === "Sessão") {
      setTimer(pomLength);
    }
  }, [pomLength, isPom]);

  useEffect(() => {
    if(isPom === "Intervalo") {
      setTimer(breakLength);
    }
  }, [breakLength, isPom]);

  useEffect(() => {
    if(isPom === "Sessão" && timer === 0) {
      setTimer(breakLength);
      setIsPom("Intervalo");
    }
    if(isPom === "Intervalo" && timer === 0) {
      setTimer(pomLength);
      setIsPom("Sessão");
    }
  }, [breakLength, pomLength, timer, isPom]);

  return (
    <>
      <Timer
        timerTitle={isPom}
        formattedTime={formattedTime}
        btnFunction={startStop}
        btnText={isStarted? "Parar" : "Começar"}
      />
      <div className="controls-wrapper">
        <TimeControl
          controlTimeUp={controlSessionUp}
          controlTimeDown={controlSessionDown}
          formattedTime={formattedPom}
          controlTitle="Sessão"
        />
        <TimeControl
          controlTimeUp={controlBreakUp}
          controlTimeDown={controlBreakDown}
          formattedTime={formattedBreak}
          controlTitle="Intervalo"
        />
      </div>
    </>
  );
}

export default Pomodoro;