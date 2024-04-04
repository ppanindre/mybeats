import getHeartRates from "../cache/heartRateCache";
import moment from "moment";
import getActivityData from "../cache/activityCache";
import getSleep from "../cache/sleepCache";
import getFood from "../cache/foodCache";
import getUser from "../cache/userCache";




const YELLOW_COLOR = "#FFEF00"
const ARROW_UP = "caretup";
const ARROW_DOWN = "caretdown";
const CALORIE_REQUIREMENT = 2000;
const GREY_COLOR = "#D4d4d4";
const DAY_ACTIVITY_MINUTES = 60 * 16


const getDataForActivityTrendCard = async (optionalStartDate = null) => {
    let date = null;
    let previousDate = null;
    if (optionalStartDate) {
        date = moment(optionalStartDate).startOf("d").format("YYYY-MM-DD")
        previousDate = moment(optionalStartDate).startOf("d").subtract(1, "d").format("YYYY-MM-DD");
    } else {
        date = moment().startOf("d").format("YYYY-MM-DD");
        previousDate = moment().startOf("d").subtract(1, "d").format("YYYY-MM-DD");
    }

    let showGrey = false
    const current = moment().startOf("d").format("YYYY-MM-DD");
    if (current == date) {
        showGrey = true
    }

    let currentDayActivity = await (await getActivityData(date))?.activity;
    let previousDayActivity = await (await getActivityData(previousDate))?.activity;

    let currentSteps = currentDayActivity?.steps ?? 0;
    let previousSteps = previousDayActivity?.steps ?? 0;
    let currentSedantary = currentDayActivity?.sedentaryMinutes ?? 0;
    let previousWater = previousDayActivity?.sedentaryMinutes ?? 0;
    let currentLight = currentDayActivity?.fairlyActiveMinutes ?? 0;
    let previousLight = previousDayActivity?.fairlyActiveMinutes ?? 0;
    let trendCardBar = "green"
    let activeTime = currentLight + (currentDayActivity?.lightlyActiveMinutes ?? 0) + (currentDayActivity?.veryActiveMinutes ?? 0);
    let preciousActiveTime = previousLight + (previousDayActivity?.lightlyActiveMinutes ?? 0) + (previousDayActivity?.veryActiveMinutes ?? 0);
    let sedcolor = "green";
    let actColor = "green";

    if (currentSedantary => 0.50 * DAY_ACTIVITY_MINUTES) {
        sedcolor = "red";
        actColor = "red";
    } else if (currentSedantary > 0.25 * DAY_ACTIVITY_MINUTES && currentSedantary < 0.40 * DAY_ACTIVITY_MINUTES) {
        sedcolor = YELLOW_COLOR
        actColor = YELLOW_COLOR;
    } else {
        sedcolor = "green"
        actColor = "green"
    }
    const stepsColor = currentSteps == 0 || showGrey ? GREY_COLOR : currentSteps >= 10000 ? "green" : currentSteps < 10000 && currentSteps > 7500 ? YELLOW_COLOR : "red";
    // TODO color calculation
    const sedantaryColor = currentSedantary == 0 ? GREY_COLOR : sedcolor;
    const activeColor = activeTime == 0 ? GREY_COLOR : actColor;





    if (currentSedantary == 0) {
        trendCardBar = GREY_COLOR
    } else {
        if (stepsColor == "red" || sedantaryColor == "red" || activeColor == "red") {
            trendCardBar = "red"
        } else if (stepsColor == YELLOW_COLOR || sedantaryColor == YELLOW_COLOR || activeColor == YELLOW_COLOR) {
            trendCardBar = YELLOW_COLOR
        } else {
            trendCardBar = "green";
        }
    }


    return [{
        title: "Steps",
        value: currentSteps == 0 ? "-" : currentSteps,
        arrow: currentSteps == 0 || previousSteps == 0 ? ARROW_DOWN : currentSteps > previousSteps ? ARROW_UP : ARROW_DOWN,
        color: stepsColor,
    },
    {
        title: "Idle",
        value: currentSedantary == 0 ? "-" : `${currentSedantary} mins`,
        arrow: currentSedantary == 0 || previousWater == 0 ? ARROW_DOWN : previousWater < currentSedantary
            ? ARROW_UP : ARROW_DOWN,
        color: sedantaryColor,
    },
    {
        title: "Active",
        value: activeTime == 0 || activeTime == "-" ? "-" : `${activeTime} mins`,
        arrow: activeTime == 0 || preciousActiveTime == 0 ? ARROW_DOWN
            : activeTime > preciousActiveTime ? ARROW_UP : ARROW_DOWN,
        color: activeColor,
    },
    {
        trendCardBarColor: trendCardBar
    }]
};


const getDataForFoodTrendCard = async (optionalStartDate = null, forced = false) => {

    const user = await getUser();
    const join = moment(user?.joinDate).format("MM-DD-YYYY")

    let date = null;
    let previousDate = null;

    //date = moment().startOf("d").format("YYYY-MM-DD")
    if (optionalStartDate) {
        date = moment(optionalStartDate).startOf("d").format("YYYY-MM-DD")
        previousDate = moment(optionalStartDate).startOf("d").subtract(1, "d").format("YYYY-MM-DD");
    } else {
        date = moment().startOf("d").format("YYYY-MM-DD");
        previousDate = moment().startOf("d").subtract(1, "d").format("YYYY-MM-DD");
    }
    


    let showGrey = false
    const current = moment().startOf("d").format("YYYY-MM-DD");
    if (current == date) {
        showGrey = true
    }

    let currentDayActivity = await getFood(date, forced);
    let previousDayActivity = null;


    // //keep fetching until we find a valid entry
    // let counter = 1;
    // while (currentDayActivity?.calories && !previousDayActivity?.calories && current != join && counter < 15) {
    //     previousDate = moment(optionalStartDate).startOf("d").subtract(counter, "d").format("YYYY-MM-DD");
    //     previousDayActivity = await getFood(previousDate, forced);
    //     counter = counter + 1;
    // }

    let currentSteps = currentDayActivity?.calories ?? "-";
    let previousSteps = previousDayActivity?.calories ?? "-";
    let currentSedantary = currentDayActivity?.water ?? "-";
    let previousWater = previousDayActivity?.water ?? "-";
    let currentProtein = currentDayActivity?.protein ?? "-";
    let prevProtein = previousDayActivity?.protein ?? "-";
    let calorieFactor = currentSteps ?? "-" ? 0 : currentSteps / CALORIE_REQUIREMENT



    //15 - 30 - greem protein
    // 10 - 15 - yellow
    // 35 > red 
    let proteinColor = "";
    let calorieColor = ""
    let waterColor = ""
    let trendbarColor = ""

    const categorizedCal =
        Math.max((currentDayActivity?.calories ?? 0) - (currentDayActivity?.uncategorized ?? 0), 0)

    const proteinCal = currentProtein == "-" ? 0 : currentProtein * 4;

    if (proteinCal == 0) {
        proteinColor = GREY_COLOR
    } else if (proteinCal > 0.15 * categorizedCal && proteinCal < 0.30 * categorizedCal) {
        proteinColor = "green";
    } else if (proteinCal > 0.35 * categorizedCal || proteinCal < 0.10 * categorizedCal) {
        proteinColor = "red"
    } else {
        proteinColor = YELLOW_COLOR
    }

    if (showGrey) {
        calorieColor = GREY_COLOR;
        waterColor = GREY_COLOR;
        trendbarColor = proteinColor;
    } else {
        calorieColor = currentSteps == "-" ? GREY_COLOR : calorieFactor < 0.5 ? "red" : calorieFactor > 1.5 ? "red" :
            calorieFactor > 0.7 && calorieFactor < 1.3 ? "green"
                : calorieFactor ? YELLOW_COLOR : GREY_COLOR
        waterColor = currentSedantary == "-" ? GREY_COLOR : currentSedantary < 50 ? "red"
            : currentSedantary > 50 && currentSedantary < 70 ? "yellow" : "green"


        if (calorieColor == GREY_COLOR && waterColor == GREY_COLOR && proteinColor == GREY_COLOR) {
            trendbarColor = GREY_COLOR;
        } else if (calorieColor == "red" || waterColor == "red" || proteinColor == "red") {
            trendbarColor = "red";
        } else if (calorieColor == "yellow" || waterColor == "yellow" || proteinColor == "yellow") {
            trendbarColor = "yellow";
        } else {
            trendbarColor = "red";
        }
    }



    return [{
        title: "Calories",
        value: currentSteps == "-" || currentSteps == 0 ? "-" : `${currentSteps}`,
        arrow: currentSteps == "-" || previousSteps == "-" ? ARROW_DOWN
            : currentSteps > previousSteps ? ARROW_UP : ARROW_DOWN,
        color: calorieColor
    },
    {
        title: "Water",
        value: currentSedantary == "-" || currentSedantary == 0 ? "-" : `${currentSedantary} oz`,
        arrow: currentSedantary == "-" || previousWater == "-" ? ARROW_DOWN :
            previousWater > currentSedantary ? ARROW_UP : ARROW_DOWN,
        color: waterColor
    },
    {
        title: "Protein",
        value: currentProtein == "-" || currentProtein == 0 ? "-" : `${currentProtein} g`,
        arrow: currentProtein == "-" || prevProtein == "-" ? ARROW_DOWN :
            currentProtein >= prevProtein ? ARROW_UP : ARROW_DOWN,
        color: currentProtein == "-" ? GREY_COLOR :
            proteinColor,
    },
    {
        trendCardBarColor: trendbarColor
    }]

};


const getDataForSleepTrendCard = async (optionalStartDate = null) => {
    let date = null;
    let previousDate = null;
    if (optionalStartDate) {
        date = moment(optionalStartDate).startOf("d").format("YYYY-MM-DD")
        previousDate = moment(optionalStartDate).startOf("d").subtract(1, "d").format("YYYY-MM-DD");
    } else {
        date = moment().startOf("d").format("YYYY-MM-DD");
        previousDate = moment().startOf("d").subtract(1, "d").format("YYYY-MM-DD");
    }

    let showGrey = false
    const current = moment().startOf("d").format("YYYY-MM-DD");
    if (current == date) {
        showGrey = true
    }

    let currentDayActivity = await (await getSleep(date)).data;
    let previousDayActivity = await (await getSleep(previousDate)).data;

    let currentSteps = currentDayActivity?.deep ?? "-";
    let previousSteps = previousDayActivity?.deep ?? "-";
    let currentSedantary = ((currentDayActivity?.totalTimeInBed ?? 0) 
    - (currentDayActivity?.wake ?? 0)) ?? "-";
    let previousWater = ((previousDayActivity?.totalTimeInBed ?? 0) 
    - (previousDayActivity?.wake ?? 0)) ?? "-";
    let currentLight = currentDayActivity?.light ?? "-";
    let previousLight = previousDayActivity?.light ?? "-";
    let trendBarColor = ""

    if (currentSedantary == 0) {
        currentSedantary = "-"
    }

    if (currentSteps == 0) {
        currentSteps = "-"
    }


    if (currentLight == 0) {
        currentLight = "-"
    }




    const deepColor = currentSteps == "-" ? GREY_COLOR :
        currentSteps <= 60 ? "red" : currentSteps > 60 && currentSteps <= 90 ? YELLOW_COLOR : "green";
    const listColor = currentLight == "-" ? GREY_COLOR : currentLight < 180 ? "red" : currentLight > 180 && currentLight < 240 ? YELLOW_COLOR : "green";
    const totalColor = currentSedantary == "-" ? GREY_COLOR : currentSedantary > 480 ? "green" : currentSedantary < 480 && currentSedantary >= 360 ? YELLOW_COLOR : "red";



    if (deepColor == "red" || listColor == "red" || totalColor == "red") {
        trendCardBar = "red"
    } else if (deepColor == YELLOW_COLOR || listColor == YELLOW_COLOR || totalColor == YELLOW_COLOR) {
        trendCardBar = YELLOW_COLOR
    } else {
        trendCardBar = "green";
    }



    return [{
        title: "Deep",
        value: currentSteps == "-" ? currentSteps : `${currentSteps} mins`,
        arrow: previousSteps == "-" ? ARROW_DOWN : currentSteps > previousSteps ? ARROW_UP : ARROW_DOWN,
        color: deepColor,
    },
    {
        title: "Light",
        value: currentLight == "-" ? currentLight : `${currentLight} mins`,
        arrow: currentLight == "-" || previousLight == "-" ? ARROW_DOWN : currentLight > previousLight ? ARROW_UP : ARROW_DOWN,
        color: listColor,
    },
    {
        title: "Total",
        value: currentSedantary == "-" ? currentSedantary : `${currentSedantary} mins`,
        arrow: previousWater == "-" || currentSedantary == "-" ? ARROW_DOWN : previousWater < currentSedantary ? ARROW_UP : ARROW_DOWN,
        color: totalColor,
    },
    {
        trendCardBarColor: currentSedantary == "-" ? GREY_COLOR : trendCardBar
    }]
};

/**
 * Fetch the details for heart rate.
 * @returns The heart rate trend card data.
 */
const getDataForHeartRateTrendCard = async (optionalStartDate = null) => {
    let date = null;
    let previousDate = null;

    if (optionalStartDate) {
        date = moment(optionalStartDate).startOf("d").format("YYYY-MM-DD")
        previousDate = moment(optionalStartDate).startOf("d").subtract(1, "d").format("YYYY-MM-DD");
    } else {
        date = moment().startOf("d").format("YYYY-MM-DD");
        previousDate = moment().startOf("d").subtract(1, "d").format("YYYY-MM-DD");
    }

    // let showGrey = false
    // const current = moment().startOf("d").format("YYYY-MM-DD");
    // if (current == date) {
    //     showGrey = true
    // }

    const heartRateData = await getHeartRates(date);
    const prevHeartRate = await getHeartRates(previousDate)
    let currentDayHR = await (heartRateData).intraday ?? [0, 0, 0];
    let previousDayHR = await (prevHeartRate).intraday ?? [0, 0, 0];
    currentDayHR = currentDayHR.filter(val => val !== 0);
    previousDayHR = previousDayHR.filter(val => val !== 0);
    const currentAverage = heartRateData?.heartRateData?.min ?? 0;
    const previousAverage = prevHeartRate?.heartRateData?.min ?? 0;
    const currentMax = Math.floor(Math.max(...currentDayHR, 0));
    const previousMax = Math.max(...previousDayHR, 0);
    const currentResting = heartRateData?.heartRateData?.resting ?? 0;
    const previousResting = prevHeartRate?.heartRateData?.resting ?? 0;
    let restingColor = "red";
    let averageColor = "red";
    let maxColor = "red";

    let isYellow = false;
    let isRed = false;
    let isGreen = false;


    if (
        currentResting >= 40 &&
        currentResting <= 80
    ) {
        isGreen = true;
        restingColor = "green";
    } else if (
        currentResting > 80 &&
        currentResting <= 100
    ) {
        isYellow = true;
        restingColor = YELLOW_COLOR
    } else if (currentResting > 100) {
        isRed = true;
        restingColor = "red"
    } else {
        restingColor = "grey"
    }

    if (
        currentAverage >= 40 &&
        currentAverage <= 100
    ) {
        isGreen = true;
        averageColor = "green";
    } else if (
        currentAverage > 100 &&
        currentAverage <= 120
    ) {
        isYellow = true;
        averageColor = YELLOW_COLOR
    } else if (currentAverage > 120) {
        isRed = true;
        averageColor = "red"
    } else {
        averageColor = "grey"
    }

    //average color
    if (currentAverage == "NaN" || previousAverage == "NaN") {
        //no data

        averageColor = GREY_COLOR;
    }


    if (
        currentMax >= 40 &&
        currentMax <= 120
    ) {
        isGreen = true;
        maxColor = "green";
    } else if (
        currentMax > 120 &&
        currentMax <= 140
    ) {
        isYellow = true;
        maxColor = YELLOW_COLOR
    } else if (currentMax > 140) {
        isRed = true;
        maxColor = "red"
    } else {
        maxColor = "grey"
    }

    //max color
    if (currentMax == 0) {
        //no data
        maxColor = GREY_COLOR;
    }


    // RESTING IS 0 then min without 0



    return [{
        title: "Resting",
        value: currentResting == 0 ? "-" : `${currentResting} bpm`,
        arrow: currentResting == 0 || previousResting == 0 ? ARROW_DOWN : currentResting > previousResting ? ARROW_UP : ARROW_DOWN,
        color: restingColor,
    },
    {
        title: "Average",
        value: currentAverage == "NaN" || currentAverage == 0 ? "-" : `${currentAverage} bpm`,
        arrow: currentAverage == "NaN" || previousAverage == "NaN" ? ARROW_DOWN : currentAverage > previousAverage ? ARROW_UP : ARROW_DOWN,
        color: averageColor,
    },
    {
        title: "High",
        value: currentMax == 0 ? "-" : `${currentMax} bpm`,
        arrow: currentMax == 0 || previousMax == 0 ? ARROW_DOWN : currentMax > previousMax ? ARROW_UP : ARROW_DOWN,
        color: maxColor,
    },
    {
        trendCardBarColor: isRed ? "red" : isYellow ? YELLOW_COLOR : isGreen ? "green" : GREY_COLOR
    }]
};

export {
    getDataForHeartRateTrendCard,
    getDataForActivityTrendCard,
    getDataForSleepTrendCard,
    getDataForFoodTrendCard
}

// export const getDataForHeartRateTrendCard = (
//   currentIntradayData,
//   prevIntradayData,
//   currentHeartRateData,
//   prevHeartRateData
// ) => {
//   console.log(
//     currentIntradayData,
//     prevIntradayData,
//     currentHeartRateData,
//     prevHeartRateData
//   );
// };
