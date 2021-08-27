import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';

import classes from './Form.module.css';

export default function SignUp(props) {
  const [nameClasses, setNameClasses] = useState(classes.input);
  const [emailClasses, setEmailClasses] = useState(classes.input);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const invalidInput = `${classes.input} ${classes.invalid}`;
  const validation = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');

  const submitHandler = event => {
    event.preventDefault();
    let isUnique = true;
    setNameClasses(classes.input);
    setEmailClasses(classes.input);

    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    props.users.forEach(user => {
      if (enteredName === user.name) {
        setNameClasses(invalidInput);
        isUnique = false;
      }
      if (enteredEmail === user.email) {
        setEmailClasses(invalidInput);
        isUnique = false;
      }
    });

    if (!validation.test(enteredPassword)) {
      isUnique = false;
    }

    if (isUnique) {
      const date = new Date();
      const today = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

      const user = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        date: today,
        score: 0,
        time: 0,
        details: {
          firstName: '',
          lastName: '',
          bio: '',
          birthday: '',
          gender: '',
          phone: '',
          address: '',
          github: '',
          linkedin: '',
          skills: '',
          jobs: '',
        },
      };

      props.addUser(user);
    }
  };

  return (
    <div className={classes.enter}>
      <Image
        src="/register_edit.svg"
        width="130"
        height="130"
        alt="Sign up image"
      />
      <form onSubmit={submitHandler} className={classes.form}>
        <input
          ref={nameRef}
          type="text"
          required
          placeholder="Nickname"
          className={nameClasses}
          title="Nickname must be unique"
        />
        <input
          ref={emailRef}
          type="email"
          required
          placeholder="Email"
          className={emailClasses}
          title="Email address must be unique"
        />
        <input
          ref={passwordRef}
          type="password"
          required
          placeholder="Password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Password must contain at least 8 characters, including UPPER/lowercase
              and numbers"
          className={classes.input}
        />
        <button type="submit" className={classes.button}>
          CREATE ACCOUNT
        </button>
        <div className={classes.registered}>
          <p>
            Already have an account? <Link href="/">Sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
