import React from 'react';
import './App.css';
import Store from './store/GlobalState';

import Map from './components/Map';
import Nav from './components/Nav';
import Chart from './components/Chart';

function App() {
  return (
    <Store>
      <Map />
      <Nav />
      <Chart />
    </Store>
  );
}

export default App;
