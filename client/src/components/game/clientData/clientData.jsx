import s from './clientData.module.css';

function ClientData(props) {

  return (
    <div className = {s.Data}>
      <div>You on the <span className={s.Green}>{props.Pifloor}</span> floor</div>
      <div>alient on the <span className={s.Green}>{props.Alfloor}</span> floor</div>
      { props.isFind ? 
        <div className={s.Green}>Elixir is find</div> : 
        <div>you should to find the <span className={s.Green}>Elixir</span></div>
      }
    </div>
  );
}

export default ClientData;