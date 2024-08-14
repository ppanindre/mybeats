import { foodActionTypes } from "./FoodActionTypes";

const initialState = {
    foodData: {},
    foodCache: {},
    foodTrendCard: {},
    foodTrendCardDataDashboard: {},
    foodDataStore: {},
    isDeleted: false,
};

export const FoodReducer = (state = initialState, action) => {
    switch (action.type) {
        case foodActionTypes.SET_FOOD_DATA: {
            const { foodData, date } = action.payload;
            return {
                ...state,
                foodDataStore: {
                    ...state.foodDataStore,
                    [date]: foodData,
                },
            };
        }

        case foodActionTypes.FETCH_FOOD_DATA: {
            const { foodData, date } = action.payload;

            console.log("food data in dashboard", foodData);

            return {
                ...state,
                foodCache: {
                    ...state.foodCache,
                    [date]: foodData,
                },
                foodData: foodData,
            };
        }

        case foodActionTypes.DELETE_FOOD_DATA: {
            const { isDeleted } = action.payload;
            return {
                ...state,
                isDeleted: isDeleted,
            };
        }

        case foodActionTypes.FETCH_FOOD_TRENDCARD: {
            return {
                ...state,
                foodTrendCard: action.payload,
            };
        }

        case foodActionTypes.FETCH_DASHBOARD_FOOD_TRENDCARD: {
            return {
                ...state,
                foodTrendCardDataDashboard: action.payload,
            };
        }

        case foodActionTypes.EMPTY_FOOD_DATA: {
            return {
                foodData: {},
                foodCache: {},
                foodTrendCard: {},
                foodTrendCardDataDashboard: {},
            };
        }

        default: {
            return state;
        }
    }
};
