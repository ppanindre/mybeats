import React from "react";
import { PaperSelect } from "react-native-paper-select";
import { customTheme } from "../constants/themeConstants";

const MultiSelect = ({
  label,
  value,
  onSelection,
  arrayList,
  selectedArrayList,
  multiEnable,
  toHideSearchBox
}) => {
  return (
    <PaperSelect
      dialogCloseButtonText="Close"
      label={label}
      textInputMode="outlined"
      value={value}
      onSelection={onSelection} // function to handle item selection
      arrayList={arrayList} // list of the values
      selectedArrayList={selectedArrayList} // list of the selected items
      multiEnable={multiEnable} // is user able to select multiple items
      hideSearchBox={toHideSearchBox} // to hide the search box
      textInputStyle={{
        height: 52,
      }}
      textInputProps={{
        outlineColor: customTheme.colors.dark,
      }}
      dialogTitleStyle={{
        color: customTheme.colors.dark,
      }}
      checkboxProps={{
        checkboxColor: customTheme.colors.primary, // set color of checkbox colors
      }}
      theme={{
        colors: { primary: customTheme.colors.primary },
      }}
    />
  );
};

export default MultiSelect;
