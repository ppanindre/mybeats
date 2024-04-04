/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDoctor = /* GraphQL */ `
  query GetDoctor($id: ID!) {
    getDoctor(id: $id) {
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
export const listDoctors = /* GraphQL */ `
  query ListDoctors(
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoctors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
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
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        email
        phoneNumber
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAppointment = /* GraphQL */ `
  query GetAppointment($id: ID!) {
    getAppointment(id: $id) {
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
export const listAppointments = /* GraphQL */ `
  query ListAppointments(
    $filter: ModelAppointmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppointments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chosenSlot
        date
        createdAt
        updatedAt
        doctorAppointmentsId
        patientAppointmentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
