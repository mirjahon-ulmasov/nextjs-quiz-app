import classes from './Button.module.css';

export default function Button(props) {
  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${classes.button} ${classes[props.className || 'primary']}`}
    >
      {props.children}
    </button>
  );
}
