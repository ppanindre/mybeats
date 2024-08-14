import { notificationTypes } from "./notificationTypes";

const initialState = {
    latestNotification: undefined,
};

export const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case notificationTypes.FETCH_LATEST_NOTIFICATION: {
            const { latestNotification } = action.payload;
            return {
                latestNotification: latestNotification,
            };
        }

        default: {
            return state;
        }
    }
};
