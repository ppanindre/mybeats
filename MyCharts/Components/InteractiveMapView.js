import React from 'react';
import { View, Image, Platform, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const InteractiveMapView = ({ latitude, longitude, name, zipcode }) => {
  const openMaps = (lat, lon, label) => {
    let url;
    if (Platform.OS === 'ios') {
      // apple maps for ios
      const labelEncoded = encodeURIComponent(label);
      url = `http://maps.apple.com/?ll=${lat},${lon}&q=${labelEncoded}`;
    } else {
      // Use Google Maps for Android
      url = `geo:${lat},${lon}?q=${lat},${lon}(Label)`;
    }

    Linking.openURL(url).catch(err =>
      console.error('An error occurred', err)
    );
  };

  const renderMap = () => {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        onPress={() => openMaps(latitude, longitude, name)}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={name}
          description={`Zipcode: ${zipcode}`}
        />
      </MapView>
    );
  };

  return (
    <View className="h-40 mt-4 mx-0 rounded-lg overflow-hidden">
      {renderMap()}
    </View>
  );
};

export default InteractiveMapView;
