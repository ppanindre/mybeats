/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDoctor = /* GraphQL */ `
  subscription OnCreateDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onCreateDoctor(filter: $filter) {
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
export const onUpdateDoctor = /* GraphQL */ `
  subscription OnUpdateDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onUpdateDoctor(filter: $filter) {
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
export const onDeleteDoctor = /* GraphQL */ `
  subscription OnDeleteDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onDeleteDoctor(filter: $filter) {
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
export const onCreateSpecialty = /* GraphQL */ `
  subscription OnCreateSpecialty(
    $filter: ModelSubscriptionSpecialtyFilterInput
  ) {
    onCreateSpecialty(filter: $filter) {
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
export const onUpdateSpecialty = /* GraphQL */ `
  subscription OnUpdateSpecialty(
    $filter: ModelSubscriptionSpecialtyFilterInput
  ) {
    onUpdateSpecialty(filter: $filter) {
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
export const onDeleteSpecialty = /* GraphQL */ `
  subscription OnDeleteSpecialty(
    $filter: ModelSubscriptionSpecialtyFilterInput
  ) {
    onDeleteSpecialty(filter: $filter) {
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
export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient($filter: ModelSubscriptionPatientFilterInput) {
    onCreatePatient(filter: $filter) {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient($filter: ModelSubscriptionPatientFilterInput) {
    onUpdatePatient(filter: $filter) {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient($filter: ModelSubscriptionPatientFilterInput) {
    onDeletePatient(filter: $filter) {
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
export const onCreateAvailability = /* GraphQL */ `
  subscription OnCreateAvailability(
    $filter: ModelSubscriptionAvailabilityFilterInput
  ) {
    onCreateAvailability(filter: $filter) {
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
export const onUpdateAvailability = /* GraphQL */ `
  subscription OnUpdateAvailability(
    $filter: ModelSubscriptionAvailabilityFilterInput
  ) {
    onUpdateAvailability(filter: $filter) {
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
export const onDeleteAvailability = /* GraphQL */ `
  subscription OnDeleteAvailability(
    $filter: ModelSubscriptionAvailabilityFilterInput
  ) {
    onDeleteAvailability(filter: $filter) {
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
export const onCreateAppointmentSlot = /* GraphQL */ `
  subscription OnCreateAppointmentSlot(
    $filter: ModelSubscriptionAppointmentSlotFilterInput
  ) {
    onCreateAppointmentSlot(filter: $filter) {
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
export const onUpdateAppointmentSlot = /* GraphQL */ `
  subscription OnUpdateAppointmentSlot(
    $filter: ModelSubscriptionAppointmentSlotFilterInput
  ) {
    onUpdateAppointmentSlot(filter: $filter) {
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
export const onDeleteAppointmentSlot = /* GraphQL */ `
  subscription OnDeleteAppointmentSlot(
    $filter: ModelSubscriptionAppointmentSlotFilterInput
  ) {
    onDeleteAppointmentSlot(filter: $filter) {
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
export const onCreateDoctorSpecialties = /* GraphQL */ `
  subscription OnCreateDoctorSpecialties(
    $filter: ModelSubscriptionDoctorSpecialtiesFilterInput
  ) {
    onCreateDoctorSpecialties(filter: $filter) {
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
export const onUpdateDoctorSpecialties = /* GraphQL */ `
  subscription OnUpdateDoctorSpecialties(
    $filter: ModelSubscriptionDoctorSpecialtiesFilterInput
  ) {
    onUpdateDoctorSpecialties(filter: $filter) {
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
export const onDeleteDoctorSpecialties = /* GraphQL */ `
  subscription OnDeleteDoctorSpecialties(
    $filter: ModelSubscriptionDoctorSpecialtiesFilterInput
  ) {
    onDeleteDoctorSpecialties(filter: $filter) {
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
