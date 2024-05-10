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
export const onUpdateDoctor = /* GraphQL */ `
  subscription OnUpdateDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onUpdateDoctor(filter: $filter) {
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
export const onDeleteDoctor = /* GraphQL */ `
  subscription OnDeleteDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onDeleteDoctor(filter: $filter) {
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
export const onCreateSpecialty = /* GraphQL */ `
  subscription OnCreateSpecialty(
    $filter: ModelSubscriptionSpecialtyFilterInput
  ) {
    onCreateSpecialty(filter: $filter) {
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
export const onUpdateSpecialty = /* GraphQL */ `
  subscription OnUpdateSpecialty(
    $filter: ModelSubscriptionSpecialtyFilterInput
  ) {
    onUpdateSpecialty(filter: $filter) {
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
export const onDeleteSpecialty = /* GraphQL */ `
  subscription OnDeleteSpecialty(
    $filter: ModelSubscriptionSpecialtyFilterInput
  ) {
    onDeleteSpecialty(filter: $filter) {
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
export const onCreateAppointmentSlot = /* GraphQL */ `
  subscription OnCreateAppointmentSlot(
    $filter: ModelSubscriptionAppointmentSlotFilterInput
  ) {
    onCreateAppointmentSlot(filter: $filter) {
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
export const onUpdateAppointmentSlot = /* GraphQL */ `
  subscription OnUpdateAppointmentSlot(
    $filter: ModelSubscriptionAppointmentSlotFilterInput
  ) {
    onUpdateAppointmentSlot(filter: $filter) {
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
export const onDeleteAppointmentSlot = /* GraphQL */ `
  subscription OnDeleteAppointmentSlot(
    $filter: ModelSubscriptionAppointmentSlotFilterInput
  ) {
    onDeleteAppointmentSlot(filter: $filter) {
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
