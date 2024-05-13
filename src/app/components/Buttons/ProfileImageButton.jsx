import React from "react";
import { TouchableOpacity } from "react-native";
import { PlusIcon } from "react-native-heroicons/outline";
import { theme } from "../../../../tailwind.config";

const ProfileImageButton = () => {
    return (
        <TouchableOpacity className="h-[150] w-[150] border-2 border-primary rounded-full items-center justify-center">
            <PlusIcon color={theme.colors.primary} size={30} />
        </TouchableOpacity>
    );
};

export default ProfileImageButton;
