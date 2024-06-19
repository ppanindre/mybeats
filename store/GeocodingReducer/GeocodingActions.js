import axios from 'axios';

const apiKey = 'AIzaSyC1hiS3sXkvQPqEodYESWOLBYkUsyR8Tv4'; // Google Maps API key
// file in types - gecodingtype - geocoding_getrequest
// name geocoding_getRequest
export const GEOCODE_REQUEST = 'GEOCODE_REQUEST';
export const GEOCODE_SUCCESS = 'GEOCODE_SUCCESS';
export const GEOCODE_FAILURE = 'GEOCODE_FAILURE';

export const geocodeRequest = () => ({
  type: GEOCODE_REQUEST,
});

export const geocodeSuccess = (coordinates) => ({
  type: GEOCODE_SUCCESS,
  payload: coordinates,
});

export const geocodeFailure = (error) => ({
  type: GEOCODE_FAILURE,
  payload: error,
});

export const geocodeAddress = (address, city, state, zipcode) => async (dispatch) => {
  dispatch(geocodeRequest());

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: `${address}, ${city}, ${state}, ${zipcode}, India`,
        key: apiKey,
      }
    });

    if (response.data.status === 'OK') {
      const { lat, lng } = response.data.results[0].geometry.location;
      dispatch(geocodeSuccess({ latitude: lat, longitude: lng }));
    } else {
      dispatch(geocodeFailure(`Geocoding API error: ${response.data.status}`));
    }
  } catch (error) {
    dispatch(geocodeFailure(`Geocoding API error: ${error.message}`));
  }
};
