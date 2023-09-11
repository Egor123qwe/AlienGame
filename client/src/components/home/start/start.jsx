import s from './start.module.css';

function Start() {

  return (
    <>
      <div id={s.hostBtn} className={s.btn}><span className={s.border}></span>Host</div>
      <div id={s.clientBtn} className={s.btn}><span className={s.border}></span>Client</div>
    </>
  );
}

export default Start;