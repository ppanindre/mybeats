import React, { useEffect } from 'react';
import { View, Text, Platform, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { geocodeAddress } from '../../store/GeocodingReducer/GeocodingActions';

const InteractiveMapView = ({ name, city, address, state, zipcode }) => {
  const dispatch = useDispatch();
  const { coordinates, loading, error } = useSelector((state) => state.geocoding);

  useEffect(() => {
    dispatch(geocodeAddress(address, city, state, zipcode));
  }, [dispatch, address, city, state, zipcode]);

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

  if (loading) {
    return (
      <View>
        <Text>Loading map...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error loading map: {error}</Text>
      </View>
    );
  }

  if (!coordinates) {
    return (
      <View>
        <Text>No coordinates available</Text>
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
