import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";

const ModalContainer = ({ children, visible, onClose }) => {
    const [isModalVisible, setIsModalVisible] = useState(visible);

    useEffect(() => {
        setIsModalVisible(visible);
    }, [visible]);

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={onClose}
            style={{ margin: 0, gap: 0, padding: 0 }}
        >
            <View className="bg-light overflow-auto p-5 rounded-t-lg absolute bottom-0 w-[100%] space-y-2">
                {children}
            </View>
        </Modal>
    );
};

export default ModalContainer;
