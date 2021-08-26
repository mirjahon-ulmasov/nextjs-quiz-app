import { Fragment } from "react";
import classes from "./Shapes.module.css";

export default function Shapes() {
  return (
    <Fragment>
      <div className={`${classes.shapes} ${classes.rectangle_1}`} />
      <div className={`${classes.shapes} ${classes.rectangle_2}`} />
      <div className={`${classes.shapes} ${classes.circle}`} />
      <div className={`${classes.shapes} ${classes.triangle}`} />
    </Fragment>
  );
}
