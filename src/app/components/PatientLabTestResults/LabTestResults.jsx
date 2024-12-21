import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getLabTestResultsActionCreator } from "../../../../store/actions/labTestResultsActions";
import Loader from "../Utils/Loader";
import ScreenContainer from "../Containers/ScreenContainer";
import AppButton from "../Buttons/AppButton";
import moment from "moment";

const LabTestResults = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading: labTestsLoading, labTestResults } = useSelector(
    (state) => state.labTestResultGetReducer
  );
  const [viewLoading, setViewLoading] = useState(false);

  useEffect(() => {
    dispatch(getLabTestResultsActionCreator());
  }, [dispatch]);

  const handleViewResult = (labTestResult) => {
    setViewLoading(true);
    navigation.navigate("uploadLabTestResult", { labTestResult });
    setViewLoading(false);
  };

  const handleUploadNewResult = () => {
    navigation.navigate("uploadLabTestResult");
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

  if (labTestsLoading || viewLoading) return <Loader />;

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
      <View>
        <AppButton
          variant="primary"
          btnLabel="Upload a New Test Result"
          onPress={handleUploadNewResult}
        />
      </View>
    </ScreenContainer>
  );
};

export default LabTestResults;
