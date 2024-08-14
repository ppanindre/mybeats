import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import getUser from "../../../../cache/userCache";
import moment from "moment";
import TrendCardComponent from "../../../../components/TrendCardComponent";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FoodListner } from "../../../../listeners/FoodListner";
import { useDispatch } from "react-redux";
import { FoodActionCreators } from "../../../../store/FoodReducer/FoodActionCreators";
import { foodActionTypes } from "../../../../store/FoodReducer/FoodActionTypes";
import { dashboardActionTypes } from "../../../../store/DashboardReducer/DashboardActionTypes";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const styles = StyleSheet.create({
  inputBox: {
    height: 55,
    // width: 350,
    backgroundColor: "white",
  },

  signupButton: {
    borderRadius: 6,
    elevation: 3,
    width: 327,
    height: 48,
    marginVertical: 10,
    paddingVertical: 14,
  },

  detailedView: {
    borderRadius: 6,
    elevation: 3,
    width: 327,
    height: 48,
    marginVertical: 10,
    paddingVertical: 14,
  },

  errorText: {
    color: "#E32A17",
    fontSize: 10,
    alignSelf: "flex-start",
    // marginStart: 40,
    marginTop: 3,
    marginBottom: 1,
  },

  signupButtonText: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 20,
    color: "#ffffff",
    textAlign: "center",
  },
});

/**
 * The heght of divider between input elements.
 */
const DIVIDER_HEIGHT = 8;

const EMPTY_ERROR_MESSAGE = "Please enter a value";

const FoodEditComponent = ({
  editCallback,
  date = null,
  onClickingSave,
  autoFillFoodData,
}) => {
  const dispatch = useDispatch();

  const userId = auth().currentUser?.uid;

  const [protein, setProtein] = useState("");
  const [carb, setCarb] = useState("");
  const [fat, setFat] = useState("");
  const [calorie, setCalorie] = useState("");
  const [calDisabled, setCalDisabled] = useState(0);
  const [water, setWater] = useState("");
  const [proteinError, setProteinError] = useState(false);
  const [carbError, setCarbError] = useState(false);
  const [fatError, setFatError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [edting, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [updateData, setUpdateData] = useState({});
  const [logs, setFoodLogs] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(moment(date).toDate().getTime());
  const [isTimeSet, setTimeSet] = useState(false);

  //dropdown picker states
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dateToFetch = moment(date).format("YYYY-MM-DD");

    firestore()
      .collection("user")
      .doc(userId)
      .collection("food")
      .doc(dateToFetch)
      .collection("details")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapShot) => {
        const documents = snapShot.docs;
        setFoodLogs(documents);
      });
  }, []);

  const navigation = useNavigation();

  /**
   * Method that validates if values are number before setting them in the state.
   * @param {*} text The text to validate
   * @param {*} setValue The method which will set the vlaue to state.
   */
  const validate = (text = "", setValue = () => {}) => {
    if (text == "") {
      setValue(text);
      return;
    }

    //const regexp = /^\d+(?:\.\d{1,2})?$/;
    if (!isNaN(text)) {
      setValue(parseFloat(text));
    } else {
      Alert.alert("", "Please enter numbers only");
      return;
    }
  };

  useEffect(() => {
    setCalDisabled(detailed);
    // in case of editing dont reset values
    if (edting) {
      return;
    }

    if (!detailed) {
      setCalorie("");
    } else {
      setCalorie(0);
    }

    setProtein("");
    setCarb("");
    setFat("");

    if (autoFillFoodData && autoFillFoodData !== null) {
      setProtein(parseFloat(autoFillFoodData.protein));
      setCarb(parseFloat(autoFillFoodData.carbs));
      setFat(parseFloat(autoFillFoodData.fat));
    }
    setProteinError(false);
    setCarbError(false);
    setFatError(false);
  }, [detailed]);

  useEffect(() => {
    if (autoFillFoodData !== null) {
      setDetailed(true);
    }
  }, [autoFillFoodData]);

  useEffect(() => {
    const p = protein == "" ? 0 : protein;
    const f = fat == "" ? 0 : fat;
    const c = carb == "" ? 0 : carb;
    const cal = (p + c) * 4 + f * 9;
    console.log("cal calculated", cal);
    if (cal == 0) {
      setCalorie("");
    } else {
      setCalorie(cal);
    }
  }, [protein, fat, carb]);

  /**
   * Final validation before submit.
   */
  const validateOnSubmit = () => {
    if (!isTimeSet) {
      Alert.alert("", "Please enter time");
      return;
    }

    if (detailed && (protein == "" || carb == "" || fat == "")) {
      setProteinError(protein == "");
      setCarbError(carb == "");
      setFatError(fat == "");
      return;
    }

    if ((!detailed && calorie != "" && calorie != 0) || water != 0) {
      return true;
    } else if (!detailed && (calorie == "" || calorie == 0) && water == 0) {
      Alert.alert("", "Please enter calorie intake or water consumption");
      return;
    }

    if (calorie == "" && water == 0) {
      setProteinError(protein == "");
      setCarbError(carb == "");
      setFatError(fat == "");
    } else {
      setProteinError(false);
      setCarbError(false);
      setFatError(false);
    }
    return (
      (protein !== "" && carb !== "" && fat !== "") ||
      calorie != "" ||
      water != 0
    );
  };

  //Method to save the food entry to database.
  //TODO repace with actual values
  const savefood = async () => {
    if (!validateOnSubmit()) {
      //stop proceeding if validation fails.
      return;
    }

    let calorieToSave = 0;
    let uncategorized = 0;

    if (protein !== "" && carb !== "" && fat !== "") {
      calorieToSave = 4 * protein + 4 * carb + 9 * fat;
      //calculate calorie
    } else {
      calorieToSave = calorie;
      uncategorized = calorie;
    }

    const dateToFetch = moment(date).format("YYYY-MM-DD");

    setLoading(true);
    const docRef = firestore()
      .collection("user")
      .doc(userId)
      .collection("food")
      .doc(dateToFetch);
    docRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          docRef
            .update({
              calories: firestore.FieldValue.increment(
                calorieToSave == "" ? 0 : calorieToSave
              ),
              protein: firestore.FieldValue.increment(
                protein == "" ? 0 : protein
              ),
              carbs: firestore.FieldValue.increment(carb == "" ? 0 : carb),
              fat: firestore.FieldValue.increment(fat == "" ? 0 : fat),
              water: firestore.FieldValue.increment(water == "" ? 0 : water),
              uncategorized: firestore.FieldValue.increment(
                uncategorized == "" ? 0 : uncategorized
              ),
            })
            .then(() => {
              setLoading(false);
              // navigation.navigate('dashboard');
              dispatch({
                type: dashboardActionTypes.FORCE_FOOD,
                payload: { toForceFoodData: true },
              });
              dispatch(FoodActionCreators.getDataForFoodTrendCard(dateToFetch));
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          docRef
            .set({
              calories: calorieToSave == "" ? 0 : calorieToSave,
              protein: protein == "" ? 0 : protein,
              carbs: carb == "" ? 0 : carb,
              fat: fat == "" ? 0 : fat,
              water: water == "" ? 0 : water,
              uncategorized: uncategorized == "" ? 0 : uncategorized,
            })
            .then(() => {
              setLoading(false);
              dispatch({
                type: dashboardActionTypes.FORCE_FOOD,
                payload: { toForceFoodData: true },
              });
              // navigation.navigate('dashboard');
              dispatch(FoodActionCreators.getDataForFoodTrendCard(dateToFetch));
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .then(() => {
        docRef.collection("details").add({
          timestamp: time,
          calories: calorieToSave,
          protein: protein == "" ? 0 : protein,
          carbs: carb == "" ? 0 : carb,
          fat: fat == "" ? 0 : fat,
          water: water,
          uncategorized: uncategorized == "" ? 0 : uncategorized,
        });
      });

    FoodListner(dispatch, dateToFetch);
    onClickingSave();
  };

  const deleteLog = () => {
    Alert.alert(
      "",
      "Are you sure you want to delete these details?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // Handle deletion logic here
            const data = logs[editingIndex].data();

            const dateToFetch = moment(date).format("YYYY-MM-DD");

            //update the calories
            firestore()
              .collection("user")
              .doc(userId)
              .collection("food")
              .doc(dateToFetch)
              .update({
                calories: firestore.FieldValue.increment(-(data.calories ?? 0)),
                protein: firestore.FieldValue.increment(-(data.protein ?? 0)),
                carbs: firestore.FieldValue.increment(-(data.carbs ?? 0)),
                fat: firestore.FieldValue.increment(-(data.fat ?? 0)),
                water: firestore.FieldValue.increment(-(data.water ?? 0)),
                uncategorized: firestore.FieldValue.increment(
                  -(data.uncategorized ?? 0)
                ),
              });

            logs[editingIndex].ref.delete();
            logs.splice(editingIndex, 1);
            setEditing(false);
            setFoodLogs([...logs]);
            setProtein("");
            setCarb("");
            setFat("");
            setWater("");
            setCalorie("");

            dispatch({
              type: foodActionTypes.DELETE_FOOD_DATA,
              payload: { isDeleted: true },
            });

            dispatch(FoodActionCreators.getDataForFoodTrendCard(dateToFetch));
            dispatch({
              type: dashboardActionTypes.FORCE_FOOD,
              payload: { toForceFoodData: true },
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateFood = () => {
    if (!validateOnSubmit() || editingIndex == -1) {
      //stop proceeding if validation fails.

      return;
    }

    const foodToUpdate = updateData.data();
    let uncat = 0;
    // console.log("carbupdate", carb);

    // console.log("food to update", foodToUpdate.carbs);

    const calorieDiff =
      (foodToUpdate.calories ?? 0) - (calorie == "" ? 0 : calorie);
    const proteinDiff =
      (foodToUpdate.protein ?? 0) - (protein == "" ? 0 : protein);
    const carbDiff = (foodToUpdate.carbs ?? 0) - (carb == "" ? 0 : carb);
    const fatDiff = (foodToUpdate.fat ?? 0) - (fat == "" ? 0 : fat);
    const waterDiff = (foodToUpdate.water ?? 0) - (water == "" ? 0 : water);

    // console.log("carb diff", carbDiff);
    // console.log("fat diff", fatDiff);
    // console.log("fat diff", fatDiff);

    foodToUpdate.calories = calorie == "" ? 0 : calorie;
    foodToUpdate.protein = protein == "" ? 0 : protein;
    foodToUpdate.carbs = carb == "" ? 0 : carb;
    foodToUpdate.fat = fat == "" ? 0 : fat;
    foodToUpdate.water = water == "" ? 0 : water;
    foodToUpdate.timestamp = time;

    // console.log("foodToUpdate", foodToUpdate.carbs);

    //if not detailed view then set the uncategorized field
    if (!detailed) {
      uncat = calorieDiff;
    }

    const promises = [];

    promises.push(updateData.ref.update(foodToUpdate));

    const dateToFetch = moment(date).format("YYYY-MM-DD");

    const promise = firestore()
      .collection("user")
      .doc(userId)
      .collection("food")
      .doc(dateToFetch)
      .update({
        calories: firestore.FieldValue.increment(-calorieDiff),
        protein: firestore.FieldValue.increment(-proteinDiff),
        carbs: firestore.FieldValue.increment(-carbDiff),
        fat: firestore.FieldValue.increment(-fatDiff),
        water: firestore.FieldValue.increment(-waterDiff),
        uncategorized: firestore.FieldValue.increment(-uncat),
      });

    promises.push(promise);

    Promise.all(promises).then(() => {
      setLoading(false);
      // navigation.navigate('dashboard');
      dispatch(FoodActionCreators.getDataForFoodTrendCard(dateToFetch));
      dispatch({
        type: dashboardActionTypes.FORCE_FOOD,
        payload: { toForceFoodData: true },
      });

      FoodListner(dispatch, moment(date).format("YYYY-MM-DD"));
      onClickingSave();
    });
  };

  const onEdit = (idx, data) => {
    setEditing(true);
    setEditingIndex(idx);

    setUpdateData(data);

    const calData = data.data();
    //if protein , fat and carbs are present, set to detailed view
    if (calData.protein || calData.carbs || calData.fat) {
      setDetailed(true);
      //pre fill the values
      // console.log("calData", calData.carbs);
      setProtein(calData.protein ?? 0);
      setCarb(calData.carbs ?? 0);
      setFat(calData.fat ?? 0);
    } else {
      setDetailed(false);
    }
    setCalorie(calData.calories);
    setWater(calData.water);
    setTime(calData.timestamp);
    setTimeSet(true);
  };

  const [fetched, setFetched] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const changeTime = (event, selectedTime) => {
    setSelectedTime(selectedTime);
    setTimeSet(true);
    const fetched = moment(event.nativeEvent.timestamp).toDate().getTime();
    setFetched(fetched);
  };

  const changeTimeForAndroid = (selectedTime) => {
    setTimeSet(true);
    const fetchedTime = moment(selectedTime.getTime()).toDate().getTime();
    setTimeSet(true);

    const current = moment().toDate().getTime();

    if (fetchedTime > current) {
      setTime(
        moment(date)
          .startOf("day")
          .hour(moment(current).hour())
          .minute(moment(current).minute())
          .toDate()
          .getTime()
      );
    } else {
      setTime(
        moment(date)
          .startOf("day")
          .hour(moment(fetchedTime).hour())
          .minute(moment(fetchedTime).minute())
          .toDate()
          .getTime()
      );
    }

    setShowTimePicker(false);
  };

  const hidePicker = () => {
    setTimeSet(true);

    const current = moment().toDate().getTime();

    if (fetched > current) {
      setTime(
        moment(date)
          .startOf("day")
          .hour(moment(current).hour())
          .minute(moment(current).minute())
          .toDate()
          .getTime()
      );
    } else {
      setTime(
        moment(date)
          .startOf("day")
          .hour(moment(fetched).hour())
          .minute(moment(fetched).minute())
          .toDate()
          .getTime()
      );
    }

    setShowTimePicker(false);
  };

  return (
    <View>
      <View className="p-5" style={{ width: "100%" }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 20,
            width: "100%",
          }}
        >
          <View>
            <View
              style={{
                marginBottom: 20,
                borderWidth: 1,
                padding: 5,
                borderRadius: 5,
                borderColor: "#4a4a4a",
                backgroundColor: "#FFFFFF",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#4a4a4a",
                    marginLeft: 10,
                    fontSize: 16,
                  }}
                >
                  Water Consumption
                </Text>
              </View>

              <View
                style={{
                  alignItems: "center",
                  marginVertical: 10,
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // width: 350,
                    width: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setWater(8);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        height: 70,
                        backgroundColor: water == 8 ? "#fb923c" : "white",
                        padding: 10,
                        borderRadius: 100,
                        width: 60,
                      }}
                    >
                      <FontAwesome5
                        name="glass-whiskey"
                        size={24}
                        color={water != 8 ? "#fb923c" : "white"}
                      />
                      <Text
                        style={{
                          color: water != 8 ? "black" : "white",
                        }}
                      >
                        8 oz
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setWater(16);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: water == 16 ? "#fb923c" : "white",
                        padding: 2,
                        width: 60,
                        padding: 10,
                        borderRadius: 100,
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        height: 70,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="bottle-soda-outline"
                        size={35}
                        color={water != 16 ? "#fb923c" : "white"}
                      />
                      <Text
                        style={{
                          color: water != 16 ? "black" : "white",
                        }}
                      >
                        16 oz
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setWater(24);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: water == 24 ? "#fb923c" : "white",
                        padding: 2,
                        width: 60,
                        padding: 10,
                        borderRadius: 100,
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        height: 70,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="bottle-soda-classic-outline"
                        size={35}
                        color={water != 24 ? "#fb923c" : "white"}
                      />
                      <Text
                        style={{
                          color: water != 24 ? "black" : "white",
                        }}
                      >
                        24 oz
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {detailed && (
              <>
                <View className="mb-3">
                  <CustomInput
                    value={carb}
                    keyboardType="number-pad"
                    placeholder="Carbohydrates (g)"
                    onChangeText={(text) => validate(text, setCarb)}
                  />
                </View>

                <Text
                  style={{
                    ...styles.errorText,
                    opacity: carbError ? 100 : 0,
                    display: detailed ? "flex" : "none",
                    fontSize: 13,
                  }}
                >
                  {EMPTY_ERROR_MESSAGE}
                </Text>

                <View className="mb-3">
                  <CustomInput
                    value={protein}
                    keyboardType="number-pad"
                    placeholder="Protein (g)"
                    onChangeText={(text) => validate(text, setProtein)}
                  />
                </View>
                <Text
                  style={{
                    ...styles.errorText,
                    opacity: proteinError ? 100 : 0,
                    display: detailed ? "flex" : "none",
                    fontSize: 13,
                  }}
                >
                  {EMPTY_ERROR_MESSAGE}
                </Text>

                <View>
                  <CustomInput
                    value={fat}
                    keyboardType="number-pad"
                    placeholder="Fat (g)"
                    onChangeText={(text) => validate(text, setFat)}
                  />
                </View>
                <Text
                  style={{
                    ...styles.errorText,
                    opacity: fatError ? 100 : 0,
                    display: detailed ? "flex" : "none",
                    fontSize: 13,
                  }}
                >
                  {EMPTY_ERROR_MESSAGE}
                </Text>
              </>
            )}

            <View className="mb-3">
              <TextInput
                outlineColor="#4a4a4a"
                textAlign={"center"}
                keyboardType="number-pad"
                label="Calorie Intake"
                value={`${calorie}`}
                // disabled={calDisabled}
                editable={!calDisabled}
                outlineStyle={{ borderColor: "#555555" }}
                contentStyle={{ color: "#4a4a4a" }}
                onChangeText={(text) => validate(text, setCalorie)}
                mode="outlined"
                style={styles.inputBox}
                theme={{
                  colors: {
                    primary: "#fb923c",
                    error: "#E32A17",
                  },
                }}
              />
            </View>
            <LineBreak />
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <TextInput
                textAlign="center"
                pointerEvents="none"
                // disabled={true}
                contentStyle={{
                  color: "#4a4a4a",
                }}
                outlineColor="#4a4a4a"
                showSoftInputOnFocus={false}
                label="Time"
                value={moment(time).format("HH:mm")}
                mode="outlined"
                editable={false}
                style={[styles.inputBox]}
                theme={{
                  colors: {
                    primary: "#fb923c",
                    error: "#E32A17",
                  },
                }}
              />
            </TouchableOpacity>

            {Platform.OS === "android" ? (
              <>
                {showTimePicker ? (
                  <View className="items-center mt-4">
                    <DateTimePickerModal
                      isVisible={showTimePicker}
                      mode="time"
                      onConfirm={changeTimeForAndroid}
                      onCancel={() => setShowTimePicker(false)}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {showTimePicker ? (
                  <View className="items-center mt-4">
                    <TouchableOpacity onPress={hidePicker}>
                      <Text className="text-blue-400 text-lg">Done</Text>
                    </TouchableOpacity>
                    <RNDateTimePicker
                      isVisible={showTimePicker}
                      value={selectedTime}
                      mode="time"
                      display="spinner"
                      //   onChange={onChange}
                      onChange={changeTime}
                      onTouchCancel={() => setShowTimePicker(false)}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}

            <TouchableOpacity
              onPress={() => {
                setDetailed(!detailed);
              }}
              className="my-5 self-end flex-row items-center space-x-2"
              disabled={loading}
            >
              {detailed ? (
                <MinusCircleIcon color="#fb923c" />
              ) : (
                <PlusCircleIcon color="#fb923c" />
              )}
              <Text className="text-orange-400 font-bold">
                {" "}
                {detailed ? "Less details" : "Add details"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={edting ? updateFood : savefood}
              className="border-2 border-orange-400 bg-orange-400 p-4 rounded-md mb-5 flex-row items-center justify-center"
            >
              <Text className="text-white font-lg font-bold">
                {" "}
                {edting ? "Update" : loading ? "Saving ..." : "Save"}
              </Text>
            </TouchableOpacity>
            {edting && (
              <TouchableOpacity
                onPress={() => {
                  setEditing(false);
                  setEditingIndex(-1);
                  setProtein("");
                  setCarb("");
                  setFat("");
                  setWater("");
                  setUpdateData({});
                }}
                style={
                  {
                    // ...styles.signupButton,
                    // backgroundColor: "#FF6666",
                  }
                }
                className="border-2 border-red-400 p-4 rounded-md mb-5 flex-row items-center justify-center"
              >
                <Text className="text-red-400 font-lg"> Cancel </Text>
              </TouchableOpacity>
            )}
            {!edting && (
              <TouchableOpacity
                onPress={() => {
                  setProtein("");
                  setCarb("");
                  setFat("");
                  setWater("");
                  setCalorie("");
                  onClickingSave();
                }}
                className="border-2 border-red-400 p-4 rounded-md mb-5 flex-row items-center justify-center"
                style={
                  {
                    // ...styles.signupButton,
                    // backgroundColor: "#FF6666",
                  }
                }
              >
                <Text className="text-red-400 font-lgs font-bold">
                  {" "}
                  Cancel{" "}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <FoodLog
            onEdit={onEdit}
            isEdit={edting}
            index={editingIndex}
            logs={logs}
            onDelete={deleteLog}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const LineBreak = () => <View style={{ margin: DIVIDER_HEIGHT }} />;

const FoodLog = ({ onEdit, isEdit, index, logs, onDelete }) => {
  return (
    <View>
      {logs.map((d, idx) => {
        const data = d.data();

        const trendData = [
          {
            title: "Calories",
            value: (data?.calories ?? 0) == 0 ? "-" : data?.calories,
          },
          {
            title: "Water",
            value: (data?.water ?? 0) == 0 ? "-" : `${data?.water} oz`,
          },
          {
            title: "Protein",
            value: (data?.protein ?? 0) == 0 ? "-" : `${data?.protein} g`,
          },
          {
            trendCardBarColor: "green",
          },
        ];

        return (
          <View
            style={{
              display: isEdit ? (index == idx ? "flex" : "none") : "flex",
            }}
          >
            <TrendCardComponent
              isFoodLog={true}
              key={idx}
              title={
                isEdit
                  ? `Updating ${moment(data.timestamp).format("MMM DD YYYY")}`
                  : moment(data.timestamp).format("MMM DD YYYY")
              }
              subtitle={moment(data.timestamp).format("hh:mm A")}
              showSync={false}
              onEdit={() => onEdit(idx, d)}
              showEdit={!isEdit}
              showDelete={isEdit}
              showArrows={false}
              data={trendData}
              isFoodTrendCard={true}
              onDelete={onDelete}
            />
          </View>
        );
      })}
    </View>
  );
};

export default FoodEditComponent;
