import { View } from "react-native";
import React, { useEffect, useState } from "react";
import SwitchInput from "../Inputs/SwitchInput";
import moment from "moment";

const AvailabilitySwitchFrame = ({
    availabilities,
    selectedDate,
    selectChoice,
    selectedChoice,
}) => {
    return (
        <View className="space-y-3">
            {availabilities[moment(selectedDate).format("YYYY-MM-DD")] && (
                <View>
                    <SwitchInput
                        label="Unavailable on this day"
                        onValueChange={(value) =>
                            value
                                ? selectChoice("unavailable")
                                : selectChoice(null)
                        }
                        value={selectedChoice === "unavailable"}
                    />
                </View>
            )}
            <View>
                <SwitchInput
                    label={`Set schedule for all ${moment(
                        selectedDate,
                        "YYYY-MM-DD"
                    ).format("dddd")}s`}
                    onValueChange={(value) =>
                        value ? selectChoice("allDays") : selectChoice(null)
                    }
                    value={selectedChoice === "allDays"}
                />
            </View>
        </View>
    );
};

export default AvailabilitySwitchFrame;
