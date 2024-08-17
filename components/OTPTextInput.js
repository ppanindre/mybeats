import React, { forwardRef } from "react";
import OTPTextView from "react-native-otp-textinput";

import { customTheme } from "../constants/themeConstants";

const OTPTextInput = forwardRef(({ handleTextChange }, ref) => {
  return (
      <OTPTextView
          ref={ref}
          handleTextChange={(otp) => handleTextChange(otp)}
          inputCount={6} // total number of digits allowed in the otp
          containerStyle={{
              flex: 1,
          }}
          tintColor={customTheme.colors.primary}
          offTintColor={customTheme.colors.darkSecondary}
          textInputStyle={{
              backgroundColor: customTheme.colors.darkSecondary, // background color of the otp box
              color: customTheme.colors.primary,
              width: 40,
              height: 40,
              borderRadius: 5,
          }}
      />
  );
});
export default OTPTextInput;
