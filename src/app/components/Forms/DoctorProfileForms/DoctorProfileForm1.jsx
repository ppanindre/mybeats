import { ScrollView, View } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProfileImageButton from "../../Buttons/ProfileImageButton";
import { launchImageLibrary } from 'react-native-image-picker';
import FormInput from "../../Inputs/FormInput";
import PhoneInput from "../../Inputs/PhoneInput";
import AppButton from "../../Buttons/AppButton";
import { useSelector } from 'react-redux';

// Form Schema for validation
const formSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    firstName: z.string().min(3, "First name must be at least 3 characters"),
    lastName: z.string().min(3, "Last must be at least 8 characters"),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be equal to 10 digits")
        .max(10, "Phone number must be equal to 10 digits")
        .regex(/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"),
    licenseNumber: z
        .string()
        .min(5, "License number must be at least 5 characters")
        .max(20, "License number must not exceed 20 characters"),
        upiId: z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, "Please enter a valid UPI ID"),
    });

const DoctorProfileForm1 = ({ handlePressNext, initialData }) => {

    // getting user detais from redux for email
    const user = useSelector((state) => state.UserReducer);

    // image constants for picture
    const [imageUri, setImageUri] = useState(null);

    // pick image from gallery 
    const selectImage = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setImageUri(source.uri);
            }
        });
    };
    /**
     * function to handle when user presses next
     */
    const onSubmit = (data) => {
        // send the form data to the parent component
        handlePressNext(data);
    };

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            email: initialData.email || "",
            firstName: initialData.firstName || "",
            lastName: initialData.lastName || "",
            phoneNumber: initialData.phoneNumber || "",
            licenseNumber: initialData.licenseNumber || "",
            upiId: initialData.upiId || "",
        },
        resolver: zodResolver(formSchema),
    });
    // Setting the default value for email after fetching from redux
    useEffect(() => {
        if (user && user.email) {
            setValue("email", user.email);
        }
    }, [user, setValue]);


    return (
        <View className="h-[100%] space-y-5">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="space-y-5">
                    {/* Profile Image Button */}
                    <View className="items-center">
                        <ProfileImageButton imageUri={imageUri} selectImage={selectImage} />
                    </View>

                    {/* Inputs */}

                    {/* Email */}
                    <View>
                        <Controller
                            control={control}
                            name="email"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="Email"
                                    error={error}
                                    editable={false}
                                />
                            )}
                        />
                    </View>

                    {/* First Name */}
                    <View>
                        <Controller
                            control={control}
                            name="firstName"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="First Name"
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    {/* Last Name */}
                    <View>
                        <Controller
                            control={control}
                            name="lastName"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="Last Name"
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    {/* Phone Number */}
                    <View>
                        <Controller
                            control={control}
                            name="phoneNumber"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <PhoneInput
                                    value={value}
                                    onChangeText={onChange}
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    {/* License Number */}
                    <View>
                        <Controller
                            control={control}
                            name="licenseNumber"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="License Number"
                                    error={error}
                                />
                            )}
                        />
                    </View>

                    {/* UPI Id */}
                    <View>
                        <Controller
                            control={control}
                            name="upiId"
                            render={({
                                field: { value, onChange },
                                fieldState: { error },
                            }) => (
                                <FormInput
                                    value={value}
                                    onChangeText={onChange}
                                    label="UPI ID"
                                    error={error}
                                />
                            )}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Overlay button */}
            <View>
                <AppButton
                    variant="primary"
                    btnLabel="Next"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
    );
};

export default DoctorProfileForm1;
