import { View, Text } from "react-native";
import React from "react";
import { PaperSelect } from "react-native-paper-select";
import { theme } from "../../../../tailwind.config";

const MultiSelectInput = ({
    label,
    value,
    onSelection,
    arrayList = [],
    selectedArrayList = [],
    multiEnable,
    hideSearchBox,
}) => {
    return (
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
                marginBottom: 0
            }}
            textInputStyle={{
                height: 55,
            }}
            textInputOutlineStyle={{
                borderWidth: 1,
            }}
            theme={{
                colors: {
                    primary: theme.colors.primary,
                },
            }}
        />
    );
};

export default MultiSelectInput;
