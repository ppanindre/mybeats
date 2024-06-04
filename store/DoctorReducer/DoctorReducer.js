import { doctorActionTypes } from "./DoctorActionTypes";

const initialState = {
    upcomingAppointments: [],
    pastAppointments: [],
    availabilitySlots: []
};

export const DoctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case doctorActionTypes.SET_UPCOMING_APPOINTMENTS: {
            const { upcomingAppointments } = action.payload;

            return {
                ...state,
                upcomingAppointments: upcomingAppointments,
            };
        }

        case doctorActionTypes.SET_PAST_APPOINTMENTS: {
            const { pastAppointments } = action.payload;

            return {
                ...state,
                pastAppointments: pastAppointments,
            };
        }

        default: {
            return state;
        }
    }
};
