import { View } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import React from "react";
import { Provider } from "react-redux";
import { TourGuideProvider } from "rn-tourguide";
import * as Sentry from "@sentry/react-native";

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
