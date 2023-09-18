import { 
  Navigate, 
  Route, 
  RouterProvider, 
  Routes, 
  createBrowserRouter, 
  createRoutesFromElements 
} from 'react-router-dom';
import Root from './components/Root';
import Home from './components/home/home';
import Start from './components/home/start/start';
import Host from './components/home/code/host/host';
import Client from './components/home/code/client/client';
import Lose from './components/home/result/lose/lose';
import Win from './components/home/result/win/win';
import Game from './components/game/game';

function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/AlienGame/' element={<Root />}>
          <Route path='' element={<Navigate to="home"/>}/>
          <Route path='home/' element={<Home/>}>
            <Route path='' element={<Navigate to="start" />}/>
            <Route path='start'  element={<Start/>}/>
            <Route path='host' element={<Host/>}/>
            <Route path='client' element={<Client/>}/>
            <Route path='lose'  element={<Lose/>}/>
            <Route path='win' element={<Win/>}/>
          </Route>
          <Route path='game/:code/:user' element={<Game/>}/>
      </Route>
    )
  );

  return (
    <Routes>
        <Route path='' element={<Navigate to="home"/>}/>
        <Route path='home/' element={<Home/>}>
            <Route path='' element={<Navigate to="start" />}/>
            <Route path='start'  element={<Start/>}/>
            <Route path='host' element={<Host/>}/>
            <Route path='client' element={<Client/>}/>
            <Route path='lose'  element={<Lose/>}/>
            <Route path='win' element={<Win/>}/>
        </Route>
        <Route path='game/:code/:user' element={<Game/>}/>
    </Routes>
  );
}

export default App;