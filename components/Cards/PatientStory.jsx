import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../tailwind.config";
import moment from "moment";
import AppButton from "../../src/app/components/Buttons/AppButton";

const PatientStory = ({ story }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const storyText = story?.story || "";  // if story is undefined
    const shouldCollapse = storyText.length > 180; // Customizing based on expected line length

    return (
        <View
            style={{ backgroundColor: theme.colors.light }}
            className="rounded-lg space-y-3"
        >
            <View className="flex-row items-center space-x-5">
                <Image
                    source={require("../../src/app/assets/doc1.webp")}
                    className="w-12 h-12 rounded-full"
                />
                <View className="flex-1">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm font-[appfont-semi]">
                            {story.patientName}
                        </Text>
                        <View className="flex-row items-center space-x-1">
                            <Ionicons name="star" size={14} color="#ffd700" />
                            <Text
                                style={{ color: theme.colors.dark }}
                                className="text-xs"
                            >
                                {story.rating}
                            </Text>
                        </View>
                    </View>
                    <Text className="text-xs font-[appfont] text-dark">
                        {moment(story.date).format("MMMM Do, YYYY")}
                    </Text>
                </View>
            </View>

            <View className="space-y-3">
                <View>
                    {/* story text with collapsible functionality */}
                    <Text className="text-sm font-[appfont] text-dark" numberOfLines={isExpanded ? undefined : 3} ellipsizeMode="tail">
                        {storyText}
                    </Text>
                </View>

                {shouldCollapse && (
                   <View className="items-start">
                        <AppButton
                            onPress={() => setIsExpanded(!isExpanded)}
                            variant="noborder"
                            btnLabel={isExpanded ? "Show less" : "Read more"}
                            btnRightIcon={
                                <Ionicons
                                    name={isExpanded ? "chevron-up" : "chevron-down"}
                                    size={16}
                                    style={{ color: theme.colors.primary }}
                                />
                            }
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default PatientStory;
