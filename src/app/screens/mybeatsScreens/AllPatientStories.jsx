import React, { useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PatientStory from "../../../../components/Cards/PatientStory";
import { patientStoriesListByDoctorsActionCreators } from "../../../../store/actions/patientStoriesAction";
import Loader from "../../components/Utils/Loader";
import ScreenContainer from "../../components/Containers/ScreenContainer";

const AllPatientStories = ({ route }) => {
    const { doctorId } = route.params;
    const dispatch = useDispatch();
    const { loading, patientStories, error } = useSelector((state) => state.patientStoriesListByDoctorReducer);

    useEffect(() => {
        dispatch(patientStoriesListByDoctorsActionCreators(doctorId));
    }, [doctorId]);

    if (loading) return <Loader />;

    return (
        <ScreenContainer>
            <ScrollView>
                <View className="space-y-5">
                    {patientStories && patientStories.length > 0 ? (
                        patientStories.map((story) => (
                            <View key={story.id}>
                                <PatientStory story={story} />
                            </View>
                        ))
                    ) : (
                        <Text className="text-md font-[appfont-semi]">No patient stories available.</Text>
                    )}
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

export default AllPatientStories;
