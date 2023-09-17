import { 
  Navigate, 
  Route, 
  RouterProvider, 
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
      <Route path='/' element={<Root />}>
          <Route path='/' element={<Navigate to="/home/start" />}/>
          <Route path='/home' element={<Home/>}>
            <Route path='/home' element={<Navigate to="/home/start" />}/>
            <Route path='/home/start'  element={<Start/>}/>
            <Route path='/home/host' element={<Host/>}/>
            <Route path='/home/client' element={<Client/>}/>
            <Route path='/home/result'>
              <Route path='/home/result/lose'  element={<Lose/>}/>
              <Route path='/home/result/win' element={<Win/>}/>
            </Route>
          </Route>
          <Route path='/game/:code/:user' element={<Game/>}/>
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;