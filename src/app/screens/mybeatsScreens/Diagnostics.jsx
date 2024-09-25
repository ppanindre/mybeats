import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../tailwind.config";
import { useNavigation } from "@react-navigation/native";
import { cardData, diagnosticTestData, checkupData } from "../../../../constants/diagnosticsConstants";
import DiagnosticsTestCard from "../../components/Cards/DiagnosticsTestCard";
import { LabData } from "../../../../constants/LabConstants";
import PaginationIndicator from "../../components/PatientDashboardComponents/PaginationIndicator";
import DiagnosticsPromotionalCard from "../../components/Cards/DiagnosticsPromotionalCard";
import DiagnosticsCheckupCard from "../../components/Cards/DiagnosticsCheckupCard";
import LabCard from "../../components/Cards/LabCard";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import FormInput from "../../components/Inputs/FormInput";
import AppButton from "../../components/Buttons/AppButton";

const Diagnostics = () => {
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            let starName = "star-outline";
            if (rating >= i) {
                starName = "star";
            } else if (rating > i - 1 && rating < i) {
                starName = "star-half-outline";
            }
            stars.push(
                <Ionicons key={i} name={starName} size={14} color={theme.colors.light} />
            );
        }
        return stars;
    };
    handleUploadPress = () => { };

    return (
        <ScreenContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50,
                }}
            >
                <View className="space-y-5">
                    <View className="h-[50]">
                        <FormInput
                            onFocus={() => navigation.navigate("searchDiagnostics")}
                            label="Search Labs, Tests, Pincode"
                        />
                    </View>

                    <View className="space-y-3">
                        <View>
                            <FlatList
                                ref={sliderRef}
                                data={cardData}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => <DiagnosticsPromotionalCard {...item} />}
                                onScroll={({ nativeEvent }) => {
                                    const slide = Math.ceil(
                                        nativeEvent.contentOffset.x /
                                        nativeEvent.layoutMeasurement.width
                                    );
                                    if (slide !== currentIndex) {
                                        setCurrentIndex(slide);
                                    }
                                }}
                            />
                        </View>
                        <View>
                            <PaginationIndicator
                                currentIndex={currentIndex}
                                length={cardData.length}
                            />
                        </View>
                    </View>

                    <View className="space-y-3">
                        <View className="flex-row justify-between">
                            <Text className="text-xl font-[appfont-bold] text-left">
                                Top Diagnostic Test
                            </Text>
                            <AppButton variant="noborder" btnLabel="View all"/>
                        </View>
                        <FlatList
                            data={diagnosticTestData}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View className="w-[200]">
                                    <DiagnosticsTestCard {...item} />
                                </View>
                            )}
                            contentContainerStyle={{ gap: 10 }}
                        />
                    </View>

                    <View className="space-y-3">
                        <View className="flex-row justify-between items-center">
                            <Text className="text-xl font-[appfont-bold]">
                                Checkup Packages
                            </Text>
                            <AppButton variant="noborder" btnLabel="View all"/>
                        </View>
                        <FlatList
                            data={checkupData}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <DiagnosticsCheckupCard {...item} />}
                            contentContainerStyle={{  gap: 10 }}
                        />
                    </View>

                    <View>
                        <View
                            style={{ backgroundColor: theme.colors.primary }}
                            className="flex-row items-center justify-between p-4 rounded-lg shadow-lg"
                        >
                            <View className="flex-1">
                                <Text style={{ color: theme.colors.light }} className="text-lg font-[appfont-bold]">
                                    Need help with booking your test
                                </Text>
                                <Text style={{ color: theme.colors.light }} className="text-sm font-[appfont-semi]">
                                    Our experts are here to help you
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={handleUploadPress}
                                className="bg-light py-5 px-5 rounded-full shadow-md"
                            >
                                <Text className="text-black font-[appfont-semi]">
                                    Call now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text className="text-lg font-[appfont-semi]">
                            Our Recommended Labs
                        </Text>
                    </View>

                    <View className="space-y-3">
                        {LabData.map((lab, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate('LabInfo', lab)}
                                style={{ backgroundColor: theme.colors.light }}
                                className="rounded-lg shadow-lg"
                            >
                                <LabCard lab={lab} renderStars={renderStars} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default Diagnostics;