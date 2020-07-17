// Component for creating a nav to toggle between layers

// Dependency import
import React, { useContext } from 'react';

// Relative import
import { StoreContext } from '../store/GlobalState';

const Nav = () => {
  const [state, dispatch] = useContext(StoreContext);

  // Handle clicks on tract polygons/features
  function _handleTractClick() {
    dispatch({ type: 'SET_TRACTS', payload: !state.tracts });
  }

  // Handle clicks on neighborhood polygons/features
  function _handleNeighborhoodClick() {
    dispatch({ type: 'SET_NBHD', payload: !state.neighborhoods });
  }

  return (
    <>
      <nav className="menu">
        <button
          className="menu-items"
          style={{ background: state.tracts && '#3887be' }}
          onClick={_handleTractClick}
        >
          Tracts
        </button>
        <button
          className="menu-items"
          style={{
            background: state.neighborhoods && '#3887be',
            border: 'none',
          }}
          onClick={_handleNeighborhoodClick}
        >
          Neighborhoods
        </button>
      </nav>
    </>
  );
};

export default Nav;
