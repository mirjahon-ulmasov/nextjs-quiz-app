import { useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import { getQuotes } from '../../lib/api';

import Table from './Table';
import LoadingSpinner from '../../ui/LoadingSpinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { award } from '../../layout/figures/Icons';
import classes from './Dashboard.module.css';

function descending(arr) {
  const myArr = [...arr];
  const sortedArr = [];

  for (let i = 0; i < myArr.length; ) {
    let max = myArr[i].score;
    let index = i;
    for (let j = i + 1; j < myArr.length; j++) {
      if (max < myArr[j].score) {
        max = myArr[j].score;
        index = j;
      }
    }
    sortedArr.push({ ...myArr[index] });
    myArr.splice(index, 1);
  }

  return sortedArr;
}

function position(value, arr) {
  let index = arr.findIndex(el => el.id === value.id);
  index++;
  index = index.toString();

  let suffix = 'th';

  if (index.substr(-1) === '1' && index.substr(-2) !== '11') suffix = 'st';
  else if (index.substr(-1) === '2' && index.substr(-2) !== '12') suffix = 'nd';
  else if (index.substr(-1) === '3' && index.substr(-2) !== '13') suffix = 'rd';

  return (
    <h1>
      {index}
      <span>{suffix}</span>
    </h1>
  );
}

export default function Dashboard(props) {
  const {
    sendRequest,
    data: loadedQuotes,
    error,
    status,
  } = useHttp(getQuotes, true);

  const orderedUsers = descending(props.users);
  const myPosition = position(props.registeredUser, orderedUsers);

  useEffect(() => {
    sendRequest();
  }, []);

  if (status === 'pending') {
    return <LoadingSpinner />;
  }

  let quote;

  if (
    status === 'completed' &&
    (error || !loadedQuotes || loadedQuotes.length === 0)
  ) {
    quote = {
      text: 'Well done is better than well said.',
      author: 'Benjamin Franklin',
    };
  } else {
    quote = loadedQuotes[Math.floor(Math.random() * loadedQuotes.length)];
  }

  return (
    <div className={classes.main}>
      <div className={classes.info}>
        <div className={classes.status}>
          {award}
          <div className={classes.position}>
            {myPosition}
            <h2>Your current position</h2>
          </div>
        </div>
        <div className={classes.user}>
          <figure>
            <FontAwesomeIcon
              icon={faQuoteLeft}
              size="2x"
              className={classes.quote}
            ></FontAwesomeIcon>
            <blockquote>{quote.text}</blockquote>
            <figcaption>&mdash; {quote.author}</figcaption>
          </figure>
        </div>
      </div>
      <div className={classes.leaderboard}>
        <h2>Leaderboard</h2>
        <Table users={orderedUsers} />
      </div>
    </div>
  );
}
