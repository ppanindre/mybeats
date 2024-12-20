import {
  LAB_TEST_RESULT_CREATE_REQUEST,
  LAB_TEST_RESULT_CREATE_SUCCESS,
  LAB_TEST_RESULT_CREATE_FAILURE,
  LAB_TEST_RESULT_GET_REQUEST,
  LAB_TEST_RESULT_GET_SUCCESS,
  LAB_TEST_RESULT_GET_FAILURE,
  LAB_TEST_RESULT_GET_BY_PATIENT_REQUEST,
  LAB_TEST_RESULT_GET_BY_PATIENT_SUCCESS,
  LAB_TEST_RESULT_GET_BY_PATIENT_FAILURE,
} from "../types/labTestResultsActionTypes";

export const labTestResultCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LAB_TEST_RESULT_CREATE_REQUEST: {
      return {
        loading: true,
      };
    }

    case LAB_TEST_RESULT_CREATE_SUCCESS: {
      return {
        loading: false,
        success: true,
        labTestResult: action.payload,
      };
    }

    case LAB_TEST_RESULT_CREATE_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const labTestResultGetReducer = (
  state = { labTestResults: [] },
  action
) => {
  switch (action.type) {
    case LAB_TEST_RESULT_GET_REQUEST: {
      return {
        loading: true,
      };
    }

    case LAB_TEST_RESULT_GET_SUCCESS: {
      return {
        loading: false,
        labTestResults: action.payload,
      };
    }

    case LAB_TEST_RESULT_GET_FAILURE: {
      return {
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export const labTestResultsByPatientReducer = (
    state = { labTestResults: [] },
    action
  ) => {
    switch (action.type) {
      case LAB_TEST_RESULT_GET_BY_PATIENT_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LAB_TEST_RESULT_GET_BY_PATIENT_SUCCESS:
        return {
          loading: false,
          labTestResults: action.payload,
        };
      case LAB_TEST_RESULT_GET_BY_PATIENT_FAILURE:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  