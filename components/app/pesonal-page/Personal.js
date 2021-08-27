import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { Fragment, useState } from 'react';

import DetialForm from './DetailForm';
import Modal from '../../ui/Modal';
import InfoTable from './InfoTable';
import Button from '../../ui/Button';
import Notification from '../../ui/Notification';
import classes from './Personal.module.css';

function getAbout(userDetails) {
  return [
    ['First Name', userDetails.firstName],
    ['Last Name', userDetails.lastName],
    ['Bio', userDetails.bio],
    ['Birthday', userDetails.birthday],
    ['Gender', userDetails.gender],
  ];
}

function getContact(user) {
  return [
    ['Phone', user.details.phone],
    ['Address', user.details.address],
    ['Email', user.email],
    ['Github', user.details.github],
    ['LinkedIn', user.details.linkedin],
  ];
}

export default function Personal(props) {
  const router = useRouter();

  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [notification, setNotification] = useState(null);

  const userDetails = props.user.details;

  const jobs = userDetails.jobs.split(', ');
  const skills = userDetails.skills.split(' ');

  const about = getAbout(userDetails);
  const contact = getContact(props.user);

  const editHandler = () => {
    setIsEdit(true);
  };

  const cancelEditHandler = () => {
    setIsEdit(false);
  };

  const deleteHandler = () => {
    setIsDelete(true);
  };

  const cancelDeleteHandler = () => {
    setIsDelete(false);
  };

  const notificationHandler = message => {
    setNotification(message);
  };

  async function deleteAccount(userId) {
    setIsDelete(false);
    setNotification(<Notification>Deleting your account...</Notification>);

    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.status >= 200 && response.status <= 299) {
      setNotification(
        <Notification className="error">Your account was deleted</Notification>
      );
      setTimeout(() => {
        setNotification(null);
        router.push('/');
      }, 3000);
    } else {
      setNotification(
        <Notification className="error">
          Could not connect to server
        </Notification>
      );
    }
  }

  return (
    <Fragment>
      {isDelete && (
        <Modal
          onClose={cancelDeleteHandler}
          className={{ index: 'secondary', position: 'center' }}
        >
          <p>{`Are you sure you want to delete your account? 
                   This will permanently erase your account. 
                   Press Delete to continue, or Cancel to stay`}</p>
          <div className={classes.buttons}>
            <Button
              className="warning"
              onClick={() => deleteAccount(props.user.id)}
            >
              Delete
            </Button>
            <Button onClick={cancelDeleteHandler}>Cancel</Button>
          </div>
        </Modal>
      )}

      {isEdit && (
        <DetialForm
          onCancel={cancelEditHandler}
          onNotification={notificationHandler}
          user={props.user}
        />
      )}

      <div className={classes.page}>
        <div className={classes.title}>
          <h1>{props.user.name}</h1>
          <div className={classes.buttons}>
            <Button onClick={editHandler}>Edit</Button>
            <Button onClick={deleteHandler} className="warning">
              Delete
            </Button>
          </div>
        </div>
        <div className={classes.main}>
          {notification}

          <div className={classes.about}>
            <div className={classes.image}>
              <Image
                src={
                  userDetails.gender === 'Female' ? '/female.jpeg' : '/male.png'
                }
                className={
                  userDetails.gender === 'Female' ? classes.female : ''
                }
                width="200"
                height="200"
              />
              <div className={classes.buttons}>
                <Button onClick={editHandler}>Edit</Button>
              </div>
            </div>
            <InfoTable details={about} className="about_table" />
          </div>
          <div className={classes.info}>
            <div className={classes.contact}>
              <h3>Contact Information</h3>
              <InfoTable details={contact} className="contact_table" />
            </div>
            <div className={classes.experience}>
              <h3>Work Experience</h3>
              <ul>
                {jobs.length > 0 ? (
                  jobs.map(el => <li key={Math.random().toString()}>{el}</li>)
                ) : (
                  <span>&#151;</span>
                )}
              </ul>
              <h3>Skills</h3>
              <ul>
                {skills.length > 0 ? (
                  skills.map(el => <li key={Math.random().toString()}>{el}</li>)
                ) : (
                  <span>&#151;</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
