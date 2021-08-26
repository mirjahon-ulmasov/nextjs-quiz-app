import { Fragment } from 'react';
import classes from './Modal.module.css';

export function Backdrop(props) {
  return (
    <div
      className={`${classes.backdrop} ${classes[props.className]}`}
      onClick={props.onClose}
    />
  );
}

export function ModalOverlay(props) {
  const index = classes[props.className.index];
  const position = classes[props.className.position];

  return (
    <div className={`${classes.modal} ${index} ${position}`}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}

export default function Modal(props) {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose} className={props.className.index} />
      <ModalOverlay className={props.className}>{props.children}</ModalOverlay>
    </Fragment>
  );
}
