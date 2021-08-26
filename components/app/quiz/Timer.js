import { useEffect, useState } from 'react';

export default function Timer(props) {
  const { initialMinutes, initialSeconds } = props;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (props.index === props.length) {
        const totalSec = initialMinutes * 60 - (minutes * 60 + seconds);
        props.onTime(totalSec);
        clearInterval(myInterval);
      } else {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  return props.index === props.length ||
    (minutes === 0 && seconds === 0) ? null : (
    <div className={props.className}>{`${minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`}</div>
  );
}
