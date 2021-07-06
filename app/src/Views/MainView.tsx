import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loadData } from '../Store/Actions/data'
import { useEffect } from 'react';


const MainView = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: any) => state.data.jsonFile)
  console.log(JSON.stringify(data))

  const getDataFromRedux = () => {
    dispatch(loadData())
  }

  return (
    <div className="App">
      <h1>Tuulituhohaukka 🌪 💥 🦅 </h1>
      <button onClick={() => getDataFromRedux()}>
        Load data from redux
      </button>
    </div>
  );
}

export default MainView;