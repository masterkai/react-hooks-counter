import './App.css';
import React, {useEffect, useState} from "react";

const calculateTimeLeft = () => {
  let year = new Date().getFullYear();

  const difference = +new Date(`12/01/${year}`) - +new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  return timeLeft
};

function App() {
  // console.log('rendering app');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      setYear(new Date().getFullYear());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    // console.log('rendering: ',interval);
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return;
    }

    timerComponents.push(
      <span key={index} style={{'border': '1px solid red', 'padding': "5px 10px"}}>
      <h1 style={{"display": "inline-block"}}>{
        interval === 'days' ? timeLeft[interval] : timeLeft[interval] < 10 ? '0' + timeLeft[interval] : timeLeft[interval]
      }</h1> {interval}{" "}
    </span>
    );

  });
  return (
    <div>
      <h1>HacktoberFest {year}Countdown</h1>
      <h2>With React Hooks!</h2>
      {timerComponents.length ? timerComponents : <span>Time's up!</span>}
     
    </div>
  );
}

export default App;
