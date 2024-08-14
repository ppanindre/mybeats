import { View, ScrollView, Dimensions, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import * as Sentry from "@sentry/react-native";

import HeartRateDayChart from "../../../../components/HeartRateDayChart";
import TrendCardComponent from "../../../../components/TrendCardComponent";
import CustomDayChartComponent from "../../../../components/CustomDayChartComponent";
import CustomTrendDatePicker from "../../../../components/CustomTrendDatePicker";
import HeartRateTrend from "../../../../components/HeartRateTrend";

import {
  getHeartRateIntraday,
  getHeartRateTrendCardData,
  getHeartRateTrendChartData,
} from "../../../../apis/heartRateQueries";
import { WEEK_LABELS, YEAR_LABLES } from "../../../../constants/dateConstants";


const { height, width } = Dimensions.get("window");

const HeartRate = () => {
    // define dispatch instance
    const dispatch = useDispatch();

    // REDUX STORE
    const { heartRateIntradayStore, heartRateDataStore } = useSelector(
        (state) => state.HeartRateReducer
    ); // get heart rate store
    const user = useSelector((state) => state.UserReducer); // get user listener instance

    // STATES
    const [currentDate, setCurrentDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    const [isHeartRateChartLoading, setIsHeartRateChartLoading] =
        useState(false);
    const [isTrendChartLoading, setIsTrendChartLoading] = useState(false); // trend chart loading
    const [heartRateDailyChartData, setHeartRateDailyChartData] = useState([]); // heart rate day chart
    const [heartRateTrendCardData, setHeartRateTrendCardData] = useState([]); // heart rate card data
    const [heartRateTrendChartData, setHeartRateTrendChartData] = useState([]); // heart rate trend data
    const [heartRateTrendChartLabels, setHeartRateTrendChartLabels] =
        useState(WEEK_LABELS); // trend labels

    useEffect(() => {
        const currentDate = moment().format("YYYY-MM-DD"); // get curreent date
        const startDate = moment()
            .startOf("week")
            .format("YYYY-MM-DD")
            .toString(); // get start date for trend range
        const endDate = moment().endOf("week").format("YYYY-MM-DD").toString(); // get end date for trend range
        changeDate(currentDate, (forceDataForToday = true)); // fetch data for day chart
        changeDateRange(startDate, endDate, "week"); // fetch trend chart data
    }, [user]); // whenever user syncs or changes device

    // function to fetch day chart data whenever date is changed
    const changeDate = async (queryDate, forceDataForToday = false) => {
        setCurrentDate(queryDate);

        try {
            setIsHeartRateChartLoading(true);

            // get current heart rate data for the day chart
            const currentHeartRateIntradayData = await getHeartRateIntraday(
                queryDate,
                heartRateIntradayStore,
                dispatch,
                user.vendor,
                user.userId,
                forceDataForToday
            );
            setHeartRateDailyChartData(currentHeartRateIntradayData); // set heart rate chart data
            const prevQueryDate = moment(queryDate)
                .subtract(1, "days")
                .format("YYYY-MM-DD"); // get prev date

            // get card data
            const cardData = await getHeartRateTrendCardData(
                queryDate,
                prevQueryDate,
                heartRateIntradayStore,
                heartRateDataStore,
                dispatch,
                user.vendor,
                user.userId,
                forceDataForToday
            );
            setHeartRateTrendCardData(cardData); // set trend card data

            setIsHeartRateChartLoading(false);
        } catch (error) {
            Sentry.captureException(error, {
                extra: { message: "Error while fetching heart rate data" },
            }); // capture error
        }
    };

    // function to fetch trend data between range
    const changeDateRange = async (startDate, endDate, selectedMode) => {
        setIsTrendChartLoading(true); // show trend chart loading
        // handle change of mode for week, month, year
        switch (selectedMode) {
            // mode selected is week
            case "week": {
                setHeartRateTrendChartLabels(WEEK_LABELS); // set trend chart labels for week
                break;
            }

            // mode selected is month
            case "month": {
                const startMoment = moment(startDate, "YYYY-MM-DD");
                const daysInMonth = startMoment.daysInMonth();
                const labelsArray = Array.from(
                    { length: daysInMonth },
                    (_, i) => i + 1
                );
                setHeartRateTrendChartLabels(labelsArray); // set trend chart labels for month
                break;
            }

            // mode selected to year
            case "year": {
                setHeartRateTrendChartLabels(YEAR_LABLES); // set trend chart labels for year
                break;
            }
        }
        try {
            const trendChartData = await getHeartRateTrendChartData(
                startDate,
                endDate,
                user.userId,
                user.vendor
            ); // get trend chart data
            setHeartRateTrendChartData(trendChartData); // set trend chart data
        } catch (error) {
            Sentry.captureException(error, {
                extra: { message: "Error while fetching heartrate trend data" },
            }); //capture error
        }
        setIsTrendChartLoading(false); // stop showing loading
    };

    return (
        <View className="relative" sentry-label="heartrate">
            <View className="p-5" style={{ width: "100%" }}>
                {isHeartRateChartLoading &&
                    currentDate === moment().format("YYYY-MM-DD") && (
                        <View
                            style={{ height: height * 0.7, width: width }}
                            className=" bg-white items-center justify-center absolute top-0 left-0 z-10"
                        >
                            <Text className="text-md">
                                Syncing your data with AI
                            </Text>
                            <ActivityIndicator color="orange" />
                        </View>
                    )}

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 5,
                        width: "100%",
                    }}
                >
                    {/* Day chart component */}
                    <CustomDayChartComponent
                        sentry-label="heartrate-day-chart-date"
                        changeDate={changeDate}
                    />

                    {/* Heart rate day chart */}
                    <HeartRateDayChart chartData={heartRateDailyChartData} />

                    {/* trend card component */}
                    <TrendCardComponent
                        sentry-label="heartrate-trend-card"
                        title="Heart Rate"
                        lastSyncDate={null}
                        date={null}
                        data={heartRateTrendCardData ?? []}
                    />

                    {/* trend date range */}
                    <View>
                        <CustomTrendDatePicker
                            sentry-label="heartrate-trend-date"
                            isDataLoading={isTrendChartLoading}
                            changeDateRange={changeDateRange}
                        />
                    </View>

                    {/* trend chart data */}
                    <View>
                        <HeartRateTrend
                            isLoading={isTrendChartLoading}
                            labels={heartRateTrendChartLabels}
                            data={heartRateTrendChartData}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default HeartRate;
