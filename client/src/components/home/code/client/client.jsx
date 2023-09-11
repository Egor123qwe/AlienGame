import { Navigate } from 'react-router-dom';
import s from './client.module.css';

function Client() {

  return (
    <>
      <input type="text" name="code" placeholder="code" id={s.input} className={s.code}></input>
      <div id={s.submitBtn} className={s.btn}>
        <span className={s.border}></span>Submit
      </div>
    </>
  );
}

export default Client;