/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDoctor = /* GraphQL */ `
  subscription OnCreateDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onCreateDoctor(filter: $filter) {
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
export const onUpdateDoctor = /* GraphQL */ `
  subscription OnUpdateDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onUpdateDoctor(filter: $filter) {
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
export const onDeleteDoctor = /* GraphQL */ `
  subscription OnDeleteDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onDeleteDoctor(filter: $filter) {
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
export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient($filter: ModelSubscriptionPatientFilterInput) {
    onCreatePatient(filter: $filter) {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient($filter: ModelSubscriptionPatientFilterInput) {
    onUpdatePatient(filter: $filter) {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient($filter: ModelSubscriptionPatientFilterInput) {
    onDeletePatient(filter: $filter) {
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
export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment(
    $filter: ModelSubscriptionAppointmentFilterInput
  ) {
    onCreateAppointment(filter: $filter) {
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
export const onUpdateAppointment = /* GraphQL */ `
  subscription OnUpdateAppointment(
    $filter: ModelSubscriptionAppointmentFilterInput
  ) {
    onUpdateAppointment(filter: $filter) {
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
export const onDeleteAppointment = /* GraphQL */ `
  subscription OnDeleteAppointment(
    $filter: ModelSubscriptionAppointmentFilterInput
  ) {
    onDeleteAppointment(filter: $filter) {
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
