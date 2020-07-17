import React, { useContext } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { useMediaQuery } from 'react-responsive';
import { StoreContext } from '../store/GlobalState';

import KCtracts from './KCtracts';
import KCneighborhoods from './KCneighborhoods';
// import { SECRET_KEY } from '../config';

const SECRET_KEY = process.env.REACT_APP_MAPBOX_KEY;

const Mapbox = ReactMapboxGl({
  accessToken: SECRET_KEY,
  minZoom: 8,
});

const stateful = {
  center: [-94.578331, 39.099724],
  zoom: [9],
};

const mapboxStyle = 'mapbox://styles/mapbox/dark-v10';

const Map = () => {
  const [state] = useContext(StoreContext);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  let contStyle;

  isTabletOrMobile
    ? (contStyle = {
        height: '55vh',
        width: '100vw',
        position: 'absolute',
        top: '0',
        left: '0',
      })
    : (contStyle = {
        height: '100vh',
        width: '70vw',
        position: 'absolute',
        top: '0',
        left: '0',
      });

  return (
    <>
      <div>
        <Mapbox
          // eslint-disable-next-line
          style={mapboxStyle}
          center={stateful.center}
          zoom={stateful.zoom}
          containerStyle={contStyle}
        >
          <KCtracts />
          <KCneighborhoods />
          {state.overlay && (
            <div className="overlay-msg">
              <p>{state.overlaymsg}</p>
            </div>
          )}
        </Mapbox>
      </div>
    </>
  );
};

export default Map;
