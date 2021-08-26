import classes from './Notification.module.css';

export default function Notification(props) {
  return (
    <div className={`${classes.message} ${classes[props.className]}`}>
      {props.children}
    </div>
  );
}
