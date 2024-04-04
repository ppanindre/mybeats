import { activityActionTypes } from "./ActivityActionTypes";

const initialState = {
  activityRate: [],
  acitivityIntraday: [],
  activitiesIntradayCache: {},
  trendCardData: {},
  ActivitytrendCardDataDashboard: {},
  activityIntradayStore: {},
  activityDataStore: {},
};

export const ActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case activityActionTypes.SET_ACTIVITY_DATA: {
      const { activityData, date } = action.payload;
      return {
        ...state,
        activityDataStore: {
          ...state.activityDataStore,
          [date]: activityData,
        },
      };
    }

    case activityActionTypes.SET_ACTIVITY_INTRADAY_DATA: {
      const { activityIntradayData, date } = action.payload;
      return {
        ...state,
        activityIntradayStore: {
          ...state.activityIntradayStore,
          [date]: activityIntradayData,
        },
      };
    }

    case activityActionTypes.FETCH_ACTIVITY_RATE: {
      return {
        ...state,
        activityRate: action.payload,
      };
    }

    case activityActionTypes.FETCH_ACTIVITY_INTRADAY: {
      const { acitivityIntraday, date } = action.payload;

      return {
        ...state,
        activitiesIntradayCache: {
          ...state.activitiesIntradayCache,
          [date]: acitivityIntraday,
        },
        acitivityIntraday: acitivityIntraday,
      };
    }

    case activityActionTypes.FETCH_ACTIVITY_TRENDCARD: {
      return {
        ...state,
        trendCardData: action.payload,
      };
    }

    case activityActionTypes.FETCH_DASHBOARD_ACTIVITY_TRENDCARD: {
      // console.log("action", action.payload)

      return {
        ...state,
        ActivitytrendCardDataDashboard: action.payload,
      };
    }

    case activityActionTypes.EMPTY_ACTIVITY_DATA: {
      return {
        activityRate: [],
        acitivityIntraday: [],
        activitiesIntradayCache: {},
        trendCardData: {},
        ActivitytrendCardDataDashboard: {},
      };
    }

    default: {
      return state;
    }
  }
};
