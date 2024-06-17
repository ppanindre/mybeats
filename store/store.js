import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { UserAuthReducer } from "./UserAuthReducer/UserAuthReducer";
import { UserReducer } from "./UserReducer/UserReducer";
import { ProfileReducer } from "./ProfileReducer/ProfileReducer";
import { DeviceReducer } from "./DeviceReducer/DeviceReducer";
import { ActivityReducer } from "./ActivityReducer/ActivityReducer";
import { HeartRateReducer } from "./HeartRateReducer/HeartRateReducer";
import { SleepReducer } from "./SleepReducer/SleepReducer";
import { FoodReducer } from "./FoodReducer/FoodReducer";
import { DashboardReducer } from "./DashboardReducer/DashboardReducer";
import { PatientReducer } from "./PatientReducer/PatientReducer";
import { DoctorReducer } from "./DoctorReducer/DoctorReducer";
import {
    patientCreateReducer,
    patientGetReducer,
    patientUpdateReducer,
} from "./reducers/patientReducers";
import {
    doctorGetReducer,
    doctorsListReducer,
} from "./reducers/doctorReducers";
import {
    availabilitesByDoctorReducer,
    availabilitiesDeleteReducer,
    availabilityCreateReducer,
    availabilityDeleteReducer,
    availabilityExistsReducer,
} from "./reducers/availabilityReducers";
import {
    appointmentCreateReducer,
    appointmentDeleteReducer,
    appointmentListAvailableReducer,
    appointmentListReducer,
    appointmentsListByDoctorReducer,
} from "./reducers/appointmentReducers";import  GeocodingReducer  from "./GeocodingReducer/GeocodingReducer";
import ImageRecognitionReducer from "./ImageRecognitionReducer/ImageRecognitionReducer";


// Combining every reducer
const reducers = combineReducers({
    UserAuthReducer,
    UserReducer,
    ProfileReducer,
    DeviceReducer,
    ActivityReducer,
    HeartRateReducer,
    SleepReducer,
    FoodReducer,
    DashboardReducer,
  geocoding: GeocodingReducer,
  imageRecognition: ImageRecognitionReducer,
    PatientReducer,
    DoctorReducer,
    patientCreateReducer: patientCreateReducer,
    patientUpdateReducer: patientUpdateReducer,
    patientGetReducer: patientGetReducer,
    doctorGetReducer: doctorGetReducer,
    doctorsListReducer: doctorsListReducer,
    availabilityCreateReducer: availabilityCreateReducer,
    appointmentCreateReducer: appointmentCreateReducer,
    appointmentListAvailableReducer: appointmentListAvailableReducer,
    appointmentListReducer: appointmentListReducer,
    appointmentsListByDoctorReducer: appointmentsListByDoctorReducer,
    appointmentDeleteReducer: appointmentDeleteReducer,
    availabilitesByDoctorReducer: availabilitesByDoctorReducer,
    availabilityDeleteReducer: availabilityDeleteReducer,
    availabilityExistsReducer: availabilityExistsReducer,
    availabilitiesDeleteReducer: availabilitiesDeleteReducer,
});

// Redux store containing reducers and the middleware
export const store = configureStore({
    reducer: reducers,
    middleware: [thunk],
});
