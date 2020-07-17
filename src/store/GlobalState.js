import React, { createContext, useReducer } from 'react';

export const StoreContext = createContext({});

const initialState = {
  tracts: true,
  neighborhoods: false,
  intromsg: true,
  overlay: false,
  overlaymsg: '',
  chart: false,
  driveAlone: 0,
  drivePool: 0,
  publicTransport: 0,
  walk: 0,
  subHeading: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TRACTS':
      return {
        ...state,
        tracts: action.payload,
      };
    case 'SET_NBHD':
      return {
        ...state,
        neighborhoods: action.payload,
      };
    case 'SET_INTROMSG':
      return {
        ...state,
        intromsg: action.payload,
      };
    case 'SET_OVERLAY':
      return {
        ...state,
        overlay: action.payload,
      };
    case 'SET_OVERLAYMSG':
      return {
        ...state,
        overlaymsg: action.payload,
      };
    case 'SET_CHART':
      return {
        ...state,
        chart: action.payload,
      };

    case 'SET_DALONE':
      return {
        ...state,
        driveAlone: action.payload,
      };

    case 'SET_DPOOL':
      return {
        ...state,
        drivePool: action.payload,
      };

    case 'SET_PTRANSPORT':
      return {
        ...state,
        publicTransport: action.payload,
      };

    case 'SET_WALK':
      return {
        ...state,
        walk: action.payload,
      };

    case 'SET_SUBHEADING':
      return {
        ...state,
        subHeading: action.payload,
      };

    default:
      return state;
  }
}

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
