import { useState, useEffect } from "react";
import { Platform, PermissionsAndroid, Alert, AppState, Linking } from "react-native";
import Geolocation from "react-native-geolocation-service";

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [locationPermissionAsked, setLocationPermissionAsked] = useState(false);

  // Request permission for location
  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      try {
        const permissionStatus = await Geolocation.requestAuthorization("whenInUse");
        if (permissionStatus === "granted") {
          return true;
        } else {
          showSettingsAlert();
          return false;
        }
      } catch (error) {
        console.error("iOS Permission Error:", error);
        return false;
      }
    } else if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          showSettingsAlert();
          return false;
        }
      } catch (error) {
        console.error("Android Permission Error:", error);
        return false;
      }
    }
    return false;
  };

  // fetchng user location
  const getUserLocation = async (askPermission = false) => {
    if (!locationPermissionAsked && askPermission) {
      setLocationPermissionAsked(true);
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error("Location Error:", error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  //  alert to open settings if permission is denied
  const showSettingsAlert = () => {
    Alert.alert(
      "Location Permission Required",
      "To filter doctors by distance, enable location access in settings.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
  };

  // requesting for location immediately when component mounts
  useEffect(() => {
    getUserLocation(true);
  }, []);

  // listening for app state changes (returning from settings)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        getUserLocation(false);
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  return { userLocation, getUserLocation };
};

export default useUserLocation;
