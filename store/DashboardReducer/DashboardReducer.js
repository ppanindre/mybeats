import { dashboardActionTypes } from "./DashboardActionTypes"

const initialState = {
  isLoading: false,
  toForceFoodData: false
}

export const DashboardReducer = (state=initialState, action) => {
  switch (action.type) {
    case dashboardActionTypes.SET_DASHBOARD_LOADING: {
      const { isLoading } = action.payload
      
      return {
        ...state,
        isLoading: isLoading
      }
    }

    case dashboardActionTypes.FORCE_FOOD: {
      const {toForceFoodData} = action.payload;

      return {
        ...state,
        toForceFoodData: toForceFoodData
      }
    }

    default: {
      return state
    }
  }
} 