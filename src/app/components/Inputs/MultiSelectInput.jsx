import React from "react";
import { PaperSelect } from "react-native-paper-select";
import { theme } from "../../../../tailwind.config";
import { View, Text } from "react-native";
import { Placeholder } from "@aws-amplify/ui-react";

const MultiSelectInput = ({
    label,
    value,
    onSelection,
    arrayList = [],
    selectedArrayList = [],
    multiEnable,
    hideSearchBox,
    error,
}) => {
    return (
        <View className="space-y-2">
            <PaperSelect
                label={label}
                value={value}
                textInputMode="outlined"
                onSelection={onSelection} // function to handle item selection
                arrayList={arrayList} // list of the values
                selectedArrayList={selectedArrayList} // list of the selected items
                multiEnable={multiEnable} // is user able to select multiple items
                hideSearchBox={hideSearchBox} // to hide the search box
                containerStyle={{
                    marginBottom: 0,
                }}
                textInputStyle={{
                    height: 55,
                }}
                textInputOutlineStyle={{                    
                    borderWidth: error ? 2 : 1,
                    borderColor: error ? theme.colors.error : theme.colors.dark,
                }}
                checkboxProps={{
                    checkboxColor: theme.colors.primary, // set color of checkbox colors
                }}
                theme={{
                    colors: {
                        primary: theme.colors.primary,
                        error: theme.colors.error,
                        placeholder: theme.colors.error
                    },
                }}
            />

            {/* Error Message */}
            {error && <Text className="text-error">{error}</Text>}
        </View>
    );
};

export default MultiSelectInput;
