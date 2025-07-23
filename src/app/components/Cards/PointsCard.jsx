import { View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { UserCircleIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import moment from "moment";

const PointsCard = ({ openModal }) => {
  const user = useSelector((state) => state.UserReducer);
  const navigation = useNavigation();

  const [champions, setChampions] = useState([]);

  useEffect(() => {
    const getLastWeekChampions = async () => {
      if (!user || !user?.insuranceMetaData) return;

      const lastWeekStart = moment().subtract(1, "week").startOf("week");
      const lastWeekEnd = moment().subtract(1, "week").endOf("week");

      const weekKey = `${lastWeekStart.format("YYYY-MM-DD")}_to_${lastWeekEnd.format("YYYY-MM-DD")}`;

      try {
        const docRef = await firestore()
          .collection("insuranceCompanies")
          .doc(user.insuranceMetaData.insuranceCompanyId)
          .collection("departments")
          .doc(user.insuranceMetaData.departmentId)
          .collection("weeklyChampions")
          .doc(weekKey)
          .get();

        if (docRef.exists) {
          const data = docRef.data();
          setChampions(data.winners?.slice(0, 3) || []);
        } else {
          setChampions([]);
        }
      } catch (error) {
        console.error("Failed to fetch last week champions:", error);
        setChampions([]);
      }
    };

    getLastWeekChampions();
  }, []);

  // Ensure we always display 3 champion slots
  const paddedChampions = [...champions];
  while (paddedChampions.length < 3) {
    paddedChampions.push(null);
  }

  return (
    <View className="border-2 flex flex-row border-primary p-5 py-2 rounded-lg">
      {/* Left Section: Today's Points */}
      <TouchableOpacity
        onPress={() => navigation.navigate("yourScore")}
        className="flex flex-1 flex-row items-center justify-between border-r pr-5 border-primary"
      >
        <TouchableOpacity onPress={openModal}>
          {["gold", "silver", "bronze"].includes(user.todaysPoints?.currentMedal) && (
            <MaterialCommunityIcons
              name="medal"
              size={20}
              color={
                user.todaysPoints?.currentMedal === "gold"
                  ? "#FFD700"
                  : user.todaysPoints?.currentMedal === "silver"
                  ? "#C0C0C0"
                  : "#CD7F32"
              }
            />
          )}
        </TouchableOpacity>

        <View className="flex items-center">
          <Text className="font-bold">{user.todaysPoints?.todayScore || 0}</Text>
          <Text className="text-xs text-primary font-bold">TODAY'S POINTS</Text>
        </View>
      </TouchableOpacity>

      {/* Right Section: Champions */}
      <TouchableOpacity
        // onPress={() => navigation.navigate("champions")}
        className="flex flex-1 pl-5"
      >
        <View className="flex-row items-center justify-around mb-1">
          {paddedChampions.map((champ, index) => (
            <View key={index} className="mx-1">
              {champ?.avatar?.imgSrc ? (
                <Image
                  source={champ.avatar.imgSrc}
                  style={{ width: 20, height: 20, borderRadius: 999 }}
                />
              ) : (
                <UserCircleIcon color="#ccc" size={20} />
              )}
            </View>
          ))}
        </View>
        <Text className="text-primary font-bold text-center text-xs">
          CHAMPIONS
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PointsCard;