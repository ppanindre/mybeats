import { profileActionTypes } from "./ProfileActionTypes";

export const ProfileActionCreators = {
  setProfileData: (data) => ({
    type: profileActionTypes.SET_PROFILE_DATA,
    payload: { profileData: data.profileData },
  }),

  updateDevices: (newDevice) => {
    return async (dispatch) => {
    };
  },
};
