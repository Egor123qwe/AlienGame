import { NavLink, Navigate } from 'react-router-dom';
import s from './start.module.css';

function Start() {

  return (
    <>
      <div id={s.hostBtn} className={s.btn}><span className={s.border}></span>Host</div>
      <NavLink to="/home/client" id={s.clientBtn} className={s.btn}>
        <span className={s.border}></span>Client
      </NavLink>
    </>
  );
}

export default Start;