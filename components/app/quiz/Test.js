import { useState, useEffect, Fragment } from 'react';
import useHttp from '../../hooks/use-http';
import { getTestQuestions } from '../../lib/api';

import Card from './Card';
import Timer from './Timer';
import Result from './Result';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Notification from '../../ui/Notification';
import LoadingSpinner from '../../ui/LoadingSpinner';

import classes from './Test.module.css';

export default function Test(props) {
  const [isStarted, setIsStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [timer, setTimer] = useState(0);
  const [notification, setNotification] = useState(null);

  const {
    sendRequest,
    status,
    data: loadedQuestions,
    error,
  } = useHttp(getTestQuestions, true);

  useEffect(() => {
    sendRequest();
  }, []);

  if (status === 'pending') {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Notification className="error">{error}</Notification>;
  }

  const length = loadedQuestions.length;
  let user;

  if (status === 'completed' && (!loadedQuestions || length === 0)) {
    return <Notification className="error">There is no question</Notification>;
  }

  const startQuizHandler = () => {
    setIsStarted(true);
  };

  const nextQuestionHandler = () => {
    setIndex(index + 1);
  };

  const totalPointsHandler = total => {
    setTotalPoints(prevTotal => {
      return total + prevTotal;
    });
  };

  const timeHandler = time => {
    setTimer(time);
  };

  const notificationHandler = message => {
    setNotification(message);
  };

  if (index === length) {
    const date = new Date();
    const today = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    user = {
      ...props.user,
      date: today,
      score: Math.round(totalPoints),
      time: timer,
    };
  }

  return (
    <Fragment>
      {!isStarted && (
        <Modal
          onClose={startQuizHandler}
          className={{ index: 'secondary', position: 'center' }}
        >
          <p>{`The quiz is open to all. The duration of the quiz is ${5} minutes. The quiz shall have ${10} questions. 
               Each question in the quiz is of multiple-choice or "true or false" format.
               After responding to a question, click on the "Next" button at the bottom to go to the next question. 
               After finishing quiz, you will get your score and able to see position on dashboard. 
               If you retake the quiz, the questions and their respective responses will be randomized.`}</p>
          <div className={classes.button}>
            <Button className="success" onClick={startQuizHandler}>
              Start Quiz
            </Button>
          </div>
        </Modal>
      )}
      <div className={classes.main}>
        {notification}

        {loadedQuestions.at(index) ? (
          <Card
            key={index}
            index={index}
            length={length}
            data={loadedQuestions.at(index)}
            totalPoints={totalPointsHandler}
            nextQuestion={nextQuestionHandler}
            isStarted={isStarted}
          />
        ) : (
          <Result
            length={length}
            user={user}
            onNotification={notificationHandler}
          />
        )}

        {isStarted && (
          <div className={classes.clock}>
            <Timer
              length={length}
              index={index}
              initialMinutes={5}
              initialSeconds={0}
              onTime={timeHandler}
              className={classes.timer}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
}
