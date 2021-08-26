import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { account, assignment, leaderboard, logout } from './figures/Icons';
import classes from './MainNavigation.module.css';

export default function MainNavigation(props) {
  const router = useRouter();
  const userId = props.id;
  const userLink = router.query.userId;

  return (
    <div className={classes.navbar}>
      <Image src="/quiz.svg" width="136" height="61" />
      <ul className={classes['nav-items']}>
        <li className={classes['nav-link']}>
          <Link href={`/${userLink}/dashboard`}>{leaderboard}</Link>
          <span>Dashboard</span>
        </li>
        <li className={classes['nav-link']}>
          <Link href={`/${userLink}/test`}>{assignment}</Link>
          <span>Assignment</span>
        </li>
        <li className={classes['nav-link']}>
          <Link href={`/${userLink}`}>{account}</Link>
          <span>Personal info</span>
        </li>
      </ul>
      <button className={classes.logout} type="button" onClick={props.onLogout}>
        {logout}
        <span>Log Out</span>
      </button>
    </div>
  );
}
