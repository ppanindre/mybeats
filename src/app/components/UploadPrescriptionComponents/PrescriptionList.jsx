import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { listDoctorPrescriptionsByAppointmentActionCreator } from '../../../../store/actions/prescriptionActions';
import { useRoute } from '@react-navigation/native';
import CollapsibleItem from '../../../../components/CollapsibleItem';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenContainer from '../Containers/ScreenContainer';
import Loader from '../Utils/Loader';

const PrescriptionList = () => {
    const route = useRoute();
    const { appointmentId } = route.params;
    const dispatch = useDispatch();
    const {loading, prescriptions} = useSelector((state) => state.prescriptionList);

    useEffect(() => {
        if (appointmentId) {
            dispatch(listDoctorPrescriptionsByAppointmentActionCreator(appointmentId));
        }
    }, [dispatch, appointmentId]);

    // days function
    const formatDays = (days) => {
        return days.replace(/[\[\]"]+/g, '').split(', ').join(', ');
    };

    // dosageQuantity formatting for display
    const formatDosageQuantity = (dosageQuantity) => {
        return dosageQuantity
            .replace(/[{}]/g, '')
            .split(', ')
            .map((entry) => entry.replace('=', ' - '))
            .join('\n');
    };

    if (loading) return <Loader/>

    return (
        <ScreenContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
                {prescriptions && prescriptions.length > 0 ? (
                    prescriptions.map((item) => (
                        <View key={item.id} className="p-3 border-b border-darkSecondary">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <Image
                                        className="h-12 w-12 rounded-full"
                                        source={require("../../assets/wellness_product.jpeg")}
                                    />
                                    <View className="ml-4">
                                        <Text className="text-lg font-[appfont-semi]">
                                            {item.medicineName}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <CollapsibleItem titleComponent={
                                <Text className="text-sm font-[appfont-semi] text-dark">
                                    Dosage Details
                                </Text>
                            }>
                                <Text className="text-sm font-[appfont-semi] text-dark">
                                    {formatDays(item.days)}
                                </Text>
                                <Text className="text-sm font-[appfont-semi] text-dark">
                                    {item.dosage}
                                </Text>
                                <Text className="text-sm font-[appfont-semi] text-dark">
                                    {formatDosageQuantity(item.dosageQuantity)}
                                </Text>
                                <Text className="text-sm font-[appfont-semi] text-dark">
                                    {`Start Date: ${moment(item.startDate).format('MMMM D, YYYY')}`}
                                </Text>
                                <Text className="text-sm font-[appfont-semi] text-dark">
                                    {`End Date: ${moment(item.endDate).format('MMMM D, YYYY')}`}
                                </Text>
                                <Text className="text-sm font-[appfont-semi] text-dark">
                                    Note: {item.note || "No additional notes"}
                                </Text>
                            </CollapsibleItem>
                        </View>
                    ))
                ) : (
                    <View className="p-3">
                        <Text className="text-lg font-[appfont-semi] text-center">
                            No prescriptions available
                        </Text>
                    </View>
                )}
            </ScrollView>
        </ScreenContainer>
    );
};

export default PrescriptionList;
