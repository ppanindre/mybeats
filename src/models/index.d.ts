import { ModelInit, MutableModel, __modelMeta__, CustomIdentifier, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerDoctor = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<Doctor, 'doctorID'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly doctorID: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email?: string | null;
  readonly phoneNumber?: string | null;
  readonly registrationNumber?: string | null;
  readonly upiId?: string | null;
  readonly specialties?: (DoctorSpecialties | null)[] | null;
  readonly address?: string | null;
  readonly zipcode: string;
  readonly appointmentSlots?: (AppointmentSlot | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDoctor = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<Doctor, 'doctorID'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly doctorID: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email?: string | null;
  readonly phoneNumber?: string | null;
  readonly registrationNumber?: string | null;
  readonly upiId?: string | null;
  readonly specialties: AsyncCollection<DoctorSpecialties>;
  readonly address?: string | null;
  readonly zipcode: string;
  readonly appointmentSlots: AsyncCollection<AppointmentSlot>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Doctor = LazyLoading extends LazyLoadingDisabled ? EagerDoctor : LazyDoctor

export declare const Doctor: (new (init: ModelInit<Doctor>) => Doctor) & {
  copyOf(source: Doctor, mutator: (draft: MutableModel<Doctor>) => MutableModel<Doctor> | void): Doctor;
}

type EagerSpecialty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Specialty, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly doctors?: (DoctorSpecialties | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySpecialty = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Specialty, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly doctors: AsyncCollection<DoctorSpecialties>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Specialty = LazyLoading extends LazyLoadingDisabled ? EagerSpecialty : LazySpecialty

export declare const Specialty: (new (init: ModelInit<Specialty>) => Specialty) & {
  copyOf(source: Specialty, mutator: (draft: MutableModel<Specialty>) => MutableModel<Specialty> | void): Specialty;
}

type EagerPatient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Patient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email?: string | null;
  readonly phoneNumber?: string | null;
  readonly address?: string | null;
  readonly zipcode?: string | null;
  readonly appointmentSlots?: (AppointmentSlot | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPatient = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Patient, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly email?: string | null;
  readonly phoneNumber?: string | null;
  readonly address?: string | null;
  readonly zipcode?: string | null;
  readonly appointmentSlots: AsyncCollection<AppointmentSlot>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Patient = LazyLoading extends LazyLoadingDisabled ? EagerPatient : LazyPatient

export declare const Patient: (new (init: ModelInit<Patient>) => Patient) & {
  copyOf(source: Patient, mutator: (draft: MutableModel<Patient>) => MutableModel<Patient> | void): Patient;
}

type EagerAppointmentSlot = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AppointmentSlot, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorId: string;
  readonly patientId: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly isBooked: boolean;
  readonly doctor?: Doctor | null;
  readonly patient?: Patient | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAppointmentSlot = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AppointmentSlot, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorId: string;
  readonly patientId: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly isBooked: boolean;
  readonly doctor: AsyncItem<Doctor | undefined>;
  readonly patient: AsyncItem<Patient | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AppointmentSlot = LazyLoading extends LazyLoadingDisabled ? EagerAppointmentSlot : LazyAppointmentSlot

export declare const AppointmentSlot: (new (init: ModelInit<AppointmentSlot>) => AppointmentSlot) & {
  copyOf(source: AppointmentSlot, mutator: (draft: MutableModel<AppointmentSlot>) => MutableModel<AppointmentSlot> | void): AppointmentSlot;
}

type EagerDoctorSpecialties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DoctorSpecialties, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorDoctorID?: string | null;
  readonly specialtyId?: string | null;
  readonly doctor: Doctor;
  readonly specialty: Specialty;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDoctorSpecialties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DoctorSpecialties, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorDoctorID?: string | null;
  readonly specialtyId?: string | null;
  readonly doctor: AsyncItem<Doctor>;
  readonly specialty: AsyncItem<Specialty>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DoctorSpecialties = LazyLoading extends LazyLoadingDisabled ? EagerDoctorSpecialties : LazyDoctorSpecialties

export declare const DoctorSpecialties: (new (init: ModelInit<DoctorSpecialties>) => DoctorSpecialties) & {
  copyOf(source: DoctorSpecialties, mutator: (draft: MutableModel<DoctorSpecialties>) => MutableModel<DoctorSpecialties> | void): DoctorSpecialties;
}