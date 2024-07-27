import { SET_IMAGE_URI, CLEAR_IMAGE_URI } from '../types/imageActionTypes';

export const setImageUri = (uri) => (dispatch) => {
    dispatch({
        type: SET_IMAGE_URI,
        payload: uri,
    });
};

export const clearImageUri = () => (dispatch) => {
    dispatch({
        type: CLEAR_IMAGE_URI,
    });
};
