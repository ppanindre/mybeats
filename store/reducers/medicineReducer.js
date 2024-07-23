import { SET_NEW_MEDICINE, CLEAR_NEW_MEDICINE } from '../types/medicineActionTypes';

const initialState = {
    newMedicine: null,
};

const medicineReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_MEDICINE:
            return {
                ...state,
                newMedicine: action.payload,
            };
        case CLEAR_NEW_MEDICINE:
            return {
                ...state,
                newMedicine: null,
            };
        default:
            return state;
    }
};

export default medicineReducer;
