import { useRouter } from 'next/dist/client/router';

import Chart from '../../ui/Chart';
import Button from '../../ui/Button';
import Notification from '../../ui/Notification';
import { ModalOverlay } from '../../ui/Modal';
import { chart, clock, trophy } from '../../layout/figures/Icons';

import classes from './Result.module.css';

export default function Result(props) {
  const router = useRouter();

  const { score, time } = props.user;
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  const startHandler = () => {
    router.reload(window.location.pathname);
  };

  const submitHandler = async () => {
    props.onNotification(<Notification>Sending your answers...</Notification>);

    const response = await fetch(`/api/users/${props.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(props.user),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status >= 200 && response.status <= 299) {
      props.onNotification(
        <Notification className="success">
          Your answers was successfully submitted
        </Notification>
      );
    } else {
      props.onNotification(
        <Notification className="error">
          Could not connect to server
        </Notification>
      );
    }
  };

  return (
    <ModalOverlay className={{ index: 'secondary', position: 'center' }}>
      <div className={classes.result}>
        <Chart
          data={[
            { title: 'Correct', value: score, color: '#54be60' },
            {
              title: 'Incorrect',
              value: 100 - score,
              color: '#ff6a6a',
            },
          ]}
        />
        <div className={classes.stats}>
          <p>
            <span>{clock}</span>
            {`${minutes}:${seconds < 10 ? '0' + seconds : seconds} minutes`}
          </p>
          <p>
            <span>{chart}</span>
            {`${Math.round((score / 100) * props.length)} out of ${
              props.length
            } points`}
          </p>
          <p>
            {trophy}
            {`difficulty: ${'Medium'}`}
          </p>
        </div>
      </div>
      <div className={classes.buttons}>
        <Button onClick={startHandler}>Try again</Button>
        <Button className="success" onClick={submitHandler}>
          Submit
        </Button>
      </div>
    </ModalOverlay>
  );
}
