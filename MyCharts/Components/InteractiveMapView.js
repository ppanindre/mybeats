import React, { useEffect, useState } from 'react';
import { View, Text, Platform, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const cache = new Map();

const geocodeAddress = async (address, city, zipcode) => {
  const cacheKey = `${address},${city},${zipcode}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: `${address}, ${city}, ${zipcode}`,
        format: 'json',
        limit: 1
      }
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      const coordinates = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };
      cache.set(cacheKey, coordinates);
      return coordinates;
    } else {
      console.error('Geocoding API error: No results found');
      return null;
    }
  } catch (error) {
    console.error('Geocoding API error:', error);
    return null;
  }
};

const InteractiveMapView = ({ name, city, address, zipcode }) => {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const result = await geocodeAddress(address, city, zipcode);
      setCoordinates(result);
    };
    fetchCoordinates();
  }, [address, city, zipcode]);

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
          description={`${address}, ${city}, ${zipcode}`}
        />
      </MapView>
    </View>
  );
};

export default InteractiveMapView;
