import React, { Component } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextInputBoxWithIcon from "../../../../components/Utilities/TextInputBoxWithIcon";
import { useNavigation } from "@react-navigation/native";
import { customTheme } from "../../../../constants/themeConstants";
import { pharmacyData } from "../../../../constants/pharmacyConstants";
import PharmacyCard from "../../../../components/Cards/PharmacyCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppButton from "../../components/Buttons/AppButton";

const Medicines = () => {
    const WellnessData = [
        {
            id: "1",
            testName: "Dietary Supplement Health Products",
            testPrice: "$6.99",
            originalPrice: "$8.99",
        },
        {
            id: "2",
            testName: "Pediacare Super Immuno Plus",
            testPrice: "$6.99",
            originalPrice: "$8.99",
        },
        {
            id: "3",
            testName: "Pediacare Super Immuno Plus",
            testPrice: "$6.99",
            originalPrice: "$8.99",
        },
    ];

    const WellnessCard = ({id, testName, testPrice, originalPrice }) => {
        return (
            <View style={{backgroundColor: customTheme.colors.light}} className="space-y-3 p-5 rounded-lg shadow w-[200]">
                <View className="w-[100%] items-center justify-center">
                    <Image
                        source={require("../../assets/wellness_product.jpeg")}
                        className="h-32 w-40 rounded"
                    />
                    <View style={{backgroundColor: customTheme.colors.light}} className="absolute top-1.5 left-1.5 bg-opacity-80 py-1 px-1 rounded-md">
                        <Text className="text-xs text-blue-600 font-bold">
                            25% OFF
                        </Text>
                    </View>
                </View>
                <View>
                    <Text className="text-md font-[appfont-semi] mb-2 text-left">
                        {testName}
                    </Text>
                </View>
                {/* <View className="flex-row justify-between items-end"> */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Text className="text-mg font-[appfont-semi] text-left mr-2">
                            {testPrice}
                        </Text>
                        <Text style={{color: customTheme.colors.dark}} className="text-s line-through">
                            {originalPrice}
                        </Text>
                    </View>
                    <Ionicons
                        name="add-circle-outline"
                        size={20}
                        color="#808080"
                        onPress={() => addclick({
                            id: id,
                            name: testName,
                            price: testPrice.replace('$', ''),
                            quantity: 1
                          })}
                    />
                </View>
            </View>
        );
    };

    const addclick = async (itemData) => {
        try {
            // Retrieve the existing cart items
            const existingCartRaw = await AsyncStorage.getItem('cartItems');
            const existingCart = existingCartRaw ? JSON.parse(existingCartRaw) : [];
    
            // Check if the item already exists and update quantity if it does
            let updated = false;
            const updatedCart = existingCart.map((item) => {
                if (item.id === itemData.id) {
                    updated = true;
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
    
            if (!updated) {
                updatedCart.push({ ...itemData, quantity: 1 });
            }
            alert("Added to cart")
    
            // Save the updated cart back to AsyncStorage
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const cardData = [
        {
            id: "1",
            maintitle: "Get 60% OFF",
            subtitle: "on all items",
            description: "On your 1st order",
            buttonText: "Order now",
        },
        {
            id: "2",
            maintitle: "Get 60% off",
            subtitle: "on all items",
            description: "On your 1st order",
            buttonText: "Order now",
        },
        {
            id: "3",
            maintitle: "Get 60% off",
            subtitle: "on all items",
            description: "On your 1st order",
            buttonText: "Order now",
        },
    ];

    const categories = [
        "Baby Care",
        "Fitness and Wellness",
        "Personal Care",
        "Sexual",
        "Alternate",
        "Devices",
    ];
    const categoryWidth = Dimensions.get("window").width / 3 - 16;
    const navigation = useNavigation();

    return (
        <ScrollView
            className="py-4 bg-gray-100"
            contentContainerStyle={{ paddingBottom: 50 }}
        >
            <View className="px-4 h-[50]">
                {/* Search Container */}
                <TextInputBoxWithIcon
                    onFocus={() => navigation.navigate("searchMedicines")}
                    icon={
                        <Ionicons
                            name="search-outline"
                            color={customTheme.colors.darkSecondary}
                            size={24}
                        />
                    }
                    placeholder="Search Pharmacy, Medicines, Pincode"
                />
            </View>

            {/* <View className="mt-4">
            <FlatList
                    ref={sliderRef}
                    data={cardData}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Card {...item} />}
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
                <PaginationIndicator
                    currentIndex={currentIndex}
                    length={cardData.length}
                />
            </View> */}
            <View className="px-4">
                <Text className="text-xl font-[appfont-semi] mb-4 mt-5">
                    Browse Medicines & Health Products
                </Text>

                {/* First row */}
                <View className="flex-row justify-between mb-2">
                    {categories.slice(0, 3).map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            className="items-center justify-center rounded-lg shadow-md h-[80]"
                            style={{ width: categoryWidth, backgroundColor: customTheme.colors.lightPrimary }}
                            onPress={() => navigation.navigate("searchMedicines")}
                        >
                            <Text className="text-sm font-[appfont-semi] text-center">
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Second row */}
            <View className="px-4 flex-row justify-between">
                {categories.slice(3).map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        className="bg-cyan-100 h-[80] rounded-lg shadow-md items-center justify-center"
                        style={{ width: categoryWidth, backgroundColor: customTheme.colors.lightPrimary }}
                        onPress={() => navigation.navigate("searchMedicines")}
                    >
                        <Text className="text-sm font-[appfont-semi]">
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View>
                <View className="mt-4 px-4">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-xl font-[appfont-bold] text-left">
                            Wellness Product
                        </Text>
                        <AppButton variant="noborder" btnLabel="View all"/>
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
                            addclick={addclick} 
                        />
                    }
                    contentContainerStyle={{ padding: 20, gap: 10 }}
                />
            </View>

            <View className="flex-row justify-between items-center mt-4 px-4">
                <Text className="text-lg font-[appfont-semi]">
                    Pharmacies near you
                </Text>
                <TouchableOpacity onPress={() => toggleView()}>
                    <Text
                        style={{ color: customTheme.colors.primary }}
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
                    contentContainerStyle={{ padding: 20, gap: 10 }}
                    renderItem={({ item: pharmacy }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('PharmacyInfo', pharmacy)}>
                            <PharmacyCard
                                pharmacyLabel={pharmacy.name}
                                pharmacyRating={pharmacy.rating}
                            // pharmacyZipcode={pharmacy.zipcode}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    );
};


export default Medicines