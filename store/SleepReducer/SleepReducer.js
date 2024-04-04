import { SleepActionTypes } from "./SleepActionTypes";

const initialState = {
  sleepDataStore: {},
};

export const SleepReducer = (state = initialState, action) => {
  switch (action.type) {
    case SleepActionTypes.SET_NEW_SLEEP_DATA: {
      const { sleepData, date } = action.payload;

      return {
        sleepDataStore: {
          ...state.sleepDataStore,
          [date]: sleepData,
        },
      };
    }

    case SleepActionTypes.EMPTY_SLEEP_DATA: {
      return {
        sleepDataStore: {}
      }
    }

    default: {
      return state;
    }
  }
};
