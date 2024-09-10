import React, {useEffect} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import appicon from "../../assets/app-icon.png";
import { Ionicons } from "@expo/vector-icons";
import TextInputBoxWithIcon from "../../../../components/Utilities/TextInputBoxWithIcon";
import DoctorCard from "../../components/Cards/DoctorCard";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../../tailwind.config";
import Slider from "../../components/ConsultDoctorsComponents/Slider";
import { commonHealthIssues } from "../../../../constants/commonHealthIssues";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import { useDispatch, useSelector } from "react-redux";
import { listDoctorsActionCreator } from "../../../../store/actions/doctorActions";

const ConsultDoctor = () => {
    const navigation = useNavigation();

    const { loading, error, doctors } = useSelector(
        (state) => state.doctorsListReducer
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listDoctorsActionCreator());
    }, []);

    return (
        <ScreenContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
            >

                <View className="space-y-5">
                    <View className="flex-row items-center justify-between w-full h-[50]">
                        {/* Search Container */}
                        <TextInputBoxWithIcon
                            onFocus={() => navigation.navigate("searchDoctors")}
                            icon={
                                <Ionicons
                                    name="search-outline"
                                    color={theme.colors.darkSecondary}
                                    size={24}
                                />
                            }
                            placeholder="Search Doctor, Condition, Pincode"
                        />
                    </View>

                    {/* Slider section */}
                    <View>
                        <Slider />
                    </View>

                    <View>
                        <Text className="text-lg font-[appfont-semi]">
                            Medical Specialties
                        </Text>
                        <FlatList
                            data={[
                                { key: "Women’s Health", icon: appicon },
                                { key: "Skin & Hair", icon: appicon },
                                { key: "Child Specialist", icon: appicon },
                                { key: "General Physician", icon: appicon },
                                { key: "Sexology", icon: appicon },
                                { key: "Digestion", icon: appicon },
                                { key: "Psychiatry", icon: appicon },
                                { key: "View All", icon: appicon },
                            ]}
                            numColumns={4}
                            renderItem={({ item }) => (
                                <TouchableOpacity className="flex-1 items-center p-3">
                                    <Image
                                        source={item.icon}
                                        className="w-16 h-16 mb-2 rounded-md"
                                    />
                                    <Text className="text-xs font-[appfont-semi] text-center">
                                        {item.key}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.key}
                        />
                    </View>

                    <View>
                        <Text className="text-lg font-[appfont-semi]">
                            Common Health Issues
                        </Text>
                        <FlatList
                            data={commonHealthIssues}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingVertical: 20,
                                gap: 10,
                            }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="p-4 rounded-lg shadow-md justify-end"
                                    style={{ width: 160, height: 200, backgroundColor: theme.colors.lightPrimary }}
                                >
                                    <Text className="text-lg font-[appfont-semi]">
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>

                    <Text className="text-lg font-[appfont-semi]">
                        Available Doctors
                    </Text>
                    <FlatList
                        data={doctors}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item: doctor }) => (
                            <View className="w-[300]">
                                <TouchableOpacity>
                                    <DoctorCard
                                        doctor={doctor}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                        contentContainerStyle={{ gap: 10 }}
                    />
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default ConsultDoctor;