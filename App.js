import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import React from "react";
import { Provider } from "react-redux";
import { TourGuideProvider } from "rn-tourguide";
import { useFonts } from "expo-font";
import * as Sentry from "@sentry/react-native";
import { Amplify } from "aws-amplify";

import { store } from "./store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainStack from "./src/app/configs/MainStack";
import amplifyConfigure from "./src/amplifyconfiguration.json";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#4a4a4a",
  },
};

const App = () => {
  Amplify.configure(amplifyConfigure);
  // Load Fonts
  const [fontsLoaded] = useFonts({
    appfont: require("./assets/fonts/Nunito-Regular.ttf"),
    "appfont-bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "appfont-semi": require("./assets/fonts/Nunito-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

  Sentry.init({
    dsn: "https://b912a3406d194d1eb240e5ffd3521565@o1064605.ingest.sentry.io/6055532",
    enableInExpoDevelopment: true,
    enableAutoSessionTracking: true,
    // Sessions close after app is 10 seconds in the background.
    sessionTrackingIntervalMillis: 10000,
    // To set a uniform sample rate
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.ReactNativeTracing({
        enableUserInteractionTracing: true,
        routingInstrumentation,
      }),
    ],
    debug: false,
  });

  return (
    <Sentry.TouchEventBoundary>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <TourGuideProvider androidStatusBarVisible={true}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <MainStack />
            </GestureHandlerRootView>
          </TourGuideProvider>
        </PaperProvider>
      </Provider>
    </Sentry.TouchEventBoundary>
  );
};

export default App;
