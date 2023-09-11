import { Outlet } from 'react-router-dom';
import s from './home.module.css';

function Home() {

  return (
    <div className={s.Home}>
        <Outlet />
    </div>
  );
}

export default Home;