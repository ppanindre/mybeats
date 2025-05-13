import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import ScreenContainer from "../Containers/ScreenContainer";
import TabButton from "../../components/Buttons/TabButton";

const HealthHistory = ({ route }) => {
  const { history } = route.params;
  const [selectedTab, setSelectedTab] = useState("conditions");

  const renderSection = (title, items) => (
    <View className="space-y-5 space-x-10 my-5">
      <Text className="font-[appfont-bold] text-lg mx-2">{title}:</Text>
      <View className="space-y-3 mx-2">
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <Text key={index} className="text-lg font-[appfont]">
              • {item}
            </Text>
          ))
        ) : (
          <Text className="text-lg font-[appfont]">N/A</Text>
        )}
      </View>
    </View>
  );

  return (
    <ScreenContainer>
      {/* Tabs */}
      <View className="flex-row space-x-2">
        <TabButton
          label="Conditions"
          isLeftTab={true}
          isActive={selectedTab === "conditions"}
          onPress={() => setSelectedTab("conditions")}
        />
        <TabButton
          label="Records"
          isLeftTab={false}
          isActive={selectedTab === "records"}
          onPress={() => setSelectedTab("records")}
        />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
        <View>
          {selectedTab === "conditions" && (
            <View className="space-y-8">
              {renderSection("Underlying Conditions", history.conditions)}
              {renderSection("Allergies", history.allergies)}
            </View>
          )}
          {selectedTab === "records" && (
            <View className="space-y-8">
              {renderSection("Surgeries/Procedures", history.procedures)}
              {renderSection("Immunizations", history.immunizations)}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HealthHistory;
