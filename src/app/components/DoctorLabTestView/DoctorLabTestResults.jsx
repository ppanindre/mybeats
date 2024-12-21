import React, { useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getLabTestResultsByPatientActionCreator } from "../../../../store/actions/labTestResultsActions";
import Loader from "../../components/Utils/Loader";
import ScreenContainer from "../../components/Containers/ScreenContainer";
import moment from "moment";

const DoctorLabTestResults = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patientId } = route.params;

  const dispatch = useDispatch();

  const { loading: labTestsLoading, labTestResults } = useSelector(
    (state) => state.labTestResultsByPatientReducer
  );

  useEffect(() => {
    dispatch(getLabTestResultsByPatientActionCreator(patientId)); 
  }, [dispatch, patientId]);

  const handleViewResult = (labTestResult) => {
    navigation.navigate("viewLabTestResults", { labTestResult });
  };

  const LabTestCard = ({ item: labTestResult }) => (
    <TouchableOpacity
      className="relative bg-lightPrimary items-center justify-center rounded-lg shadow-lg mb-5 p-5"
      onPress={() => handleViewResult(labTestResult)}
    >
      <View className="flex-row space-x-3 items-center">
        <View className="flex-1">
          <Text className="font-[appfont-semi] text-lg">
            {labTestResult.title}
          </Text>
          <Text className="font-[appfont-semi]">
            Date Submitted -{" "}
            {labTestResult.createdAt
              ? moment(labTestResult.createdAt).format("D MMM YYYY, H:mm a")
              : "N/A"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (labTestsLoading) return <Loader />;

  return (
    <ScreenContainer>
      {labTestResults?.length > 0 ? (
        <FlatList
          data={labTestResults} 
          renderItem={LabTestCard}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="font-[appfont-semi] text-center text-lg">
            No Lab Test Results found
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
};

export default DoctorLabTestResults;
