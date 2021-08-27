import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import Notification from '../../ui/Notification';
import classes from './DetailForm.module.css';

export default function DetialForm(props) {
  const router = useRouter();
  const [input, setInput] = useState({});

  const inputChangeHandler = e => {
    setInput(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = async event => {
    event.preventDefault();

    const user = {
      ...props.user,
      details: { ...props.user.details, ...input },
    };

    setInput({});
    props.onCancel();

    props.onNotification(<Notification>Sending your answers...</Notification>);

    const response = await fetch(`/api/users/${props.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status >= 200 && response.status <= 299) {
      props.onNotification(
        <Notification className="success">
          Your answers was successfully submitted
        </Notification>
      );
      setTimeout(() => {
        props.onNotification(null);
        router.reload(window.location.pathname);
      }, 3000);
    } else {
      props.onNotification(
        <Notification className="error">
          Could not connect to server
        </Notification>
      );
    }
  };

  return (
    <Modal
      onClose={props.onCancel}
      className={{ index: 'secondary', position: 'top' }}
    >
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.row}>
          <input
            type="text"
            onChange={inputChangeHandler}
            placeholder="First Name"
            name="firstName"
          />
          <input
            type="text"
            onChange={inputChangeHandler}
            placeholder="Last Name"
            name="lastName"
          />
        </div>
        <div className={classes.row}>
          <textarea
            onChange={inputChangeHandler}
            placeholder="Bio"
            name="bio"
            rows="2"
          />
        </div>
        <div className={classes.row}>
          <input
            type="date"
            onChange={inputChangeHandler}
            placeholder="Birthday"
            name="birthday"
          />
          <div className={classes.gender}>
            <label>Gender:</label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={inputChangeHandler}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={inputChangeHandler}
              />
              Female
            </label>
          </div>
        </div>
        <div className={classes.row}>
          <input
            type="tel"
            onChange={inputChangeHandler}
            placeholder="Phone Number"
            name="phone"
          />
          <input
            type="text"
            onChange={inputChangeHandler}
            placeholder="Postcode"
            name="postcode"
          />
        </div>
        <div className={classes.row}>
          <textarea
            onChange={inputChangeHandler}
            placeholder="Address"
            name="address"
            rows="2"
          />
        </div>
        <div className={classes.row}>
          <input
            type="url"
            onChange={inputChangeHandler}
            placeholder="Github"
            name="github"
          />
          <input
            type="url"
            onChange={inputChangeHandler}
            placeholder="LinkedIn"
            name="linkedin"
          />
        </div>
        <div className={classes.row}>
          <textarea
            onChange={inputChangeHandler}
            placeholder="Skills"
            name="skills"
            rows="2"
          />
          <textarea
            onChange={inputChangeHandler}
            placeholder="Jobs"
            name="jobs"
            rows="2"
          />
        </div>
        <div className={classes.buttons}>
          <Button onClick={props.onCancel}>Cancel</Button>
          <Button className="success" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
