import Image from 'next/image';
import Shapes from '../../layout/figures/Shapes';

import classes from './Register.module.css';

export default function Register(props) {
  return (
    <div className={classes.background}>
      <Shapes />
      <main className={classes['page-wrapper']}>{props.children}</main>
    </div>
  );
}
