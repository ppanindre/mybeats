import { UserActionTypes } from "./UserActionTypes";

const initialState = {};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SET_LISTENER_USER_DATA: {
      const { userData } = action.payload;
      return {
        ...userData,
      };
    }

    case UserActionTypes.EMPTY_USER_DATA: {
      return {}
    }

    default: {
      return state;
    }
  }
};
