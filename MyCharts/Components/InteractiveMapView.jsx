import React, { useEffect, useState } from 'react';
import { View, Text, Platform, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import geocodingService from '../../src/app/api/services/geocodingService';

const InteractiveMapView = ({ name, city, address, state, zipcode }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const result = await geocodingService.geocodeAddress(address, city, state, zipcode);
      setCoordinates(result);
    };
    fetchCoordinates();
  }, [address, city, state, zipcode]);

  const openMaps = (lat, lon, label) => {
    let url;
    if (Platform.OS === 'ios') {
      const labelEncoded = encodeURIComponent(label);
      url = `http://maps.apple.com/?ll=${lat},${lon}&q=${labelEncoded}`;
    } else {
      url = `geo:${lat},${lon}?q=${lat},${lon}(Label)`;
    }
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  if (!coordinates) {
    return (
      <View>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 10, height: 200 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        onPress={() => openMaps(coordinates.latitude, coordinates.longitude, name)}
      >
        <Marker
          coordinate={{ latitude: coordinates.latitude, longitude: coordinates.longitude }}
          title={name}
          description={`${address}, ${city}, ${state}, ${zipcode}`}
        />
      </MapView>
    </View>
  );
};

export default InteractiveMapView;
