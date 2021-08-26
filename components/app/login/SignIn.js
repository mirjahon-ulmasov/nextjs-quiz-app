import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { useRef, useState } from 'react';

import classes from './Form.module.css';

export default function SignIn(props) {
  const [inputClasses, setInputClasses] = useState(classes.input);

  const router = useRouter();
  const nameRef = useRef();
  const passwordRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const isValidUser = props.users.find(
      user =>
        user.name === nameRef.current.value &&
        user.password === passwordRef.current.value
    );

    if (isValidUser) {
      router.push(`/${isValidUser.id}`);
      setInputClasses(classes.input);
    } else {
      setInputClasses(`${classes.input} ${classes.invalid}`);
    }
  };

  return (
    <div className={classes.enter}>
      <Image
        src="/register_verify.svg"
        width="130"
        height="130"
        alt="Sign in image"
      />
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          ref={nameRef}
          type="text"
          required
          placeholder="Nickname"
          className={inputClasses}
        />
        <input
          ref={passwordRef}
          type="password"
          required
          placeholder="Password"
          className={inputClasses}
        />
        <button type="submit" className={classes.button}>
          OK, go!
        </button>
        <div className={classes.registered}>
          <p>Don&apos;t have an account yet?</p>
          <Link href="/register">Create one here</Link>
        </div>
      </form>
    </div>
  );
}
