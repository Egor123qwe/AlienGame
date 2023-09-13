import s from './typeWarnings.module.css';

function TypeWarning(props) {

  let message = ""
  if (props.message == "") {
    message = ""
  }

  return (
    <div className = {s.Data}>
      {message}
    </div>
  );
}

export default TypeWarning;