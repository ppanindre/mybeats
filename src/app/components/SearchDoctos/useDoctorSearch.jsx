import { useState, useEffect } from "react";

const useDoctorSearch = (doctors) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchRecommendations, setSearchRecommendations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);

  useEffect(() => {
    if (doctors) {
      setSearchRecommendations(doctors.slice(0, 5)); // Limit search recommendations to 5
    }
  }, [doctors]);

  const handleSearchInput = (input) => {
    setSearchInput(input);
    setResults([]);
    setOriginalResults([]);

    if (input) {
      const lowerCaseSearchInput = input.toLowerCase();
      const filteredData = doctors.filter((doctor) => {
        const fullName = `${doctor.firstname ?? ""} ${doctor.lastname ?? ""}`.toLowerCase();
        const zipcode = doctor.zipcode ? doctor.zipcode.toLowerCase() : "";
        const secondarySpecialization = doctor.secondarySpecialization
          ? doctor.secondarySpecialization.toLowerCase()
          : "";

        return (
          fullName.includes(lowerCaseSearchInput) ||
          zipcode.includes(lowerCaseSearchInput) ||
          secondarySpecialization.includes(lowerCaseSearchInput)
        );
      });

      setSearchRecommendations(filteredData.slice(0, 5));
    } else {
      setSearchRecommendations([]);
    }
  };

  const handleSearchSubmit = () => {
    const lowerCaseSearchInput = searchInput.toLowerCase();
    const filteredData = doctors.filter((doctor) => {
      const fullName = `${doctor.firstname ?? ""} ${doctor.lastname ?? ""}`.toLowerCase();
      const zipcode = doctor.zipcode ? doctor.zipcode.toLowerCase() : "";
      const secondarySpecialization = doctor.secondarySpecialization
        ? doctor.secondarySpecialization.toLowerCase()
        : "";

      return (
        fullName.includes(lowerCaseSearchInput) ||
        zipcode.includes(lowerCaseSearchInput) ||
        secondarySpecialization.includes(lowerCaseSearchInput)
      );
    });

    setResults(filteredData);
    setOriginalResults(filteredData);
    setSearchRecommendations([]);
    setSearchText(searchInput);
  };

  const handleDoctorSelect = (doctor) => {
    setResults([doctor]);
    setOriginalResults([doctor]);
    setSearchText(`${doctor.firstname} ${doctor.lastname}`);
    setSearchRecommendations([]);
  };

  return {
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
  };
};

export default useDoctorSearch;
