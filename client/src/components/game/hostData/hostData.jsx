import s from './hostData.module.css';

function HostData(props) {

  return (
    <div className = {s.Data}>
      <div>You on the <span className={s.Green}>{props.Pifloor}</span> floor</div>
      <div>alient on the <span className={s.Green}>{props.Alfloor}</span> floor</div>
    </div>
  );
}

export default HostData;