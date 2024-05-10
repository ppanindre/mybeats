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
      registrationNumber
      upiId
      specialties {
        items {
          id
          doctorDoctorID
          doctorzipcode
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
      registrationNumber
      upiId
      specialties {
        items {
          id
          doctorDoctorID
          doctorzipcode
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
      registrationNumber
      upiId
      specialties {
        items {
          id
          doctorDoctorID
          doctorzipcode
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
export const createSpecialty = /* GraphQL */ `
  mutation CreateSpecialty(
    $input: CreateSpecialtyInput!
    $condition: ModelSpecialtyConditionInput
  ) {
    createSpecialty(input: $input, condition: $condition) {
      id
      name
      doctors {
        items {
          id
          doctorDoctorID
          doctorzipcode
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
export const updateSpecialty = /* GraphQL */ `
  mutation UpdateSpecialty(
    $input: UpdateSpecialtyInput!
    $condition: ModelSpecialtyConditionInput
  ) {
    updateSpecialty(input: $input, condition: $condition) {
      id
      name
      doctors {
        items {
          id
          doctorDoctorID
          doctorzipcode
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
export const deleteSpecialty = /* GraphQL */ `
  mutation DeleteSpecialty(
    $input: DeleteSpecialtyInput!
    $condition: ModelSpecialtyConditionInput
  ) {
    deleteSpecialty(input: $input, condition: $condition) {
      id
      name
      doctors {
        items {
          id
          doctorDoctorID
          doctorzipcode
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
export const createAppointmentSlot = /* GraphQL */ `
  mutation CreateAppointmentSlot(
    $input: CreateAppointmentSlotInput!
    $condition: ModelAppointmentSlotConditionInput
  ) {
    createAppointmentSlot(input: $input, condition: $condition) {
      id
      doctorId
      startTime
      endTime
      isBooked
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateAppointmentSlot = /* GraphQL */ `
  mutation UpdateAppointmentSlot(
    $input: UpdateAppointmentSlotInput!
    $condition: ModelAppointmentSlotConditionInput
  ) {
    updateAppointmentSlot(input: $input, condition: $condition) {
      id
      doctorId
      startTime
      endTime
      isBooked
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteAppointmentSlot = /* GraphQL */ `
  mutation DeleteAppointmentSlot(
    $input: DeleteAppointmentSlotInput!
    $condition: ModelAppointmentSlotConditionInput
  ) {
    deleteAppointmentSlot(input: $input, condition: $condition) {
      id
      doctorId
      startTime
      endTime
      isBooked
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      doctorzipcode
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
export const updateDoctorSpecialties = /* GraphQL */ `
  mutation UpdateDoctorSpecialties(
    $input: UpdateDoctorSpecialtiesInput!
    $condition: ModelDoctorSpecialtiesConditionInput
  ) {
    updateDoctorSpecialties(input: $input, condition: $condition) {
      id
      doctorDoctorID
      doctorzipcode
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
export const deleteDoctorSpecialties = /* GraphQL */ `
  mutation DeleteDoctorSpecialties(
    $input: DeleteDoctorSpecialtiesInput!
    $condition: ModelDoctorSpecialtiesConditionInput
  ) {
    deleteDoctorSpecialties(input: $input, condition: $condition) {
      id
      doctorDoctorID
      doctorzipcode
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
