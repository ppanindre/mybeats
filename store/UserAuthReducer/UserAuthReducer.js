import { userAuthActionTypes } from "./UserAuthActionTypes";

const initialState = {
  user: null,
  isLoading: false,
  isHeartRateLoading: true,
  isSleepLoading: false,
  showSkipDevice: true,
  startTourGuide: false,
  emailForOtp: "",
};

export const UserAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case userAuthActionTypes.SET_USER_DATA: {
      // Setting the user state in the redux store
      const { userData } = action.payload;
      return {
        ...state,
        user: userData,
      };
    }

    case userAuthActionTypes.LOGOUT_USER: {
      return {
        user: null,
        isLoading: false,
        isHeartRateLoading: true,
        isSleepLoading: false,
      };
    }

    case userAuthActionTypes.SET_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading: isLoading,
      };
    }

    case userAuthActionTypes.SET_HEARTRATE_DATA_LOADING: {
      const { isLoading } = action.payload;

      console.log("is heart rate loading", isLoading);
      return {
        ...state,
        isHeartRateLoading: isLoading,
      };
    }

    case userAuthActionTypes.SET_SLEEP_DATA_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isSleepLoading: isLoading,
      };
    }

    case userAuthActionTypes.SHOW_SKIP_ON_ADD_DEVICE: {
      const { showSkip } = action.payload;

      return {
        ...state,
        showSkipDevice: showSkip,
      };
    }

    case userAuthActionTypes.START_TOUR_GUIDE: {
      const { startTourGuide } = action.payload;

      return {
        ...state,
        startTourGuide: startTourGuide,
      };
    }

    case userAuthActionTypes.SET_EMAIL_FOR_OTP: {
      const { enteredEmail } = action.payload;
      return {
        ...state,
        emailForOtp: enteredEmail,
      };
    }

    default: {
      return state;
    }
  }
};
