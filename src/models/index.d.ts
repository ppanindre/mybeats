import { ModelInit, MutableModel, __modelMeta__, CustomIdentifier, OptionallyManagedIdentifier, ManagedIdentifier } from "@aws-amplify/datastore";
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
  readonly licenseNumber?: string | null;
  readonly upiId?: string | null;
  readonly specialties?: (DoctorSpecialties | null)[] | null;
  readonly primarySpecializationId?: string | null;
  readonly primarySpecialization?: Specialty | null;
  readonly address?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly experience?: string | null;
  readonly secondarySpecialization?: string | null;
  readonly availableForVideoConsultation?: boolean | null;
  readonly feeForVideoConsultation?: string | null;
  readonly educationExperience?: string | null;
  readonly awardsRecognition?: string | null;
  readonly website?: string | null;
  readonly zipcode: string;
  readonly appointmentSlots?: (AppointmentSlot | null)[] | null;
  readonly availability?: (Availability | null)[] | null;
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
  readonly licenseNumber?: string | null;
  readonly upiId?: string | null;
  readonly specialties: AsyncCollection<DoctorSpecialties>;
  readonly primarySpecializationId?: string | null;
  readonly primarySpecialization: AsyncItem<Specialty | undefined>;
  readonly address?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly experience?: string | null;
  readonly secondarySpecialization?: string | null;
  readonly availableForVideoConsultation?: boolean | null;
  readonly feeForVideoConsultation?: string | null;
  readonly educationExperience?: string | null;
  readonly awardsRecognition?: string | null;
  readonly website?: string | null;
  readonly zipcode: string;
  readonly appointmentSlots: AsyncCollection<AppointmentSlot>;
  readonly availability: AsyncCollection<Availability>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Doctor = LazyLoading extends LazyLoadingDisabled ? EagerDoctor : LazyDoctor

export declare const Doctor: (new (init: ModelInit<Doctor>) => Doctor) & {
  copyOf(source: Doctor, mutator: (draft: MutableModel<Doctor>) => MutableModel<Doctor> | void): Doctor;
}

type EagerSpecialty = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Specialty, 'id'>;
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
    identifier: OptionallyManagedIdentifier<Specialty, 'id'>;
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
    identifier: OptionallyManagedIdentifier<Patient, 'id'>;
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
    identifier: OptionallyManagedIdentifier<Patient, 'id'>;
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

type EagerAvailability = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Availability, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorID: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly isAvailable: boolean;
  readonly doctor?: Doctor | null;
  readonly appointmentSlots?: (AppointmentSlot | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAvailability = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Availability, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorID: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly isAvailable: boolean;
  readonly doctor: AsyncItem<Doctor | undefined>;
  readonly appointmentSlots: AsyncCollection<AppointmentSlot>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Availability = LazyLoading extends LazyLoadingDisabled ? EagerAvailability : LazyAvailability

export declare const Availability: (new (init: ModelInit<Availability>) => Availability) & {
  copyOf(source: Availability, mutator: (draft: MutableModel<Availability>) => MutableModel<Availability> | void): Availability;
}

type EagerAppointmentSlot = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<AppointmentSlot, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorID: string;
  readonly patientId: string;
  readonly availabilityId: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly isBooked: boolean;
  readonly doctor?: Doctor | null;
  readonly patient?: Patient | null;
  readonly availability?: Availability | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAppointmentSlot = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<AppointmentSlot, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorID: string;
  readonly patientId: string;
  readonly availabilityId: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly isBooked: boolean;
  readonly doctor: AsyncItem<Doctor | undefined>;
  readonly patient: AsyncItem<Patient | undefined>;
  readonly availability: AsyncItem<Availability | undefined>;
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