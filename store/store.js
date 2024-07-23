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
} from "./reducers/appointmentReducers";
import { primarySpecializationReducer } from "./reducers/primarySpecializationReducers";
import geocodingGetReducer from "./reducers/geocodingGetReducer";
import imageRecognitionGetReducer from "./reducers/imageRecognitionGetReducer";
import {
  prescriptionCreateReducer,
  prescriptionGetReducer,
  prescriptionListReducer
} from "./reducers/prescriptionReducers"
import imageReducer from "./reducers/imageReducer";
import medicineReducer from "./reducers/medicineReducer";


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
    geocodingGetReducer: geocodingGetReducer,
    imageRecognitionGetReducer: imageRecognitionGetReducer,
    PatientReducer,
    DoctorReducer,
    imageReducer,
    medicineReducer,
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
    primarySpecializationReducer
    prescriptionCreate: prescriptionCreateReducer,
    prescriptionGet: prescriptionGetReducer,
    prescriptionList: prescriptionListReducer,
});

// Redux store containing reducers and the middleware
export const store = configureStore({
    reducer: reducers,
    middleware: [thunk],
});
