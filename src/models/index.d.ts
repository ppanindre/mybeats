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
  readonly availableForVideoConsultation: boolean;
  readonly feeForVideoConsultation: string;
  readonly educationExperience?: string | null;
  readonly awardsRecognition?: string | null;
  readonly website?: string | null;
  readonly zipcode: string;
  readonly appointments?: (Appointment | null)[] | null;
  readonly availability?: (Availability | null)[] | null;
  readonly prescriptions?: (Prescription | null)[] | null;
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
  readonly availableForVideoConsultation: boolean;
  readonly feeForVideoConsultation: string;
  readonly educationExperience?: string | null;
  readonly awardsRecognition?: string | null;
  readonly website?: string | null;
  readonly zipcode: string;
  readonly appointments: AsyncCollection<Appointment>;
  readonly availability: AsyncCollection<Availability>;
  readonly prescriptions: AsyncCollection<Prescription>;
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
  readonly appointments?: (Appointment | null)[] | null;
  readonly prescriptions?: (Prescription | null)[] | null;
  readonly age?: string | null;
  readonly weight?: string | null;
  readonly height?: string | null;
  readonly profession?: string | null;
  readonly underlyingCondition?: string | null;
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
  readonly appointments: AsyncCollection<Appointment>;
  readonly prescriptions: AsyncCollection<Prescription>;
  readonly age?: string | null;
  readonly weight?: string | null;
  readonly height?: string | null;
  readonly profession?: string | null;
  readonly underlyingCondition?: string | null;
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
  readonly doctor?: Doctor | null;
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
  readonly doctor: AsyncItem<Doctor | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Availability = LazyLoading extends LazyLoadingDisabled ? EagerAvailability : LazyAvailability

export declare const Availability: (new (init: ModelInit<Availability>) => Availability) & {
  copyOf(source: Availability, mutator: (draft: MutableModel<Availability>) => MutableModel<Availability> | void): Availability;
}

type EagerAppointment = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Appointment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorID: string;
  readonly patientId: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly type?: string | null;
  readonly isBooked: boolean;
  readonly doctor?: Doctor | null;
  readonly patient?: Patient | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAppointment = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Appointment, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorID: string;
  readonly patientId: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly type?: string | null;
  readonly isBooked: boolean;
  readonly doctor: AsyncItem<Doctor | undefined>;
  readonly patient: AsyncItem<Patient | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Appointment = LazyLoading extends LazyLoadingDisabled ? EagerAppointment : LazyAppointment

export declare const Appointment: (new (init: ModelInit<Appointment>) => Appointment) & {
  copyOf(source: Appointment, mutator: (draft: MutableModel<Appointment>) => MutableModel<Appointment> | void): Appointment;
}

type EagerPrescription = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Prescription, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly medicineName: string;
  readonly type: string;
  readonly dosage: string;
  readonly days: string;
  readonly dosageQuantity: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly doctorID: string;
  readonly doctor?: Doctor | null;
  readonly patientID: string;
  readonly patient?: Patient | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPrescription = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<Prescription, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly medicineName: string;
  readonly type: string;
  readonly dosage: string;
  readonly days: string;
  readonly dosageQuantity: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly doctorID: string;
  readonly doctor: AsyncItem<Doctor | undefined>;
  readonly patientID: string;
  readonly patient: AsyncItem<Patient | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Prescription = LazyLoading extends LazyLoadingDisabled ? EagerPrescription : LazyPrescription

export declare const Prescription: (new (init: ModelInit<Prescription>) => Prescription) & {
  copyOf(source: Prescription, mutator: (draft: MutableModel<Prescription>) => MutableModel<Prescription> | void): Prescription;
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