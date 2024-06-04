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
import { PatientReducer } from "./PatientReducer/patientReducer";

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
    PatientReducer,
});

// Redux store containing reducers and the middleware
export const store = configureStore({
    reducer: reducers,
    middleware: [thunk],
});
