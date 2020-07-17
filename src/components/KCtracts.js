// Component for adding KC tracts layer to map

// Dependency imports
import React, { useContext, useCallback } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import * as MapboxGL from 'mapbox-gl';

// Relative imports
import { StoreContext } from '../store/GlobalState';
const kcTractsLayer = require('../data/kc-tracts.json');

const KCtracts = () => {
  const [state, dispatch] = useContext(StoreContext);

  // Initializing default polygon/feature fill values
  let polygonPaint = (MapboxGL.FillPaint = {
    'fill-color': '#627BC1',
    'fill-opacity': 0.5,
  });

  // Initializing default boundary values
  let linePaint = (MapboxGL.LinePaint = {
    'line-color': '#627BC1',
    'line-width': 2,
  });

  /**
   * A function expression to extract Tract ID using regEx
   * @param {string} shid - The SHID property of a tract
   */
  const getTractID = (shid) => {
    let numSplit = shid.match('(?<=tract:).*');
    return numSplit[0];
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
      payload: `Tract ${getTractID(event.features[0].properties['shid'])}`,
    });
    dispatch({ type: 'SET_INTROMSG', payload: false });
    dispatch({ type: 'SET_CHART', payload: true });
  };

  // Change mouse cursor to pointer on hover over polygons/tracts
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

  // Display Tract ID as a map overlay
  const showInfo = useCallback(
    (event) => {
      dispatch({
        type: 'SET_OVERLAYMSG',
        payload: `Tract ${getTractID(event.features[0].properties['shid'])}`,
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
      {state.tracts && (
        <>
          <GeoJSONLayer
            data={kcTractsLayer}
            fillPaint={polygonPaint}
            fillOnClick={getFeatureInfo}
            fillOnMouseEnter={changeMouseToPointer}
            fillOnMouseLeave={changeMouseToDefault}
            fillOnMouseMove={showInfo}
          />
          <GeoJSONLayer data={kcTractsLayer} linePaint={linePaint} />
        </>
      )}
    </>
  );
};

export default KCtracts;
