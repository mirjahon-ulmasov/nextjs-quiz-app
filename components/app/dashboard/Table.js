import classes from './Table.module.css';

function rowStyle(index) {
  return index === 0
    ? classes.gold
    : index === 1
    ? classes.silver
    : index === 2
    ? classes.bronze
    : '';
}

export default function Table(props) {
  const userList = props.users;

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Time</th>
          <th>Date</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user, i) => {
          const minutes = Math.floor(user.time / 60);
          const seconds = user.time - minutes * 60;

          return (
            <tr key={i} className={rowStyle(i)}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</td>
              <td>{user.date}</td>
              <td>{user.score}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
