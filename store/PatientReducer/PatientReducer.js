import { patientActionType } from "./PatientActionType";

const initialState = {
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    phoneNumber: null,
    address: null,
    zipcode: null,
};

export const PatientReducer = (state = initialState, action) => {
    switch (action.type) {
        case patientActionType.SET_PATIENT: {
            const { patientData } = action.payload;
            return {
                ...state,
                id: patientData.id,
                firstname: patientData.firstname,
                lastname: patientData.lastname,
                email: patientData.email,
                phoneNumber: patientData.email,
                address: patientData.address,
                zipcode: patientData.zipcode,
            };
        }

        default: {
            return state;
        }
    }
};
