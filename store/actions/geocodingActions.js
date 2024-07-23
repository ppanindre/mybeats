import {
    GEOCODING_GET_REQUEST,
    GEOCODING_GET_SUCCESS,
    GEOCODING_GET_FAILURE,
} from '../types/geocodingActionTypes';
import axios from 'axios';

const apiKey = 'AIzaSyC1hiS3sXkvQPqEodYESWOLBYkUsyR8Tv4'; // Google Maps API key

export const geocodeAddress = (address, city, state, zipcode) => async (dispatch) => {
    dispatch({ type: GEOCODING_GET_REQUEST });

    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: `${address}, ${city}, ${state}, ${zipcode}, India`,
                key: apiKey,
            },
        });

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            dispatch({
                type: GEOCODING_GET_SUCCESS,
                payload: { latitude: lat, longitude: lng },
            });
        } else {
            dispatch({
                type: GEOCODING_GET_FAILURE,
                payload: `Geocoding API error: ${response.data.status}`,
            });
        }
    } catch (error) {
        dispatch({
            type: GEOCODING_GET_FAILURE,
            payload: `Geocoding API error: ${error.message}`,
        });
    }
};
