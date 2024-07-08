/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDoctor = /* GraphQL */ `
  mutation CreateDoctor(
    $input: CreateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    createDoctor(input: $input, condition: $condition) {
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
      appointments {
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
export const updateDoctor = /* GraphQL */ `
  mutation UpdateDoctor(
    $input: UpdateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    updateDoctor(input: $input, condition: $condition) {
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
      appointments {
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
export const deleteDoctor = /* GraphQL */ `
  mutation DeleteDoctor(
    $input: DeleteDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    deleteDoctor(input: $input, condition: $condition) {
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
      appointments {
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
export const createSpecialty = /* GraphQL */ `
  mutation CreateSpecialty(
    $input: CreateSpecialtyInput!
    $condition: ModelSpecialtyConditionInput
  ) {
    createSpecialty(input: $input, condition: $condition) {
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
export const updateSpecialty = /* GraphQL */ `
  mutation UpdateSpecialty(
    $input: UpdateSpecialtyInput!
    $condition: ModelSpecialtyConditionInput
  ) {
    updateSpecialty(input: $input, condition: $condition) {
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
export const deleteSpecialty = /* GraphQL */ `
  mutation DeleteSpecialty(
    $input: DeleteSpecialtyInput!
    $condition: ModelSpecialtyConditionInput
  ) {
    deleteSpecialty(input: $input, condition: $condition) {
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
      address
      zipcode
      appointments {
        nextToken
        startedAt
        __typename
      }
      age
      weight
      height
      profession
      underlyingCondition
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      address
      zipcode
      appointments {
        nextToken
        startedAt
        __typename
      }
      age
      weight
      height
      profession
      underlyingCondition
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      address
      zipcode
      appointments {
        nextToken
        startedAt
        __typename
      }
      age
      weight
      height
      profession
      underlyingCondition
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createAvailability = /* GraphQL */ `
  mutation CreateAvailability(
    $input: CreateAvailabilityInput!
    $condition: ModelAvailabilityConditionInput
  ) {
    createAvailability(input: $input, condition: $condition) {
      id
      doctorID
      startTime
      endTime
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
export const updateAvailability = /* GraphQL */ `
  mutation UpdateAvailability(
    $input: UpdateAvailabilityInput!
    $condition: ModelAvailabilityConditionInput
  ) {
    updateAvailability(input: $input, condition: $condition) {
      id
      doctorID
      startTime
      endTime
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
export const deleteAvailability = /* GraphQL */ `
  mutation DeleteAvailability(
    $input: DeleteAvailabilityInput!
    $condition: ModelAvailabilityConditionInput
  ) {
    deleteAvailability(input: $input, condition: $condition) {
      id
      doctorID
      startTime
      endTime
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
export const createAppointment = /* GraphQL */ `
  mutation CreateAppointment(
    $input: CreateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    createAppointment(input: $input, condition: $condition) {
      id
      doctorID
      patientId
      startTime
      endTime
      type
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
        age
        weight
        height
        profession
        underlyingCondition
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
export const updateAppointment = /* GraphQL */ `
  mutation UpdateAppointment(
    $input: UpdateAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    updateAppointment(input: $input, condition: $condition) {
      id
      doctorID
      patientId
      startTime
      endTime
      type
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
        age
        weight
        height
        profession
        underlyingCondition
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
export const deleteAppointment = /* GraphQL */ `
  mutation DeleteAppointment(
    $input: DeleteAppointmentInput!
    $condition: ModelAppointmentConditionInput
  ) {
    deleteAppointment(input: $input, condition: $condition) {
      id
      doctorID
      patientId
      startTime
      endTime
      type
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
        age
        weight
        height
        profession
        underlyingCondition
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
export const createDoctorSpecialties = /* GraphQL */ `
  mutation CreateDoctorSpecialties(
    $input: CreateDoctorSpecialtiesInput!
    $condition: ModelDoctorSpecialtiesConditionInput
  ) {
    createDoctorSpecialties(input: $input, condition: $condition) {
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
export const updateDoctorSpecialties = /* GraphQL */ `
  mutation UpdateDoctorSpecialties(
    $input: UpdateDoctorSpecialtiesInput!
    $condition: ModelDoctorSpecialtiesConditionInput
  ) {
    updateDoctorSpecialties(input: $input, condition: $condition) {
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
export const deleteDoctorSpecialties = /* GraphQL */ `
  mutation DeleteDoctorSpecialties(
    $input: DeleteDoctorSpecialtiesInput!
    $condition: ModelDoctorSpecialtiesConditionInput
  ) {
    deleteDoctorSpecialties(input: $input, condition: $condition) {
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
