import { useEffect, useState } from 'react';
import s from './game.module.css';
import instance from '../../API/API';
import { useLocation, useParams } from 'react-router-dom';
import Map from './map/map';
import TypeWarning from './typeWarnings/typeWarnings';

function Game() {

  const [map, setMap] = useState({map: '', height: 0, width: 0});

  let params = useParams()
  console.log(params.code)

  useEffect(() => {
    instance.get('map/' + params.code)
      .then(response => {

        setMap(
          { map: response.data.maze, 
            height: response.data.height, 
            width: response.data.width 
          })
        console.log(response)
      })
      .catch(error => {});
  }, []);
  //2. устанавливаем сокет связь

  return (
    <div className = {s.Game}>
      <Map map={map} user={params.user}/>
      <TypeWarning />
    </div>
  );
}

export default Game;