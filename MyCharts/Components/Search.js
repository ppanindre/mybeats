import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const colors = {
  white: '#fff',
  PRIMARY: '#0165fc',
  SECONDARY: '#dbeafe',
  LIGHT_GRAY: '#e6e8eb',
  GRAY: '#a6a4a4',
};

const Search = ({ setSearchText }) => {
  const [name, setName] = useState('');
  // const [specialization, setSpecialization] = useState('');
  // const [zipcode, setZipcode] = useState('');

  const handleSearch = () => {
    // When search is submitted, we call setSearchText with all the search criteria
    // setSearchText({ name, specialization, zipcode });
    setSearchText({ name });
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search-outline" size={24} color={colors.PRIMARY} />
      <TextInput
        placeholder='Search by name'
        onChangeText={setName}
        onSubmitEditing={handleSearch}
        style={styles.searchInput}
        returnKeyType="search"
      />
      {/* <TextInput
        placeholder='Search by specialization'
        onChangeText={setSpecialization}
        onSubmitEditing={handleSearch}
        style={styles.searchInput}
        returnKeyType="search"
      />
      <TextInput
        placeholder='Search by zipcode'
        onChangeText={setZipcode}
        onSubmitEditing={handleSearch}
        style={styles.searchInput}
        returnKeyType="search"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: colors.GRAY,
    padding: 8,
    borderRadius: 8,
    width: '85%',
  },
  searchInput: {
    width: '100%',
    fontFamily: 'appfont',
    marginLeft: 8,
  },
});

export default Search;


