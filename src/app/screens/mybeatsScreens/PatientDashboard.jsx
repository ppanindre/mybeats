import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PharmacyCard from "../../../../components/Cards/PharmacyCard";
import { pharmacyData } from "../../../../constants/pharmacyConstants";
import { LabData } from "../../../../constants/LabConstants";
import LabCard from "../../../../components/Cards/LabCard";
import CustomSafeView from "../../../../components/CustomSafeView";
import TopNavbar from "../../components/Utils/TopNavbar";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import PatientSearchInputFrame from "../../components/PatientDashboardComponents/PatientSearchInputFrame";
import PatientBanner from "../../components/PatientDashboardComponents/PatientBanner";
import PatientNavigationFrame from "../../components/PatientDashboardComponents/PatientNavigationFrame";
import DoctorScrollView from "../../components/PatientDashboardComponents/DoctorScrollView";
import { theme } from "../../../../tailwind.config";
import PhonePePaymentSDK from "react-native-phonepe-pg";

const PatientDashboard = () => {
  const navigation = useNavigation();

  useEffect(() => {
    console.log("starting the application");
    PhonePePaymentSDK.init(
      "SANDBOX",
      "MERCHANTUAT1004",
      "9fa262d3-09d5-4edf-9f93-de27dc8bbcde",
      true
    ).then((result) => {
      // handle promise
      console.log("result", result);
    });
  }, []);

  return (
    <CustomSafeView>
      <TopNavbar showSync={false} isMyBeats={true} />
      <ScreenContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="space-y-5">
            <PatientSearchInputFrame />

            {/* NavigationBanner */}
            <View>
              <PatientBanner />
            </View>

            {/* Cards View */}
            <View>
              <PatientNavigationFrame />
            </View>

            {/* Pharma card */}
            <View>
              <TouchableOpacity
                className="flex-row items-center justify-between p-5 rounded-lg shadow-md bg-primary"
                onPress={() => navigation.navigate("medicines")}
              >
                <View className="flex-1">
                  <Text className="text-lg font-[appfont-semi] text-light">
                    Pharma
                  </Text>
                  <Text className="text-sm font-[appfont-semi] text-light">
                    Order via uploading prescription
                  </Text>
                </View>

                                {/* Upload Prescription */}
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("uploadPrescription")}
                                    className="py-3 px-6 rounded-full shadow-md bg-light"
                                >
                                    <Text className="font-[appfont-semi] text-dark">
                                        Upload
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>

                         {/* Payments */}
                         <View>
                            <TouchableOpacity
                                className="flex-row items-center justify-between p-5 rounded-lg shadow-md bg-lightPrimary"
                                onPress={() => navigation.navigate("payment")}
                            >
                                <View className="flex-1">
                                    <Text className="text-lg font-[appfont-semi] text-dark">
                                        Payments
                                    </Text>
                                    <Text className="text-sm font-[appfont-semi] text-dark">
                                        Manage payments
                                    </Text>
                                </View>

                            </TouchableOpacity>
                        </View>

            <View>
              <DoctorScrollView />
            </View>

            {/* Pharmacy based on the zip codes */}
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-[appfont-semi]">
                Pharmacy near you
              </Text>
              <TouchableOpacity onPress={() => toggleView()}>
                <Text
                  style={{
                    color: theme.colors.primary,
                  }}
                  className="font-[appfont-bold] text-primary"
                >
                  See all
                </Text>
              </TouchableOpacity>
            </View>

                        {/* Pharmacy Data */}
                        <FlatList
                            data={pharmacyData}
                            keyExtractor={(item, index) =>
                                item.id.toString() || index.toString()
                            }
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item: pharmacy }) => (
                                <View
                                    key={pharmacy.id}
                                    className="w-[300] border rounded-lg"
                                    style={{
                                        borderColor:
                                            theme.colors.darkSecondary,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "pharmacyInfo",
                                                { pharmacy }
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
                            contentContainerStyle={{ padding: 5, gap: 10 }}
                        />

            {/* Labs based on the zipcode */}
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-[appfont-semi]">Labs near you</Text>
              <TouchableOpacity onPress={() => toggleView()}>
                <Text
                  style={{
                    color: theme.colors.primary,
                  }}
                  className="font-[appfont-bold] text-primary"
                >
                  See all
                </Text>
              </TouchableOpacity>
            </View>

                        {/* Lab Data */}
                        <FlatList
                            data={LabData}
                            keyExtractor={(item, index) =>
                                item.id.toString() || index.toString()
                            }
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item: lab }) => (
                                <View key={lab.id} className="w-[300]">
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("labInfo", { lab })
                                        }
                                    >
                                        <LabCard
                                            labName={lab.name}
                                            labRating={lab.rating}
                                            labStoryCount={lab.labStoryCount}
                                            labzipcode={lab.zipcode}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            contentContainerStyle={{ padding: 5, gap: 10 }}
                        />
                    </View>
                </ScrollView>
                <View className="flex-1 bg-background items-center justify-center">
                    <Text className="font-[appfont-bold] text-lg">
                        Please save your profile data
                    </Text>
                </View>
            </ScreenContainer>
        </CustomSafeView>
    );
};

export default PatientDashboard;
