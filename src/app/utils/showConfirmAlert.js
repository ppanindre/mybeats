import { Alert } from "react-native";

const showConfirmAlert = (message, onConfirm) => {
    Alert.alert(
        "",
        message,
        [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Yes",
                onPress: onConfirm,
            },
        ],
        { cancelable: false }
    );
};

export default showConfirmAlert;
