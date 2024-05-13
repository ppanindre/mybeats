import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import config from "../../../amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import { createDoctor, createPatient } from "../../../graphql/mutations";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { customTheme } from "../../../../constants/themeConstants";
import CustomInput from "../../../../components/CustomInput";
import MultiSelect from "../../../../components/MultiSelect";
import { launchImageLibrary } from "react-native-image-picker";
import PhoneNumberInput from "react-native-phone-number-input";
import { useSelector } from "react-redux";
import { isValidNumber } from "react-native-phone-number-input";
import DoctorProfileForm1 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm1";
import DoctorProfileForm2 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm2";
import DoctorProfileForm3 from "../../components/Forms/DoctorProfileForms/DoctorProfileForm3";
import AppButton from "../../components/Buttons/AppButton";
import ScreenContainer from "../../components/Containers/ScreenContainer";

Amplify.configure(config);
function DoctorProfile() {
    const client = generateClient();

    // Get user
    const user = useSelector((state) => state.UserReducer);

    // STATES
    const [pageIndex, setPageIndex] = useState(0);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [licenseNo, setLicenseNo] = useState("");
    const [upiID, setupiID] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [primarySpecialization, setPrimarySpecialization] = useState({
        value: "",
        list: [
            { _id: "1", value: "Cardiology" },
            { _id: "2", value: "Neurology" },
            { _id: "3", value: "Orthopedics" },
        ],
        selectedList: [],
    });
    const [secondarySpecialization, setSecondarySpecialization] = useState({
        value: "",
        list: [
            { _id: "1", value: "Surgery" },
            { _id: "2", value: "Pediatrics" },
            { _id: "3", value: "General Medicine" },
            { _id: "4", value: "Others" },
        ],
        selectedList: [],
    });


    const [addressfield, setAddressfield] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    const [awards, setAwards] = useState("");
    const [website, setWebsite] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [otherCondition, setOtherCondition] = useState(""); // State to hold the "other" condition if specified
    const [toggleOthers, setToggleOthers] = useState(false); // State to toggle the additional input field
    const [focusedInput, setFocusedInput] = useState("");

    // Regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+$/;
    const licenseRegex = /^D-?\d{5,7}$/;
    const upiIDRegex = /^[A-Za-z0-9.\-]{2,256}@[A-Za-z]{2,64}$/;
    const zipRegex = /^\d{5,6}$/;
    const websiteRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    // Track validity for fields
    const [emailError, setEmailError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [licenseNoError, setLicenseNoError] = useState(false);
    const [upiIDError, setUpiIDError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [zipcodeError, setZipcodeError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);

    useEffect(() => {
        if (email === "") {
            setEmailError(false);
        } else {
            setEmailError(!emailRegex.test(email));
        }
    }, [email]);

    useEffect(() => {
        if (firstName === "") {
            setFirstNameError(false);
        } else {
            setFirstNameError(!nameRegex.test(firstName));
        }
    }, [firstName]);

    useEffect(() => {
        if (lastName === "") {
            setLastNameError(false);
        } else {
            setLastNameError(!nameRegex.test(lastName));
        }
    }, [lastName]);

    // Phone number validation
    useEffect(() => {
        if (phoneNumber == "") {
            setPhoneNumberError(false);
        } else {
            setPhoneNumberError(
                phoneNumber === "" || !isValidNumber(phoneNumber)
            );
        }
    }, [phoneNumber]);

    useEffect(() => {
        if (licenseNo === "") {
            setLicenseNoError(false);
        } else {
            setLicenseNoError(!licenseRegex.test(licenseNo));
        }
    }, [licenseNo]);

    useEffect(() => {
        if (upiID === "") {
            setUpiIDError(false);
        } else {
            setUpiIDError(!upiIDRegex.test(upiID));
        }
    }, [upiID]);

    useEffect(() => {
        if (city === "") {
            setCityError(false);
        } else {
            setCityError(!nameRegex.test(city));
        }
    }, [city]);

    useEffect(() => {
        if (zipcode === "") {
            setZipcodeError(false);
        } else {
            setZipcodeError(!zipRegex.test(zipcode));
        }
    }, [zipcode]);

    useEffect(() => {
        if (website === "") {
            setWebsiteError(false);
        } else {
            setWebsiteError(!websiteRegex.test(website));
        }
    }, [website]);

    const isFirstPageFieldsFilled =
        email &&
        firstName &&
        lastName &&
        licenseNo &&
        upiID &&
        phoneNumber &&
        !emailError &&
        !firstNameError &&
        !lastNameError &&
        !phoneNumberError &&
        !licenseNoError &&
        !upiIDError;
    const isSecondPageFieldsFilled =
        primarySpecialization.selectedList.length > 0 &&
        addressfield &&
        city &&
        state.selectedList.length > 0 &&
        zipcode &&
        !cityError &&
        !zipcodeError &&
        !websiteError;

    const handleNext = () => {
        if (currentPage === 1 && isFirstPageFieldsFilled) {
            setCurrentPage(2);
        } else if (currentPage === 2 && isSecondPageFieldsFilled) {
            setCurrentPage(3);
        }
    };

    const handleSecondarySelection = (value) => {
        setSecondarySpecialization({
            ...secondarySpecialization,
            value: value.text,
            selectedList: value.selectedList,
        });
        // if "Others" is selected
        const isOthersSelected = value.selectedList.some(
            (item) => item.value === "Others"
        );
        setToggleOthers(isOthersSelected);
    };

    const selectImage = () => {
        const options = {
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else {
                const source = { uri: response.assets[0].uri };
                setImageUri(source.uri);
            }
        });
    };

    const handleSubmit = async () => {
        // add doctor
        const doctorDetails = {
            input: {
                doctorID: JSON.stringify("1"),
                firstname: firstName,
                lastname: lastName,
                // email: email,
                // phoneNumber: phoneNumber,
                // registrationNumber: licenseNo,
                // upiId: upiID,
                // address: addressfield,
                zipcode: zipcode,
            },
        };

        try {
            const response = await client.graphql({
                query: createDoctor,
                variables: {
                    input: {
                        doctorID: JSON.stringify("1"),
                        firstname: "Tanmay",
                        lastname: "Mandal",
                        zipcode: "11220",
                    },
                },
            });
            console.log("response", response);
        } catch (error) {
            console.error("Error creating doctor:", error);
        }
    };

    /**
     * function to handle when user clicks
     * on next
     */
    const goToNextForm = (doctorData=null) => {
        setPageIndex(pageIndex + 1);
    };

    /**
     * funtion to go back to the previous form
     */
    const goToPreviousForm = () => {
        setPageIndex(pageIndex - 1);
    };

    return (
        <ScreenContainer>
            {pageIndex === 0 && (
                <DoctorProfileForm1 handlePressNext={goToNextForm} />
            )}
            {pageIndex === 1 && (
                <DoctorProfileForm2
                    handlePressNext={goToNextForm}
                    handlePressBack={goToPreviousForm}
                />
            )}
            {pageIndex === 2 && (
                <DoctorProfileForm3
                    handlePressSubmit={handleSubmit}
                    handlePressBack={goToPreviousForm}
                />
            )}
        </ScreenContainer>
    );
}

export default DoctorProfile;
