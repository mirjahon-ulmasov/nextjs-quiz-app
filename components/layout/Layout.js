import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

import MainNavigation from './MainNavigation';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Shapes from './figures/Shapes';
import classes from './Layout.module.css';

export default function Layout(props) {
  const router = useRouter();
  const [isLogOut, setIsLogOut] = useState(false);

  const stayHandler = () => {
    setIsLogOut(false);
  };

  const logoutHandler = () => {
    setIsLogOut(true);
  };

  return (
    <Fragment>
      <MainNavigation id={props.id} onLogout={logoutHandler} />
      <div className={classes.context}>
        <div className={classes.wrapper}>
          <Shapes />
        </div>
        {isLogOut && (
          <Modal
            onClose={stayHandler}
            className={{ index: 'primary', position: 'center' }}
          >
            <p>{`Are you sure you want to log out? 
                   You will lose any unsaved changes. 
                   Press Log Out to continue, or Cancel to stay`}</p>
            <div className={classes.buttons}>
              <Button className="warning" onClick={() => router.push('/')}>
                Log Out
              </Button>
              <Button onClick={stayHandler}>Cancel</Button>
            </div>
          </Modal>
        )}
        {props.children}
      </div>
    </Fragment>
  );
}
