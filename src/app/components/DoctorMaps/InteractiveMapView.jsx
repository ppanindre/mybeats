import React, { useEffect } from 'react';
import { View, Text, Platform, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { geocodeAddress } from '../../../../store/actions/geocodingActions';
import Loader from '../Utils/Loader';

const InteractiveMapView = ({ name, city, address, state, zipcode }) => {
  const dispatch = useDispatch();
  const { coordinates, loading, error } = useSelector((state) => state.geocodingGetReducer);

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
        <Loader />
      </View>
    );
  }

  if (error || !coordinates) {
    return null;
  }


  return (
    <>
      <Text className="text-xl mb-3 font-[appfont-semi]">
        Clinic Location
      </Text>
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
    </>
  );
};

export default InteractiveMapView;
