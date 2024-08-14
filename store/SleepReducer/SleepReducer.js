import { SleepActionTypes } from "./SleepActionTypes";

const initialState = {
    sleepDataStore: {},
    sleepIntradayStore: {},
};

export const SleepReducer = (state = initialState, action) => {
    switch (action.type) {
        case SleepActionTypes.SET_NEW_SLEEP_DATA: {
            const { sleepData, date } = action.payload;

            return {
                ...state,
                sleepDataStore: {
                    ...state.sleepDataStore,
                    [date]: sleepData,
                },
            };
        }

        case SleepActionTypes.SET_NEW_SLEEP_INTRADAY: {
            const { sleepIntraday, date } = action.payload;

            return {
                ...state,
                sleepIntradayStore: {
                    ...state.sleepIntradayStore,
                    [date]: sleepIntraday,
                },
            };
        }

        case SleepActionTypes.EMPTY_SLEEP_DATA: {
            return {
                sleepDataStore: {},
                sleepIntradayStore: []
            };
        }

        default: {
            return state;
        }
    }
};
