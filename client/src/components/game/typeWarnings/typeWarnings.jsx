import s from './typeWarnings.module.css';

function TypeWarning(props) {
  return (
    <div className = {s.Data}>
      {props.message}
    </div>
  );
}

export default TypeWarning;