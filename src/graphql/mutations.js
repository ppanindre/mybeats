/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDoctor = /* GraphQL */ `
  mutation CreateDoctor(
    $input: CreateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    createDoctor(input: $input, condition: $condition) {
      id
      firstname
      lastname
      email
      specialization
      phoneNumber
      address
      zipcode
      availableSlots
      appointments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateDoctor = /* GraphQL */ `
  mutation UpdateDoctor(
    $input: UpdateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    updateDoctor(input: $input, condition: $condition) {
      id
      firstname
      lastname
      email
      specialization
      phoneNumber
      address
      zipcode
      availableSlots
      appointments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDoctor = /* GraphQL */ `
  mutation DeleteDoctor(
    $input: DeleteDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    deleteDoctor(input: $input, condition: $condition) {
      id
      firstname
      lastname
      email
      specialization
      phoneNumber
      address
      zipcode
      availableSlots
      appointments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
      id
      firstname
      lastname
      email
      phoneNumber
      appointments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
      id
      firstname
      lastname
      email
      phoneNumber
      appointments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
      id
      firstname
      lastname
      email
      phoneNumber
      appointments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
      id
      doctor {
        id
        firstname
        lastname
        email
        specialization
        phoneNumber
        address
        zipcode
        availableSlots
        createdAt
        updatedAt
        __typename
      }
      patient {
        id
        firstname
        lastname
        email
        phoneNumber
        createdAt
        updatedAt
        __typename
      }
      chosenSlot
      date
      createdAt
      updatedAt
      doctorAppointmentsId
      patientAppointmentsId
      __typename
    }
  }
`;
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
      id
      doctor {
        id
        firstname
        lastname
        email
        specialization
        phoneNumber
        address
        zipcode
        availableSlots
        createdAt
        updatedAt
        __typename
      }
      patient {
        id
        firstname
        lastname
        email
        phoneNumber
        createdAt
        updatedAt
        __typename
      }
      chosenSlot
      date
      createdAt
      updatedAt
      doctorAppointmentsId
      patientAppointmentsId
      __typename
    }
  }
`;
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
      id
      doctor {
        id
        firstname
        lastname
        email
        specialization
        phoneNumber
        address
        zipcode
        availableSlots
        createdAt
        updatedAt
        __typename
      }
      patient {
        id
        firstname
        lastname
        email
        phoneNumber
        createdAt
        updatedAt
        __typename
      }
      chosenSlot
      date
      createdAt
      updatedAt
      doctorAppointmentsId
      patientAppointmentsId
      __typename
    }
  }
`;
