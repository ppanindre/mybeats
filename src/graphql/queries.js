/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDoctor = /* GraphQL */ `
  query GetDoctor($doctorID: ID!) {
    getDoctor(doctorID: $doctorID) {
      doctorID
      firstname
      lastname
      email
      phoneNumber
      licenseNumber
      upiId
      specialties {
        nextToken
        startedAt
        __typename
      }
      primarySpecializationId
      primarySpecialization {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      address
      city
      state
      experience
      secondarySpecialization
      availableForVideoConsultation
      feeForVideoConsultation
      educationExperience
      awardsRecognition
      website
      zipcode
      appointmentSlots {
        nextToken
        startedAt
        __typename
      }
      availability {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listDoctors = /* GraphQL */ `
  query ListDoctors(
    $doctorID: ID
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDoctors(
      doctorID: $doctorID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        doctorID
        firstname
        lastname
        email
        phoneNumber
        licenseNumber
        upiId
        primarySpecializationId
        address
        city
        state
        experience
        secondarySpecialization
        availableForVideoConsultation
        feeForVideoConsultation
        educationExperience
        awardsRecognition
        website
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDoctors = /* GraphQL */ `
  query SyncDoctors(
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDoctors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        doctorID
        firstname
        lastname
        email
        phoneNumber
        licenseNumber
        upiId
        primarySpecializationId
        address
        city
        state
        experience
        secondarySpecialization
        availableForVideoConsultation
        feeForVideoConsultation
        educationExperience
        awardsRecognition
        website
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getSpecialty = /* GraphQL */ `
  query GetSpecialty($id: ID!) {
    getSpecialty(id: $id) {
      id
      name
      doctors {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listSpecialties = /* GraphQL */ `
  query ListSpecialties(
    $filter: ModelSpecialtyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpecialties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSpecialties = /* GraphQL */ `
  query SyncSpecialties(
    $filter: ModelSpecialtyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSpecialties(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
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
      address
      zipcode
      appointmentSlots {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        address
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPatients = /* GraphQL */ `
  query SyncPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPatients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstname
        lastname
        email
        phoneNumber
        address
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getAvailability = /* GraphQL */ `
  query GetAvailability($id: ID!) {
    getAvailability(id: $id) {
      id
      doctorID
      startTime
      endTime
      isAvailable
      doctor {
        doctorID
        firstname
        lastname
        email
        phoneNumber
        licenseNumber
        upiId
        primarySpecializationId
        address
        city
        state
        experience
        secondarySpecialization
        availableForVideoConsultation
        feeForVideoConsultation
        educationExperience
        awardsRecognition
        website
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listAvailabilities = /* GraphQL */ `
  query ListAvailabilities(
    $filter: ModelAvailabilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAvailabilities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        doctorID
        startTime
        endTime
        isAvailable
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncAvailabilities = /* GraphQL */ `
  query SyncAvailabilities(
    $filter: ModelAvailabilityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAvailabilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        doctorID
        startTime
        endTime
        isAvailable
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getAppointmentSlot = /* GraphQL */ `
  query GetAppointmentSlot($id: ID!) {
    getAppointmentSlot(id: $id) {
      id
      doctorID
      patientId
      startTime
      endTime
      isBooked
      doctor {
        doctorID
        firstname
        lastname
        email
        phoneNumber
        licenseNumber
        upiId
        primarySpecializationId
        address
        city
        state
        experience
        secondarySpecialization
        availableForVideoConsultation
        feeForVideoConsultation
        educationExperience
        awardsRecognition
        website
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      patient {
        id
        firstname
        lastname
        email
        phoneNumber
        address
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listAppointmentSlots = /* GraphQL */ `
  query ListAppointmentSlots(
    $filter: ModelAppointmentSlotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppointmentSlots(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorID
        patientId
        startTime
        endTime
        isBooked
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncAppointmentSlots = /* GraphQL */ `
  query SyncAppointmentSlots(
    $filter: ModelAppointmentSlotFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAppointmentSlots(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        doctorID
        patientId
        startTime
        endTime
        isBooked
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getDoctorSpecialties = /* GraphQL */ `
  query GetDoctorSpecialties($id: ID!) {
    getDoctorSpecialties(id: $id) {
      id
      doctorDoctorID
      specialtyId
      doctor {
        doctorID
        firstname
        lastname
        email
        phoneNumber
        licenseNumber
        upiId
        primarySpecializationId
        address
        city
        state
        experience
        secondarySpecialization
        availableForVideoConsultation
        feeForVideoConsultation
        educationExperience
        awardsRecognition
        website
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      specialty {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listDoctorSpecialties = /* GraphQL */ `
  query ListDoctorSpecialties(
    $filter: ModelDoctorSpecialtiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoctorSpecialties(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorDoctorID
        specialtyId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDoctorSpecialties = /* GraphQL */ `
  query SyncDoctorSpecialties(
    $filter: ModelDoctorSpecialtiesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDoctorSpecialties(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        doctorDoctorID
        specialtyId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const doctorsByPrimarySpecializationId = /* GraphQL */ `
  query DoctorsByPrimarySpecializationId(
    $primarySpecializationId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    doctorsByPrimarySpecializationId(
      primarySpecializationId: $primarySpecializationId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        doctorID
        firstname
        lastname
        email
        phoneNumber
        licenseNumber
        upiId
        primarySpecializationId
        address
        city
        state
        experience
        secondarySpecialization
        availableForVideoConsultation
        feeForVideoConsultation
        educationExperience
        awardsRecognition
        website
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const doctorByZipcode = /* GraphQL */ `
  query DoctorByZipcode(
    $zipcode: String!
    $sortDirection: ModelSortDirection
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    doctorByZipcode(
      zipcode: $zipcode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        doctorID
        firstname
        lastname
        email
        phoneNumber
        licenseNumber
        upiId
        primarySpecializationId
        address
        city
        state
        experience
        secondarySpecialization
        availableForVideoConsultation
        feeForVideoConsultation
        educationExperience
        awardsRecognition
        website
        zipcode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const specialtyByName = /* GraphQL */ `
  query SpecialtyByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSpecialtyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    specialtyByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const availabilityByDoctor = /* GraphQL */ `
  query AvailabilityByDoctor(
    $doctorID: ID!
    $startTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAvailabilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    availabilityByDoctor(
      doctorID: $doctorID
      startTime: $startTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorID
        startTime
        endTime
        isAvailable
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const slotsByDoctor = /* GraphQL */ `
  query SlotsByDoctor(
    $doctorID: ID!
    $startTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAppointmentSlotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    slotsByDoctor(
      doctorID: $doctorID
      startTime: $startTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorID
        patientId
        startTime
        endTime
        isBooked
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const slotsByPatient = /* GraphQL */ `
  query SlotsByPatient(
    $patientId: ID!
    $startTime: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAppointmentSlotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    slotsByPatient(
      patientId: $patientId
      startTime: $startTime
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorID
        patientId
        startTime
        endTime
        isBooked
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const doctorSpecialtiesByDoctorDoctorID = /* GraphQL */ `
  query DoctorSpecialtiesByDoctorDoctorID(
    $doctorDoctorID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDoctorSpecialtiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    doctorSpecialtiesByDoctorDoctorID(
      doctorDoctorID: $doctorDoctorID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorDoctorID
        specialtyId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const doctorSpecialtiesBySpecialtyId = /* GraphQL */ `
  query DoctorSpecialtiesBySpecialtyId(
    $specialtyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDoctorSpecialtiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    doctorSpecialtiesBySpecialtyId(
      specialtyId: $specialtyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorDoctorID
        specialtyId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
