import classes from './InfoTable.module.css';

export default function InfoTable(props) {
  return (
    <table className={`${classes.table} ${classes[props.className]}`}>
      <tbody>
        {props.details.map((el, i) => (
          <tr key={Math.random().toString()}>
            <td>{el[0]}</td>
            <td>{el[1] || <span>&#151;</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
