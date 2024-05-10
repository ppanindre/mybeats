import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HorizontalLine from "../../../../MyCharts/Components/HorizontalLine";
import { customTheme } from "../../../../constants/themeConstants";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const CartScreen = () => {
    const route = useRoute();
    const [cartItems, setCartItems] = useState([]);
    const [promoCode, setPromoCode] = useState("");

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const cartItemsRaw = await AsyncStorage.getItem('cartItems');
                const cartItems = cartItemsRaw ? JSON.parse(cartItemsRaw) : [];
                setCartItems(cartItems);
            } catch (error) {
                console.error('Failed to load cart items:', error);
            }
        };

        loadCartItems();
    }, []);

    const handleRemoveItem = async (id) => {
        let itemExists = false;
        const updatedItems = cartItems.map((item) => {
            if (item.id === id) {
                itemExists = true; // Mark that we found the item
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 }; // Decrement quantity
                }
                return null; // Mark item for removal
            }
            return item;
        }).filter(item => item !== null); // Remove null items (those marked for removal)

        if (!itemExists) {
            console.error("Item not found");
            return; // Exit if we didn't find the item to avoid unnecessary state update
        }

        setCartItems(updatedItems);

        // Also update AsyncStorage
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };


    const handleQuantityChange = async (id, increment) => {
        const updatedItems = cartItems.map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + increment };
            }
            return item;
        });
        setCartItems(updatedItems);

        // Also update AsyncStorage
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };



    // useEffect(() => {
    //     if (route.params?.newItem) {
    //         const newItem = route.params.newItem;
    //         // Check if the item already exists in the cart
    //         const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);
    //         if (existingItemIndex > -1) {
    //             // If item exists, update its quantity
    //             const updatedCartItems = [...cartItems];
    //             updatedCartItems[existingItemIndex].quantity += 1;
    //             setCartItems(updatedCartItems);
    //         } else {
    //             // If item does not exist, add it to the cart
    //             setCartItems(prevItems => [...prevItems, newItem]);
    //         }
    //     }
    // }, [route.params?.newItem]);

    // const [cartItems, setCartItems] = useState([
    //     {
    //         id: 1,
    //         name: "Dietary Supplement Health Products",
    //         price: "6.99",
    //         quantity: 1,
    //     },
    //     {
    //         id: 2,
    //         name: "Pediacare Super Immuno Plus",
    //         price: "15.99",
    //         quantity: 1,
    //     },
    //     {
    //         id: 3,
    //         name: "Alcohol Pad Covid-19 Essentials",
    //         price: "6.99",
    //         quantity: 1,
    //     },
    // ]);

    // const handleRemoveItem = (id, decrement) => {
    //     const updatedItems = cartItems.map((item) =>
    //         item.id === id
    //             ? { ...item, quantity: item.quantity - decrement }
    //             : item
    //     );

    //     const filteredItems = updatedItems.filter((item) => item.quantity > 0);

    //     setCartItems(filteredItems);
    // };

    // const handleQuantityChange = (id, increment) => {
    //     setCartItems(
    //         cartItems.map((item) =>
    //             item.id === id
    //                 ? { ...item, quantity: item.quantity + increment }
    //                 : item
    //         )
    //     );
    // };

    const handleApplyPromo = () => {
        alert(`Promo code ${promoCode} applied!`);
    };


    const totalPrice = cartItems
        .reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0)
        .toFixed(2);

    const navigation = useNavigation();

    return (
        <ScrollView className="bg-white p-6">
            {/* Cart Items */}

            <View className="flex-row items-center justify-between p-2 m-2">
                <Ionicons name="cart" size={24} color="#4F8EF7" />
                {cartItems.length > 0 ? (
                    <Text className="flex-1 text-lg font-[appfont-semi] ml-2">
                        Order From Wellness 
                    </Text>
                ) : (
                    <Text className="flex-1 text-lg font-[appfont-semi] ml-2">
                        Cart Empty
                    </Text>
                )}
                <Text className="text-lg font-semibold">${totalPrice}</Text>
            </View>

            <HorizontalLine />

            {cartItems.map((item, index) => (
                <React.Fragment key={item.id}>
                    <View className="bg-white p-4">
                        <View className="flex-row items-center mb-2">
                            <Image
                                className="h-12 w-12 rounded-full mr-2 "
                                source={require("../../assets/wellness_product.jpeg")}
                            />
                            <View className="flex-1 mx-2">
                                <View className="flex-row justify-between items-center">
                                    <View className="w-44">
                                        <Text className="text-base font-bold truncate">
                                            {item.name}
                                        </Text>
                                    </View>
                                    <Text className="text-sm text-blue-600 font-bold -mt-5">{`$${item.price}`}</Text>
                                </View>
                                <View className="flex-row items-center justify-end -mt-5">
                                    <View className="flex-row items-center ">
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleRemoveItem(item.id, 1)
                                            }
                                        >
                                            <Ionicons
                                                name="trash-outline"
                                                color={customTheme.colors.dark}
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                        <Text className="mx-2">
                                            {item.quantity}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleQuantityChange(item.id, 1)
                                            }
                                        >
                                            <Ionicons
                                                name="add-circle"
                                                color="#34C759"
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {index < cartItems.length - 1 && <HorizontalLine />}
                </React.Fragment>
            ))}

            <View className="flex-row items-center justify-between p-4 ">
                <View className="flex-row items-center -mb-5 mt-2">
                    <Ionicons
                        name="location"
                        color={customTheme.colors.primary}
                        size={24}
                    />
                    <Text className="text-gray-500 ml-2 m">Delivery to</Text>
                </View>
            </View>
            <HorizontalLine />
            <Text className="px-4 text-black-500">
                140 Laurie Meadows Drive, San Matero CA, US, 94403
            </Text>

            <View className="flex-row items-center justify-between p-4 mt-6 -mb-5">
                <View className="flex-row items-center">
                    <Ionicons
                        name="pricetag-outline"
                        className="text-blue-600"
                        size={24}
                    />
                    <Text className="text-gray-500 ml-2">Promo Code</Text>
                </View>
            </View>
            <HorizontalLine />

            <View className="flex-row items-center px-4">
                <View className="flex-1 flex-row bg-gray-100 rounded-lg">
                    <TextInput
                        className="flex-1 p-4 text-gray-500 rounded-lg"
                        placeholder="Enter your Code"
                        placeholderTextColor="gray"
                        value={promoCode}
                        onChangeText={setPromoCode}
                        style={{
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => handleApplyPromo()}
                        className="items-center justify-center rounded-lg p-3"
                        style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                        }}
                    >
                        <Text className="text-blue-600 font-bold">Apply</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className=" my-10">
                <TouchableOpacity
                    onPress={() => navigation.navigate("confirmAddress")}
                    style={{ backgroundColor: customTheme.colors.primary }}
                    className="flex-row justify-center items-center py-4 rounded-xl"
                >
                    <Text className="text-center text-white text-lg font-bold">
                        Place Order
                    </Text>
                    <View className="bg-white px-2 py-1 rounded-md ml-4">
                        <Text className="text-blue-500 text-md font-bold">{`$${totalPrice}`}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default CartScreen;
