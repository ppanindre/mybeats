import { View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import React from "react";
import { Provider } from "react-redux";
import { TourGuideProvider } from "rn-tourguide";
import * as Sentry from "@sentry/react-native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);
import { useFonts } from 'expo-font'

import Router from "./routers/Router";
import { store } from "./store/store";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: "#4a4a4a",
  },
};

const App = () => {
  const [fontsLoaded] = useFonts({
    'appfont': require('./assets/fonts/Nunito-Regular.ttf'),
    'appfont-bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'appfont-semi': require('./assets/fonts/Nunito-Bold.ttf'),

  });
  if(!fontsLoaded)
  {
    return null;
  }
  const backgroundStyle = {
    flex: 1,
  };

  return (
    <Sentry.TouchEventBoundary>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <TourGuideProvider androidStatusBarVisible={true}>
            <View style={backgroundStyle}>
              <Router />
            </View>
          </TourGuideProvider>
        </PaperProvider>
      </Provider>
    </Sentry.TouchEventBoundary>
  );
};

export default App;
