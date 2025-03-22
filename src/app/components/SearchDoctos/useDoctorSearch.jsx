import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPrimaryToSecondaryMappings } from "../../../../store/actions/primarySpecializationActions";
import { fetchPrimarySpecializations } from "../../../../store/actions/primarySpecializationActions";
import { fetchSecondarySpecializations } from "../../../../store/actions/secondarySpecializationActions";
import { fetchHealthConditionsActionCreator, fetchSecondarySpecializationsByHealthCondition, fetchDoctorsBySecondarySpecializations } from "../../../../store/actions/healthConditionActions";

const useDoctorSearch = (doctors) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [searchRecommendations, setSearchRecommendations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);
  const [isHealthConditionSearch, setIsHealthConditionSearch] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);

  // fetching specializations nd health conditions from redux store
  const { specializations = [] } = useSelector((state) => state.primarySpecializationReducer || {});
  const { secondarySpecializations = [] } = useSelector((state) => state.secondarySpecializationReducer || {});
  const { mappings: primaryToSecondaryMap = [] } = useSelector((state) => state.primaryToSecondaryReducer || {});
  const { healthConditions = [] } = useSelector((state) => state.healthConditionReducer || {});

  // to get doctors fetched based on health condition
  const doctorsByHealthCondition = useSelector(
    (state) => state.doctorsBySecondarySpecializationReducer?.doctors || []
  );

  const isLoading = useSelector((state) => state.doctorsBySecondarySpecializationReducer?.isLoading);
  const isSpeciazationLoading = useSelector((state) => state.secondarySpecializationByHealthConditionReducer?.isLoading);


  useEffect(() => {
    if (doctors) {
      setSearchRecommendations(doctors.slice(0, 5)); // Limit search recommendations to 5
    }
  }, [doctors]);

  useEffect(() => {
    dispatch(fetchPrimaryToSecondaryMappings());
    dispatch(fetchPrimarySpecializations());
    dispatch(fetchSecondarySpecializations());
    dispatch(fetchHealthConditionsActionCreator());
  }, [dispatch]);

  // updating search recommendations when health condition doctors are found
  useEffect(() => {
    if (isHealthConditionSearch) {
      if (isLoading) {
        setShowRecommendations(true)
        setSearchRecommendations([]); 
      } else if (doctorsByHealthCondition.length > 0) {  
        if (showRecommendations) {
          setSearchRecommendations(doctorsByHealthCondition);
        } else {
          setSearchRecommendations([]); // clearing reccomendations after search submission
        }
      }
    }
  }, [doctorsByHealthCondition, isHealthConditionSearch, isLoading, showRecommendations]);
  

  const handleSearchInput = (input) => {
    setSearchInput(input);
    setResults([]);
    setOriginalResults([]);
    setIsHealthConditionSearch(false);
    setShowRecommendations(true);
    

    if (!input) {
      setSearchRecommendations([]);
      return;
    }

    const lowerCaseSearchInput = input.toLowerCase();

    // checking if input matches a health condition ,if yes fetch doctors for recommendations
    const matchedHealthCondition = healthConditions.find(
      (hc) => hc.name.toLowerCase() === lowerCaseSearchInput
    );

    if (matchedHealthCondition) {
      // console.log(`Found Health Condition: ${matchedHealthCondition.name} - fetching doctors for recommendations`);
      setIsHealthConditionSearch(true);
      setShowRecommendations(false)
      setSearchRecommendations([]);
      dispatch(fetchSecondarySpecializationsByHealthCondition(matchedHealthCondition.name));
      return;
    }

    // checking if input matches a primary specialization
    const matchedPrimarySpecialization = specializations.find(
      (spec) => spec.name.toLowerCase() === lowerCaseSearchInput
    );

    if (matchedPrimarySpecialization) {
      const filteredData = doctors.filter(
        (doctor) => String(doctor.primarySpecializationId) === String(matchedPrimarySpecialization.id)
      );

      setSearchRecommendations(filteredData.slice(0, 5));
      return;
    }

    // cheking if input matches a secondary specialization
    const relatedPrimarySpecializationIds = primaryToSecondaryMap
      .filter((entry) =>
        secondarySpecializations.find(
          (s) =>
            String(s.id) === String(entry.secondarySpecialtyID) &&
            s.name.toLowerCase().includes(lowerCaseSearchInput)
        )
      )
      .map((entry) => entry.primarySpecialtyID);

    const filteredData = doctors.filter((doctor) => {
      const fullName = `${doctor.firstname ?? ""} ${doctor.lastname ?? ""}`.toLowerCase();
      const zipcode = doctor.zipcode ? doctor.zipcode.toLowerCase() : "";

      // Get Secondary Specialization Names
      const secondarySpecializationArray =
        doctor?.secondarySpecializationIds
          ?.map((secId) => {
            const specialization = secondarySpecializations.find((s) => String(s.id) === String(secId));
            return specialization ? specialization.name.toLowerCase() : null;
          })
          .filter(Boolean) || [];

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
  };

  const handleSearchSubmit = () => {
    if (isLoading || isSpeciazationLoading) {
      return; // to prevent conflict
    }
    const lowerCaseSearchInput = searchInput.toLowerCase();

    setSearchRecommendations([]);
    setShowRecommendations(false); 

    // to check if input matches a health condition & display results
    const matchedHealthCondition = healthConditions.find(
      (hc) => hc.name.toLowerCase() === lowerCaseSearchInput
    );

    if (matchedHealthCondition) {
      // console.log(`fetching doctors for Health Condition: ${matchedHealthCondition.name}`);
      setSearchText(matchedHealthCondition.name);
      setSearchRecommendations([]);
      setResults(doctorsByHealthCondition);
      setOriginalResults(doctorsByHealthCondition);
      return;
    }

    // checking if input matches a primary specialization for submit
    const matchedPrimarySpecialization = specializations.find(
      (spec) => spec.name.toLowerCase() === lowerCaseSearchInput
    );

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

    // checking if input matches a secondary specialization
    const relatedPrimarySpecializationIds = primaryToSecondaryMap
      .filter((entry) =>
        secondarySpecializations.find(
          (s) =>
            String(s.id) === String(entry.secondarySpecialtyID) &&
            s.name.toLowerCase().includes(lowerCaseSearchInput)
        )
      )
      .map((entry) => entry.primarySpecialtyID);

    const filteredData = doctors.filter((doctor) => {
      const fullName = `${doctor.firstname ?? ""} ${doctor.lastname ?? ""}`.toLowerCase();
      const zipcode = doctor.zipcode ? doctor.zipcode.toLowerCase() : "";

      // Get Secondary Specialization Names
      const secondarySpecializationArray =
        doctor?.secondarySpecializationIds
          ?.map((secId) => {
            const specialization = secondarySpecializations.find((s) => String(s.id) === String(secId));
            return specialization ? specialization.name.toLowerCase() : null;
          })
          .filter(Boolean) || [];

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
    isLoading,
    isSpeciazationLoading,
  };
};

export default useDoctorSearch;
