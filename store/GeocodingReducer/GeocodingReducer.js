import { GEOCODE_REQUEST, GEOCODE_SUCCESS, GEOCODE_FAILURE } from './GeocodingActions';

const initialState = {
  loading: false,
  coordinates: null,
  error: null,
};

const GeocodingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GEOCODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GEOCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        coordinates: action.payload,
      };
    case GEOCODE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default GeocodingReducer;
