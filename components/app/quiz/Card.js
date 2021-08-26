import { Fragment, useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { arrow_right } from '../../layout/figures/Icons';

import classes from './Card.module.css';

function randomize(arr) {
  const myArr = [...arr];
  const randomizedArr = [];
  let index;
  while (myArr.length > 0) {
    index = Math.floor(Math.random() * myArr.length);
    randomizedArr.push(myArr[index]);
    myArr.splice(index, 1);
  }

  return randomizedArr;
}

function decodeHTMLEntities(str) {
  if (str && typeof str === 'string') {
    let element = document.createElement('div');
    str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
    str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');

    element.innerHTML = str;
    str = element.textContent;
    element.textContent = '';
  }

  return str;
}

export default function Card(props) {
  const [isEntered, setIsEntered] = useState(false);
  const [response, setResponse] = useState('');
  const [randomAnswers, setRandomAnswers] = useState([]);

  const { correct_answer, incorrect_answers, question } = props.data;
  const answers = incorrect_answers.concat(correct_answer);

  const decodedQuestion = decodeHTMLEntities(question);
  const decodedAnswers = answers.map(answer => decodeHTMLEntities(answer));

  useEffect(() => {
    setRandomAnswers(randomize(decodedAnswers));
  }, []);

  const responseHandler = e => {
    setResponse(e.target.value);
    setIsEntered(true);
  };

  const submitHandler = event => {
    event.preventDefault();

    if (response === correct_answer) {
      props.totalPoints(100 / props.length);
    }

    props.nextQuestion();
  };

  return (
    <Fragment>
      <div className={classes.q_number}>{`</ Qustion ${props.index + 1} / ${
        props.length
      } >`}</div>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.card}>
          <div className={classes.question}>
            <h2>{decodedQuestion}</h2>
          </div>
          <div className={classes.answers}>
            {randomAnswers.map((value, i) => {
              return (
                <button
                  onClick={responseHandler}
                  key={i}
                  value={value}
                  type="button"
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
        <div className={classes.button}>
          <Button disabled={!isEntered} type="submit">
            Next
            {isEntered && arrow_right}
          </Button>
        </div>
      </form>
    </Fragment>
  );
}
