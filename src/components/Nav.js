import React, { useContext } from 'react';
import { StoreContext } from '../store/GlobalState';

const Nav = () => {
  const [state, dispatch] = useContext(StoreContext);

  function _handleTractClick() {
    dispatch({ type: 'SET_TRACTS', payload: !state.tracts });
  }

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
