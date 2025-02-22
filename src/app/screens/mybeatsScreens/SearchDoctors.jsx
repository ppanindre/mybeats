import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomSafeView from "../../../../components/CustomSafeView";
import { listDoctorsActionCreator } from "../../../../store/actions/doctorActions";
import DoctorFilters from "../../components/PatientDashboardComponents/DoctorFilters";
import { useRoute } from "@react-navigation/native";
import { geocodeAddress } from "../../../../store/actions/geocodingActions";
import Loader from "../../components/Utils/Loader";
import SearchBar from "../../components/SearchDoctos/SearchBar";
import SearchRecommendations from "../../components/SearchDoctos/SearchRecommendations";
import DoctorList from "../../components/SearchDoctos/DoctorList";
import useUserLocation from "../../components/SearchDoctos/useUserLocation";
import useDoctorFilters from "../../components/SearchDoctos/useDoctorFilters";
import useDoctorSearch from "../../components/SearchDoctos/useDoctorSearch";
import { array } from "zod";

const SearchDoctors = () => {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [geocodedDoctors, setGeocodedDoctors] = useState({});
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctorsListReducer);

  const { coordinates, loading, error } = useSelector(
    (state) => state.geocodingGetReducer
  );

  const {
    searchInput,
    searchText,
    setSearchText,
    searchRecommendations,
    setSearchRecommendations,
    results,
    setResults,
    originalResults,
    setOriginalResults,
    handleSearchInput,
    handleSearchSubmit,
    handleDoctorSelect,
  } = useDoctorSearch(doctors);
  

  const { userLocation, getUserLocation } = useUserLocation();
  const { selectedFilters, setSelectedFilters, applyFilters } = useDoctorFilters(
    results, 
    userLocation, 
    geocodedDoctors, 
    getUserLocation
  );

  // Fetch missing coordinates for doctors
  useEffect(() => {
    if (Array.isArray(doctors) && doctors.length > 0) {
      doctors.forEach((doctor) => {
        if (!doctor.latitude || !doctor.longitude) {
          console.log("📍 Doctor missing coordinates:", doctor);

          dispatch(
            geocodeAddress(
              doctor.address,
              doctor.city,
              doctor.state,
              doctor.zipcode,
              doctor.doctorID
            )
          );
        }
      });
    }
  }, [doctors]);

  // update local state with received geocode coordinates
  useEffect(() => {
    if (coordinates && coordinates.latitude && coordinates.longitude) {
      console.log("New coordinates received from API:", coordinates);

      if (!coordinates.doctorID) {
        // console.warn("Missing doctorID in received coordinates", coordinates);
        return; // to avaoid updating wrong doctors
      }

      setGeocodedDoctors((prev) => ({
        ...prev,
        [coordinates.doctorID]: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        },
      }));
      

      setResults((prevResults) => {
        console.log("Updating Results: Before:", prevResults);
        const updatedResults = prevResults.map((doctor) =>
          doctor.doctorID === coordinates.doctorID
            ? {
                ...doctor,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }
            : doctor
        );
        console.log("Updated Results:", updatedResults);
        return updatedResults;
      });

      setOriginalResults((prevOriginalResults) =>
        prevOriginalResults.map((doctor) =>
          doctor.doctorID === coordinates.doctorID
            ? {
                ...doctor,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              }
            : doctor
        )
      );
    }
  }, [coordinates]);

  useEffect(() => {
    dispatch(listDoctorsActionCreator());
    // request location on page load
    getUserLocation(true);
  }, []);

  useEffect(() => {
    if (route.params?.specialization && Array.isArray(doctors)) {
      const selectedSpecializations = route.params.specialization.map((s) =>
        s.toLowerCase()
      );

      const filteredDoctors = doctors.filter((doctor) => {
        const primarySpecialization =
          doctor.primarySpecialization?.toLowerCase() || "";
        const secondarySpecializations = doctor.secondarySpecialization
          ? doctor.secondarySpecialization
              .split(";")
              .map((s) => s.trim().toLowerCase())
          : [];

        // Best match: Primary specialization should match first
        if (selectedSpecializations.includes(primarySpecialization)) {
          return true;
        }

        // Second best: If any of the secondary specializations match
        return secondarySpecializations.some((specialization) =>
          selectedSpecializations.includes(specialization)
        );
      });

      // Sort doctors by relevance (Primary match first, then experience, then ratings)
      filteredDoctors.sort((a, b) => {
        const aPrimaryMatch = selectedSpecializations.includes(
          a.primarySpecialization?.toLowerCase() || ""
        );
        const bPrimaryMatch = selectedSpecializations.includes(
          b.primarySpecialization?.toLowerCase() || ""
        );

        if (aPrimaryMatch !== bPrimaryMatch) {
          return bPrimaryMatch - aPrimaryMatch; // Prefer primary matches
        }
        return parseExperience(b.experience) - parseExperience(a.experience); // higher experience first
      });

      setResults(filteredDoctors);
      setOriginalResults(filteredDoctors);
      setSearchText(route.params.specialization[0]);
      setSearchRecommendations([]); // clearing recommendations when filtering
    }
  }, [route.params, doctors]);

  const handleDoctorCardPress = (doctorId) => {
    navigation.navigate("appointment", { doctorId });
  };


  const parseExperience = (experience) => {
    const match = experience.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const handleApplyFilters = async (filters) => {
    if (filters.distance) {
      await getUserLocation(true); // location permission if needed
    }
  
    const filteredDoctors = await applyFilters(filters);
    setResults(filteredDoctors);
    setFilterModalVisible(false);
  };

  return (
    <CustomSafeView>
      <SearchBar
        searchInput={searchInput}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView className="py-5 h-[100%]">
        <SearchRecommendations
          recommendations={searchRecommendations}
          onSelect={handleDoctorSelect}
        />
        <DoctorList
          doctors={results}
          searchText={searchText}
          onDoctorPress={handleDoctorCardPress}
          onFilterPress={() => setFilterModalVisible(true)}
        />
      </ScrollView>
      <DoctorFilters
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </CustomSafeView>
  );
};

export default SearchDoctors;
