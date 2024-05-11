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
      registrationNumber
      upiId
      specialties {
        items {
          id
          doctorDoctorID
          specialtyId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      address
      zipcode
      appointmentSlots {
        items {
          id
          doctorId
          patientId
          startTime
          endTime
          isBooked
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        registrationNumber
        upiId
        specialties {
          nextToken
          startedAt
        }
        address
        zipcode
        appointmentSlots {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        registrationNumber
        upiId
        specialties {
          nextToken
          startedAt
        }
        address
        zipcode
        appointmentSlots {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        registrationNumber
        upiId
        specialties {
          nextToken
          startedAt
        }
        address
        zipcode
        appointmentSlots {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSpecialty = /* GraphQL */ `
  query GetSpecialty($id: ID!) {
    getSpecialty(id: $id) {
      id
      name
      doctors {
        items {
          id
          doctorDoctorID
          specialtyId
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        doctors {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        doctors {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        doctors {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        items {
          id
          doctorId
          patientId
          startTime
          endTime
          isBooked
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        appointmentSlots {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        appointmentSlots {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAppointmentSlot = /* GraphQL */ `
  query GetAppointmentSlot($id: ID!) {
    getAppointmentSlot(id: $id) {
      id
      doctorId
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
        registrationNumber
        upiId
        specialties {
          nextToken
          startedAt
        }
        address
        zipcode
        appointmentSlots {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      patient {
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        doctorId
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
          registrationNumber
          upiId
          address
          zipcode
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        doctorId
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
          registrationNumber
          upiId
          address
          zipcode
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const slotsByDoctor = /* GraphQL */ `
  query SlotsByDoctor(
    $doctorId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAppointmentSlotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    slotsByDoctor(
      doctorId: $doctorId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorId
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
          registrationNumber
          upiId
          address
          zipcode
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const slotsByPatient = /* GraphQL */ `
  query SlotsByPatient(
    $patientId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelAppointmentSlotFilterInput
    $limit: Int
    $nextToken: String
  ) {
    slotsByPatient(
      patientId: $patientId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        doctorId
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
          registrationNumber
          upiId
          address
          zipcode
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
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
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        registrationNumber
        upiId
        specialties {
          nextToken
          startedAt
        }
        address
        zipcode
        appointmentSlots {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      specialty {
        id
        name
        doctors {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        doctor {
          doctorID
          firstname
          lastname
          email
          phoneNumber
          registrationNumber
          upiId
          address
          zipcode
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        specialty {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        doctor {
          doctorID
          firstname
          lastname
          email
          phoneNumber
          registrationNumber
          upiId
          address
          zipcode
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        specialty {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        doctor {
          doctorID
          firstname
          lastname
          email
          phoneNumber
          registrationNumber
          upiId
          address
          zipcode
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        specialty {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
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
        doctor {
          doctorID
          firstname
          lastname
          email
          phoneNumber
          registrationNumber
          upiId
          address
          zipcode
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        specialty {
          id
          name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
