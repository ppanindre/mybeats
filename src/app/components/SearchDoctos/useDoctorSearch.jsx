import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPrimaryToSecondaryMappings } from "../../../../store/actions/primarySpecializationActions";
import { fetchPrimarySpecializations } from "../../../../store/actions/primarySpecializationActions";
import { fetchSecondarySpecializations } from "../../../../store/actions/secondarySpecializationActions";

const useDoctorSearch = (doctors) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [searchRecommendations, setSearchRecommendations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);

  // fetching specializations from redux store
  const { specializations = [] } = useSelector((state) => state.primarySpecializationReducer || {});
  const { secondarySpecializations = [] } = useSelector((state) => state.secondarySpecializationReducer || {});
  const { mappings: primaryToSecondaryMap = [] } = useSelector((state) => state.primaryToSecondaryReducer || {});

  useEffect(() => {
    if (doctors) {
      setSearchRecommendations(doctors.slice(0, 5)); // Limit search recommendations to 5
    }
  }, [doctors]);

  useEffect(() => {
    dispatch(fetchPrimaryToSecondaryMappings());
    dispatch(fetchPrimarySpecializations());
    dispatch(fetchSecondarySpecializations());
  }, [dispatch]);

  const handleSearchInput = (input) => {
    setSearchInput(input);
    setResults([]);
    setOriginalResults([]);

    if (input) {
      const lowerCaseSearchInput = input.toLowerCase();

      // chcking if the input matches a primary specialization
      const matchedPrimarySpecialization = specializations.find(
        (spec) => spec.name.toLowerCase() === lowerCaseSearchInput
      );

      // if a primary spec is matched, return only doctors with that primary spec
      if (matchedPrimarySpecialization) {
        const filteredData = doctors.filter(
          (doctor) => String(doctor.primarySpecializationId) === String(matchedPrimarySpecialization.id)
        );

        setSearchRecommendations(filteredData.slice(0, 5));
        return;
      }

      // or find related primary spec for searched secondary spec
      const relatedPrimarySpecializationIds = primaryToSecondaryMap
        .filter((entry) =>
          secondarySpecializations?.find((s) =>
            String(s.id) === String(entry.secondarySpecialtyID) &&
            s.name.toLowerCase().includes(lowerCaseSearchInput)
          )
        )
        .map((entry) => entry.primarySpecialtyID);

      const filteredData = doctors.filter((doctor) => {
        const fullName = `${doctor.firstname ?? ""} ${doctor.lastname ?? ""}`.toLowerCase();
        const zipcode = doctor.zipcode ? doctor.zipcode.toLowerCase() : "";

        // Get Primary Specialization Name
        // const primarySpecialization = specializations?.find(
        //   (spec) => String(spec.id) === String(doctor?.primarySpecializationId)
        // )?.name?.toLowerCase() || "";

        // Get Secondary Specialization Names
        const secondarySpecializationArray = doctor?.secondarySpecializationIds?.map((secId) => {
          const specialization = secondarySpecializations?.find((s) => String(s.id) === String(secId));
          return specialization ? specialization.name.toLowerCase() : null;
        }).filter(Boolean) || [];

        // chcking if the doctor's primary specialization matches a mapped primary specialization
        const doctorHasRelatedPrimarySpecialization = relatedPrimarySpecializationIds.includes(
          String(doctor.primarySpecializationId)
        );

        return (
          fullName.includes(lowerCaseSearchInput) ||
          zipcode.includes(lowerCaseSearchInput) ||
          secondarySpecializationArray.some((spec) => spec.includes(lowerCaseSearchInput)) ||
          doctorHasRelatedPrimarySpecialization
        );
      });

      setSearchRecommendations(filteredData.slice(0, 5));
    } else {
      setSearchRecommendations([]);
    }
  };

  const handleSearchSubmit = () => {
    const lowerCaseSearchInput = searchInput.toLowerCase();

    // checking if the input matches a primary specialization
    const matchedPrimarySpecialization = specializations.find(
      (spec) => spec.name.toLowerCase() === lowerCaseSearchInput
    );

    // If a primary spec is matched, return only doctors with that primary spec
    if (matchedPrimarySpecialization) {
      const filteredData = doctors.filter(
        (doctor) => String(doctor.primarySpecializationId) === String(matchedPrimarySpecialization.id)
      );

      setResults(filteredData);
      setOriginalResults(filteredData);
      setSearchRecommendations([]);
      setSearchText(searchInput);
      return;
    }

    // or find related primary specializations for searched secondary specialization
    const relatedPrimarySpecializationIds = primaryToSecondaryMap
      .filter((entry) =>
        secondarySpecializations?.find((s) =>
          String(s.id) === String(entry.secondarySpecialtyID) &&
          s.name.toLowerCase().includes(lowerCaseSearchInput)
        )
      )
      .map((entry) => entry.primarySpecialtyID);

    const filteredData = doctors.filter((doctor) => {
      const fullName = `${doctor.firstname ?? ""} ${doctor.lastname ?? ""}`.toLowerCase();
      const zipcode = doctor.zipcode ? doctor.zipcode.toLowerCase() : "";

      // get Primary Specialization Name
      // const primarySpecialization = specializations?.find(
      //   (spec) => String(spec.id) === String(doctor?.primarySpecializationId)
      // )?.name?.toLowerCase() || "";

      // get Secondary Specialization Names
      const secondarySpecializationArray = doctor?.secondarySpecializationIds?.map((secId) => {
        const specialization = secondarySpecializations?.find((s) => String(s.id) === String(secId));
        return specialization ? specialization.name.toLowerCase() : null;
      }).filter(Boolean) || [];

      // checking if the doctor's primary specialization matches a mapped primary specialization
      const doctorHasRelatedPrimarySpecialization = relatedPrimarySpecializationIds.includes(
        String(doctor.primarySpecializationId)
      );

      return (
        fullName.includes(lowerCaseSearchInput) ||
        zipcode.includes(lowerCaseSearchInput) ||
        secondarySpecializationArray.some((spec) => spec.includes(lowerCaseSearchInput)) ||
        doctorHasRelatedPrimarySpecialization
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
