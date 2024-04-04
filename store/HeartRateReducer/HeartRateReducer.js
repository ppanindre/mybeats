import { heartActionTypes } from "./HeartRateActionTypes";

const initialState = {
  // improved states for the heart rates
  heartRateDataStore: {},
  heartRateIntradayStore: {},
};

export const HeartRateReducer = (state = initialState, action) => {
  switch (action.type) {
    case heartActionTypes.SET_HEARTRATE_DATA: {
      const { heartRateData, date } = action.payload;

      return {
        ...state,
        heartRateDataStore: {
          ...state.heartRateDataStore,
          [date]: heartRateData,
        },
      };
    }

    case heartActionTypes.SET_HEARTRATE_INTRADAY_DATA: {
      const { heartRateIntradayData, date } = action.payload;

      return {
        ...state,
        heartRateIntradayStore: {
          ...state.heartRateIntradayStore,
          [date]: heartRateIntradayData,
        },
      };
    }

    case heartActionTypes.EMPTY_HEART_RATE_DATA: {
      return {
        heartRateDataStore: {},
        heartRateIntradayStore: {},
      };
    }

    default: {
      return state;
    }
  }
};
