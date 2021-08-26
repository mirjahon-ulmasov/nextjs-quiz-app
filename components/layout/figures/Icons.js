import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faChevronRight,
  faClock,
  faTrophy,
  faAward,
} from '@fortawesome/free-solid-svg-icons';

export const arrow_right = (
  <FontAwesomeIcon
    icon={faChevronRight}
    size="1x"
    color="#fff"
    style={{ marginLeft: 5 }}
  />
);

export const clock = (
  <FontAwesomeIcon
    icon={faClock}
    size="1x"
    color="#77abff"
    style={{ marginRight: 10 }}
  />
);

export const trophy = (
  <FontAwesomeIcon
    icon={faTrophy}
    size="1x"
    color="#dde665"
    style={{ marginRight: 10 }}
  />
);

export const award = <FontAwesomeIcon icon={faAward} size="8x" color="#fff" />;

export const chart = (
  <FontAwesomeIcon
    icon={faChartBar}
    size="1x"
    color="#ff6a6a"
    style={{ marginRight: 10 }}
  />
);

export const account = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40px"
    viewBox="0 0 24 24"
    width="40px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

export const assignment = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40px"
    viewBox="0 0 24 24"
    width="40px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" />
  </svg>
);

export const leaderboard = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    height="40px"
    viewBox="0 0 24 24"
    width="40px"
    fill="#FFFFFF"
  >
    <rect fill="none" height="24" width="24" />
    <g>
      <path d="M7.5,21H2V9h5.5V21z M14.75,3h-5.5v18h5.5V3z M22,11h-5.5v10H22V11z" />
    </g>
  </svg>
);

export const logout = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="40px"
    viewBox="0 0 24 24"
    width="40px"
    fill="#FFFFFF"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
  </svg>
);
