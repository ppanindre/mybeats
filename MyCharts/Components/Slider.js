import image1 from '../../assets/img.png';
import image2 from '../../assets/img.png';
import image3 from '../../assets/img.png';
import image4 from '../../assets/img.png';
import image5 from '../../assets/img.png';
import { View, FlatList, Image, Dimensions } from 'react-native';
import React from 'react';


export function Slider() {
  // Array of 5 dummy local images
  const dummyImages = [
    { id: "1", source: image1 },
    { id: "2", source: image2 },
    { id: "3", source: image3 },
    { id: "4", source: image4 },
    { id: "5", source: image5 },
  ];

  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={dummyImages}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id} // Adding a key extractor for unique identification
        renderItem={({ item }) => (
          <Image
            source={item.source} // Using local image source
            style={{
              width: Dimensions.get('screen').width * 0.92,
              marginBottom: 15,
              height: 215,
              borderRadius: 10,
              margin: 2,
            }}
          />
        )}
      />
    </View>
  );
}

export default Slider;
