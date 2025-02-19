import { useState, useEffect } from "react";
import calculateDistance from "./utils";

const useDoctorFilters = (doctors, userLocation, geocodedDoctors, getUserLocation) => {
  const [selectedFilters, setSelectedFilters] = useState({
    experience: false,
    videoConsultation: false,
    inPerson: false,
    distance: false,
    ratings: false,
    consultationFee: false,
  });

  const applyFilters = async (filters) => {
    let filteredData = [...doctors];

    if (filters.distance) {
      await getUserLocation(true);
    }

    if (filters.distance && userLocation) {
      filteredData = filteredData
        .map((doctor) => {
          const latitude = doctor.latitude || geocodedDoctors[doctor.doctorID]?.latitude;
          const longitude = doctor.longitude || geocodedDoctors[doctor.doctorID]?.longitude;

          if (!latitude || !longitude) return null;

          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            latitude,
            longitude
          );

          return { ...doctor, distance };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);
    }

    if (filters.experience) {
      filteredData.sort((a, b) => parseExperience(b.experience) - parseExperience(a.experience));
    }

    if (filters.videoConsultation) {
      filteredData = filteredData.filter((doctor) => doctor.availableForVideoConsultation);
    }

    if (filters.inPerson) {
      filteredData = filteredData.filter((doctor) => !doctor.availableForVideoConsultation);
    }

    if (filters.ratings) {
      filteredData.sort((a, b) => b.rating - a.rating);
    }

    if (filters.consultationFee) {
      filteredData.sort((a, b) => b.feeForVideoConsultation - a.feeForVideoConsultation);
    }

    return filteredData;
  };

  useEffect(() => {
    if (selectedFilters.distance) {
      applyFilters(selectedFilters);
    }
  }, [userLocation]);

  const parseExperience = (experience) => {
    const match = experience.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
  };

  return { selectedFilters, setSelectedFilters, applyFilters };
};

export default useDoctorFilters;
