// Component for creating a Mapbox map

// Dependency imports
import React, { useContext } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { useMediaQuery } from 'react-responsive';

// Relative imports
import KCtracts from './KCtracts';
import { StoreContext } from '../store/GlobalState';
import KCneighborhoods from './KCneighborhoods';
import { SECRET_KEY } from '../config';

// Initializing default Mapbox values
const Mapbox = ReactMapboxGl({
  accessToken: SECRET_KEY,
  minZoom: 8,
});

const mapState = {
  center: [-94.578331, 39.099724],
  zoom: [9],
};

const mapboxStyle = 'mapbox://styles/mapbox/dark-v10';

const Map = () => {
  const [state] = useContext(StoreContext);

  // Media query to change dimensions
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  // Initializing value for Mapbox container style
  let contStyle;

  // Setting up container style based on screen width
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
          // eslint-disable-next-line react/style-prop-object
          style={mapboxStyle}
          center={mapState.center}
          zoom={mapState.zoom}
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
