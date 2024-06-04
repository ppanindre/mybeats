import React, { useEffect, useState } from 'react';
import { View, Text, Platform, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const geocodeAddress = async (address, city, state, zipcode, apiKey) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: `${address}, ${city}, ${state}, ${zipcode}, India`,
        key: apiKey,
      }
    });

    if (response.data.status === 'OK') {
      const { lat, lng } = response.data.results[0].geometry.location;
      return {
        latitude: lat,
        longitude: lng,
      };
    } else {
      console.error('Geocoding API error:', response.data.status);
      return null;
    }
  } catch (error) {
    console.error('Geocoding API error:', error);
    return null;
  }
};

const InteractiveMapView = ({ name, city, address, state, zipcode, apiKey }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const result = await geocodeAddress(address, city, state, zipcode, apiKey);
      setCoordinates(result);
    };
    fetchCoordinates();
  }, [address, city, state, zipcode, apiKey]);

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
