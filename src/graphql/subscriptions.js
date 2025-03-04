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
      state
      experience
      secondarySpecializationIds
      secondarySpecializations {
        nextToken
        startedAt
        __typename
      }
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
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      patientStories {
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
      state
      experience
      secondarySpecializationIds
      secondarySpecializations {
        nextToken
        startedAt
        __typename
      }
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
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      patientStories {
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
      state
      experience
      secondarySpecializationIds
      secondarySpecializations {
        nextToken
        startedAt
        __typename
      }
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
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      patientStories {
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
      secondaryDoctors {
        nextToken
        startedAt
        __typename
      }
      primaryToSecondaryLinks {
        nextToken
        startedAt
        __typename
      }
      secondaryToPrimaryLinks {
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
      secondaryDoctors {
        nextToken
        startedAt
        __typename
      }
      primaryToSecondaryLinks {
        nextToken
        startedAt
        __typename
      }
      secondaryToPrimaryLinks {
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
      secondaryDoctors {
        nextToken
        startedAt
        __typename
      }
      primaryToSecondaryLinks {
        nextToken
        startedAt
        __typename
      }
      secondaryToPrimaryLinks {
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
export const onCreatePrimaryToSecondary = /* GraphQL */ `
  subscription OnCreatePrimaryToSecondary(
    $filter: ModelSubscriptionPrimaryToSecondaryFilterInput
  ) {
    onCreatePrimaryToSecondary(filter: $filter) {
      id
      primarySpecialtyID
      secondarySpecialtyID
      primarySpecialty {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      secondarySpecialty {
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
export const onUpdatePrimaryToSecondary = /* GraphQL */ `
  subscription OnUpdatePrimaryToSecondary(
    $filter: ModelSubscriptionPrimaryToSecondaryFilterInput
  ) {
    onUpdatePrimaryToSecondary(filter: $filter) {
      id
      primarySpecialtyID
      secondarySpecialtyID
      primarySpecialty {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      secondarySpecialty {
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
export const onDeletePrimaryToSecondary = /* GraphQL */ `
  subscription OnDeletePrimaryToSecondary(
    $filter: ModelSubscriptionPrimaryToSecondaryFilterInput
  ) {
    onDeletePrimaryToSecondary(filter: $filter) {
      id
      primarySpecialtyID
      secondarySpecialtyID
      primarySpecialty {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      secondarySpecialty {
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
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      labTestResults {
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
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      labTestResults {
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
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      labTestResults {
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
        secondarySpecializationIds
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
        secondarySpecializationIds
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
        secondarySpecializationIds
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
export const onCreateAppointment = /* GraphQL */ `
  subscription OnCreateAppointment(
    $filter: ModelSubscriptionAppointmentFilterInput
  ) {
    onCreateAppointment(filter: $filter) {
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
        secondarySpecializationIds
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
      patientStory {
        id
        doctorID
        patientID
        patientName
        rating
        date
        story
        appointmentID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      doctorNotes
      imagePaths
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      prescriptionImagePaths
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        secondarySpecializationIds
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
      patientStory {
        id
        doctorID
        patientID
        patientName
        rating
        date
        story
        appointmentID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      doctorNotes
      imagePaths
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      prescriptionImagePaths
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        secondarySpecializationIds
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
      patientStory {
        id
        doctorID
        patientID
        patientName
        rating
        date
        story
        appointmentID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      doctorNotes
      imagePaths
      prescriptions {
        nextToken
        startedAt
        __typename
      }
      prescriptionImagePaths
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreatePrescription = /* GraphQL */ `
  subscription OnCreatePrescription(
    $filter: ModelSubscriptionPrescriptionFilterInput
  ) {
    onCreatePrescription(filter: $filter) {
      id
      medicineName
      type
      dosage
      days
      dosageQuantity
      startDate
      endDate
      doctorID
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
        secondarySpecializationIds
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
      patientID
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
      appointmentID
      appointment {
        id
        doctorID
        patientId
        startTime
        endTime
        type
        isBooked
        doctorNotes
        imagePaths
        prescriptionImagePaths
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
export const onUpdatePrescription = /* GraphQL */ `
  subscription OnUpdatePrescription(
    $filter: ModelSubscriptionPrescriptionFilterInput
  ) {
    onUpdatePrescription(filter: $filter) {
      id
      medicineName
      type
      dosage
      days
      dosageQuantity
      startDate
      endDate
      doctorID
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
        secondarySpecializationIds
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
      patientID
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
      appointmentID
      appointment {
        id
        doctorID
        patientId
        startTime
        endTime
        type
        isBooked
        doctorNotes
        imagePaths
        prescriptionImagePaths
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
export const onDeletePrescription = /* GraphQL */ `
  subscription OnDeletePrescription(
    $filter: ModelSubscriptionPrescriptionFilterInput
  ) {
    onDeletePrescription(filter: $filter) {
      id
      medicineName
      type
      dosage
      days
      dosageQuantity
      startDate
      endDate
      doctorID
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
        secondarySpecializationIds
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
      patientID
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
      appointmentID
      appointment {
        id
        doctorID
        patientId
        startTime
        endTime
        type
        isBooked
        doctorNotes
        imagePaths
        prescriptionImagePaths
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
export const onCreatePatientStory = /* GraphQL */ `
  subscription OnCreatePatientStory(
    $filter: ModelSubscriptionPatientStoryFilterInput
  ) {
    onCreatePatientStory(filter: $filter) {
      id
      doctorID
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
        secondarySpecializationIds
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
      patientID
      patientName
      rating
      date
      story
      appointmentID
      appointment {
        id
        doctorID
        patientId
        startTime
        endTime
        type
        isBooked
        doctorNotes
        imagePaths
        prescriptionImagePaths
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
export const onUpdatePatientStory = /* GraphQL */ `
  subscription OnUpdatePatientStory(
    $filter: ModelSubscriptionPatientStoryFilterInput
  ) {
    onUpdatePatientStory(filter: $filter) {
      id
      doctorID
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
        secondarySpecializationIds
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
      patientID
      patientName
      rating
      date
      story
      appointmentID
      appointment {
        id
        doctorID
        patientId
        startTime
        endTime
        type
        isBooked
        doctorNotes
        imagePaths
        prescriptionImagePaths
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
export const onDeletePatientStory = /* GraphQL */ `
  subscription OnDeletePatientStory(
    $filter: ModelSubscriptionPatientStoryFilterInput
  ) {
    onDeletePatientStory(filter: $filter) {
      id
      doctorID
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
        secondarySpecializationIds
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
      patientID
      patientName
      rating
      date
      story
      appointmentID
      appointment {
        id
        doctorID
        patientId
        startTime
        endTime
        type
        isBooked
        doctorNotes
        imagePaths
        prescriptionImagePaths
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
export const onCreateLabTestResult = /* GraphQL */ `
  subscription OnCreateLabTestResult(
    $filter: ModelSubscriptionLabTestResultFilterInput
  ) {
    onCreateLabTestResult(filter: $filter) {
      id
      title
      description
      testDate
      labResultImages
      patientID
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
export const onUpdateLabTestResult = /* GraphQL */ `
  subscription OnUpdateLabTestResult(
    $filter: ModelSubscriptionLabTestResultFilterInput
  ) {
    onUpdateLabTestResult(filter: $filter) {
      id
      title
      description
      testDate
      labResultImages
      patientID
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
export const onDeleteLabTestResult = /* GraphQL */ `
  subscription OnDeleteLabTestResult(
    $filter: ModelSubscriptionLabTestResultFilterInput
  ) {
    onDeleteLabTestResult(filter: $filter) {
      id
      title
      description
      testDate
      labResultImages
      patientID
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
        state
        experience
        secondarySpecializationIds
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
        state
        experience
        secondarySpecializationIds
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
        state
        experience
        secondarySpecializationIds
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
export const onCreateDoctorSecondarySpecialties = /* GraphQL */ `
  subscription OnCreateDoctorSecondarySpecialties(
    $filter: ModelSubscriptionDoctorSecondarySpecialtiesFilterInput
  ) {
    onCreateDoctorSecondarySpecialties(filter: $filter) {
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
        secondarySpecializationIds
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
export const onUpdateDoctorSecondarySpecialties = /* GraphQL */ `
  subscription OnUpdateDoctorSecondarySpecialties(
    $filter: ModelSubscriptionDoctorSecondarySpecialtiesFilterInput
  ) {
    onUpdateDoctorSecondarySpecialties(filter: $filter) {
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
        secondarySpecializationIds
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
export const onDeleteDoctorSecondarySpecialties = /* GraphQL */ `
  subscription OnDeleteDoctorSecondarySpecialties(
    $filter: ModelSubscriptionDoctorSecondarySpecialtiesFilterInput
  ) {
    onDeleteDoctorSecondarySpecialties(filter: $filter) {
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
        secondarySpecializationIds
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
