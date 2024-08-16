import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { pharmacyData } from "../../../../constants/pharmacyConstants";
import PharmacyCard from "../../../../components/Cards/PharmacyCard";
import { WellnessData } from "../../../../constants/medicineConstants";
import WellnessCard from "../../components/Cards/WellnessCard";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import FormInput from "../../components/Inputs/FormInput";

const Medicines = () => {
    const categories = [
        "Baby Care",
        "Fitness and Wellness",
        "Personal Care",
        "Sexual",
        "Alternate",
        "Devices",
    ];
    const categoryWidth = Dimensions.get("window").width / 3 - 19;
    const navigation = useNavigation();

    return (
        <ScreenContainer>
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    <View>
                        <FormInput label="Search Pharmacy, Medicines, Pincode"
                            onFocus={() => navigation.navigate("searchMedicines")} />
                    </View>

                    <View className="space-y-3">
                        <Text className="text-xl font-[appfont-semi]">
                            Browse Medicines & Health Products
                        </Text>

                        <View className="flex-row justify-between">
                            {categories.slice(0, 3).map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className="items-center justify-center rounded-lg shadow-md h-[80] bg-lightPrimary"
                                    style={{ width: categoryWidth }}
                                    onPress={() => navigation.navigate("searchMedicines")}
                                >
                                    <Text className="text-sm font-[appfont-semi] text-center">
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View className="flex-row justify-between">
                        {categories.slice(3).map((category, index) => (
                            <TouchableOpacity
                                key={index}
                                className="bg-cyan-100 h-[80] rounded-lg shadow-md items-center justify-center bg-lightPrimary"
                                style={{ width: categoryWidth }}
                                onPress={() => navigation.navigate("searchMedicines")}
                            >
                                <Text className="text-sm font-[appfont-semi]">
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="space-y-3">
                        <View >
                            <View className="flex-row justify-between items-center">
                                <Text className="text-xl font-[appfont-bold] text-left">
                                    Wellness Product
                                </Text>
                                <TouchableOpacity>
                                    <Text
                                        className="text-sm font-[appfont-bold] text-left text-primary"
                                    >
                                        View All
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <FlatList
                            data={WellnessData}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) =>
                                <WellnessCard
                                    key={item.id}
                                    testName={item.testName}
                                    testPrice={item.testPrice}
                                    originalPrice={item.originalPrice}
                                    addclick={() => { }}
                                />
                            }
                            contentContainerStyle={{ gap: 10 }}
                        />
                    </View>

                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-[appfont-semi]">Pharmacies near you</Text>
                        <TouchableOpacity onPress={() => toggleView()}>
                            <Text
                                className="font-[appfont-bold] text-primary"
                            >
                                See all
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <FlatList
                            data={pharmacyData}
                            keyExtractor={(item, index) =>
                                item.id.toString() || index.toString()
                            }
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: 10 }}
                            renderItem={({ item: pharmacy }) => (
                                <View id={pharmacy.id} className="w-[200]">
                                     <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "pharmacyInfo",
                                                {pharmacy}
                                            )
                                        }
                                    >
                                        <PharmacyCard
                                            pharmacyLabel={pharmacy.name}
                                            pharmacyRating={pharmacy.rating}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default Medicines;
