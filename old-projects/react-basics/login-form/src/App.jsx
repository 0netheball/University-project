import {useState, useEffect} from 'react';
import dayjs from 'dayjs';
import InputElements from "./components/InputElements";
import './App.css';

export default function App() {
  const [todayDate, setTodayDate] = useState(dayjs().format('HH:mm:ss'));
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTodayDate(dayjs().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h3>Hello, welcome to my website</h3>

      <InputElements />

      <button className="login-button">Login</button>
      <button className="sign-button">Sign up</button>

      <p>Current time: {todayDate}</p>
    </>
  );
}