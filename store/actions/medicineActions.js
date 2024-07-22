import { SET_NEW_MEDICINE, CLEAR_NEW_MEDICINE } from '../types/medicineActionTypes';

export const setNewMedicine = (medicine) => (dispatch) => {
    dispatch({
        type: SET_NEW_MEDICINE,
        payload: medicine,
    });
};

export const clearNewMedicine = () => (dispatch) => {
    dispatch({
        type: CLEAR_NEW_MEDICINE,
    });
};
