// Component for adding KC neighborhoods layer to map

// Dependency imports
import React, { useContext, useCallback } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';

// Relative imports
import { StoreContext } from '../store/GlobalState';
const kcNeighborhoodsLayer = require('../data/kc-neighborhoods.json');

const KCneighborhoods = () => {
  const [state, dispatch] = useContext(StoreContext);

  // Initializing default polygon/feature fill values
  let polygonPaint = (MapboxGL.FillPaint = {
    'fill-color': '#088',
    'fill-opacity': 0.5,
  });

  // Initializing default boundary values
  let linePaint = (MapboxGL.LinePaint = {
    'line-color': '#088',
    'line-width': 2,
  });

  /**
   * A function expression to extract Neighborhood name using regEx
   * @param {string} shid - The SHID property of a neighborhood
   */
  const getNeighborhoodName = (shid) => {
    let nameSplit = shid.match('(?<=neighborhood:).*');
    return nameSplit[0].replace(/_/g, ' ').toUpperCase();
  };

  const getFeatureInfo = (event) => {
    dispatch({
      type: 'SET_DALONE',
      payload: event.features[0].properties['pop-commute-drive_alone'],
    });
    dispatch({
      type: 'SET_DPOOL',
      payload: event.features[0].properties['pop-commute-drive_carpool'],
    });
    dispatch({
      type: 'SET_PTRANSPORT',
      payload: event.features[0].properties['pop-commute-public_transit'],
    });
    dispatch({
      type: 'SET_WALK',
      payload: event.features[0].properties['pop-commute-walk'],
    });
    dispatch({
      type: 'SET_SUBHEADING',
      payload: `${getNeighborhoodName(event.features[0].properties['shid'])}`,
    });
    dispatch({ type: 'SET_INTROMSG', payload: false });
    dispatch({ type: 'SET_CHART', payload: true });
  };

  // Change mouse cursor to pointer on hover over polygons/neighborhoods
  const changeMouseToPointer = useCallback((event) => {
    const map = event.target;
    map.getCanvas().style.cursor = 'pointer';
  }, []);

  // Revert mouse cursor style
  const changeMouseToDefault = useCallback(
    (event) => {
      dispatch({
        type: 'SET_OVERLAY',
        payload: false,
      });
      const map = event.target;
      map.getCanvas().style.cursor = '';
    },
    [dispatch]
  );

  // Display Neighborhood name as a map overlay
  const showInfo = useCallback(
    (event) => {
      dispatch({
        type: 'SET_OVERLAYMSG',
        payload: `${getNeighborhoodName(event.features[0].properties['shid'])}`,
      });
      dispatch({
        type: 'SET_OVERLAY',
        payload: true,
      });
    },
    [dispatch]
  );

  return (
    <>
      {state.neighborhoods && (
        <>
          <GeoJSONLayer
            data={kcNeighborhoodsLayer}
            fillPaint={polygonPaint}
            fillOnClick={getFeatureInfo}
            fillOnMouseEnter={changeMouseToPointer}
            fillOnMouseLeave={changeMouseToDefault}
            fillOnMouseMove={showInfo}
          />
          <GeoJSONLayer data={kcNeighborhoodsLayer} linePaint={linePaint} />
        </>
      )}
    </>
  );
};

export default KCneighborhoods;
