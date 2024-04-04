import { profileActionTypes } from "./ProfileActionTypes";

const initialState = {
  profileData: null,
  selectedAvatar: null,
  devices: [],
};

export const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SET_PROFILE_DATA: {
      const { profileData } = action.payload;
      return {
        ...state,
        profileData: profileData,
      };
    }
    case profileActionTypes.SELECT_DEVICE: {
      return state;
    }
    case profileActionTypes.ADD_AVATAR: {
      const { selectedAvatar } = action.payload
      
      return {
        ...state,
        selectedAvatar
      }
    }
    

    default: {
      return state;
    }
  }
};
