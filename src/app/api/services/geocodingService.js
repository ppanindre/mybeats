import axios from 'axios';

const apiKey = 'AIzaSyC1hiS3sXkvQPqEodYESWOLBYkUsyR8Tv4'; // Google Maps API key

const geocodingService = {
  geocodeAddress: async (address, city, state, zipcode) => {
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
  }
};

export default geocodingService;
