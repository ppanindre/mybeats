import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import TextInputBoxWithIcon from "../../../../components/Utilities/TextInputBoxWithIcon";
import { theme } from "../../../../tailwind.config";

const SearchBar = ({ searchInput, onSearchInput, onSearchSubmit, onBackPress }) => {
  return (
    <View className="relative px-5 pb-3 flex-row items-center space-x-3 border-b border-darkSecondary">
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons color={theme.colors.dark} name="arrow-back" size={24} />
      </TouchableOpacity>
      
      <View className="h-[50] flex-1">
        <TextInputBoxWithIcon
          onChangeText={onSearchInput}
          value={searchInput}
          placeholder="Search Doctor, Condition, Pincode"
          onSubmitEditing={onSearchSubmit}
        />
      </View>
    </View>
  );
};

export default SearchBar;
