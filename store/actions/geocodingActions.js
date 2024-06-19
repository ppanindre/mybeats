import {
    GEOCODING_GET_REQUEST,
    GEOCODING_GET_SUCCESS,
    GEOCODING_GET_FAILURE
} from '../types/geocodingActionTypes';
import axios from 'axios';

const apiKey = 'AIzaSyC1hiS3sXkvQPqEodYESWOLBYkUsyR8Tv4'; // Google Maps API key

export const geocodingGetRequest = () => ({
    type: GEOCODING_GET_REQUEST,
});

export const geocodingGetSuccess = (coordinates) => ({
    type: GEOCODING_GET_SUCCESS,
    payload: coordinates,
});

export const geocodingGetFailure = (error) => ({
    type: GEOCODING_GET_FAILURE,
    payload: error,
});

export const geocodeAddress = (address, city, state, zipcode) => async (dispatch) => {
    dispatch(geocodingGetRequest());

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: `${address}, ${city}, ${state}, ${zipcode}, India`,
                key: apiKey,
            }
        });

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            dispatch(geocodingGetSuccess({ latitude: lat, longitude: lng }));
        } else {
            dispatch(geocodingGetFailure(`Geocoding API error: ${response.data.status}`));
        }
    } catch (error) {
        dispatch(geocodingGetFailure(`Geocoding API error: ${error.message}`));
    }
};
