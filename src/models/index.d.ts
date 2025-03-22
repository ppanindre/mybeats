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
  readonly secondarySpecializationIds?: (string | null)[] | null;
  readonly secondarySpecializations?: (DoctorSecondarySpecialties | null)[] | null;
  readonly availableForVideoConsultation: boolean;
  readonly feeForVideoConsultation: string;
  readonly educationExperience?: string | null;
  readonly awardsRecognition?: string | null;
  readonly website?: string | null;
  readonly zipcode: string;
  readonly appointments?: (Appointment | null)[] | null;
  readonly availability?: (Availability | null)[] | null;
  readonly prescriptions?: (Prescription | null)[] | null;
  readonly patientStories?: (PatientStory | null)[] | null;
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
  readonly secondarySpecializationIds?: (string | null)[] | null;
  readonly secondarySpecializations: AsyncCollection<DoctorSecondarySpecialties>;
  readonly availableForVideoConsultation: boolean;
  readonly feeForVideoConsultation: string;
  readonly educationExperience?: string | null;
  readonly awardsRecognition?: string | null;
  readonly website?: string | null;
  readonly zipcode: string;
  readonly appointments: AsyncCollection<Appointment>;
  readonly availability: AsyncCollection<Availability>;
  readonly prescriptions: AsyncCollection<Prescription>;
  readonly patientStories: AsyncCollection<PatientStory>;
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
  readonly secondaryDoctors?: (DoctorSecondarySpecialties | null)[] | null;
  readonly primaryToSecondaryLinks?: (PrimaryToSecondary | null)[] | null;
  readonly secondaryToPrimaryLinks?: (PrimaryToSecondary | null)[] | null;
  readonly healthConditions?: (SpecialtyHealthConditions | null)[] | null;
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
  readonly secondaryDoctors: AsyncCollection<DoctorSecondarySpecialties>;
  readonly primaryToSecondaryLinks: AsyncCollection<PrimaryToSecondary>;
  readonly secondaryToPrimaryLinks: AsyncCollection<PrimaryToSecondary>;
  readonly healthConditions: AsyncCollection<SpecialtyHealthConditions>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Specialty = LazyLoading extends LazyLoadingDisabled ? EagerSpecialty : LazySpecialty

export declare const Specialty: (new (init: ModelInit<Specialty>) => Specialty) & {
  copyOf(source: Specialty, mutator: (draft: MutableModel<Specialty>) => MutableModel<Specialty> | void): Specialty;
}

type EagerHealthCondition = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<HealthCondition, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly specialties?: (SpecialtyHealthConditions | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyHealthCondition = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<HealthCondition, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly specialties: AsyncCollection<SpecialtyHealthConditions>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type HealthCondition = LazyLoading extends LazyLoadingDisabled ? EagerHealthCondition : LazyHealthCondition

export declare const HealthCondition: (new (init: ModelInit<HealthCondition>) => HealthCondition) & {
  copyOf(source: HealthCondition, mutator: (draft: MutableModel<HealthCondition>) => MutableModel<HealthCondition> | void): HealthCondition;
}

type EagerPrimaryToSecondary = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<PrimaryToSecondary, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly primarySpecialtyID: string;
  readonly secondarySpecialtyID: string;
  readonly primarySpecialty?: Specialty | null;
  readonly secondarySpecialty?: Specialty | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPrimaryToSecondary = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<PrimaryToSecondary, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly primarySpecialtyID: string;
  readonly secondarySpecialtyID: string;
  readonly primarySpecialty: AsyncItem<Specialty | undefined>;
  readonly secondarySpecialty: AsyncItem<Specialty | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PrimaryToSecondary = LazyLoading extends LazyLoadingDisabled ? EagerPrimaryToSecondary : LazyPrimaryToSecondary

export declare const PrimaryToSecondary: (new (init: ModelInit<PrimaryToSecondary>) => PrimaryToSecondary) & {
  copyOf(source: PrimaryToSecondary, mutator: (draft: MutableModel<PrimaryToSecondary>) => MutableModel<PrimaryToSecondary> | void): PrimaryToSecondary;
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
  readonly age?: string | null;
  readonly weight?: string | null;
  readonly height?: string | null;
  readonly profession?: string | null;
  readonly underlyingCondition?: string | null;
  readonly prescriptions?: (Prescription | null)[] | null;
  readonly labTestResults?: (LabTestResult | null)[] | null;
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
  readonly age?: string | null;
  readonly weight?: string | null;
  readonly height?: string | null;
  readonly profession?: string | null;
  readonly underlyingCondition?: string | null;
  readonly prescriptions: AsyncCollection<Prescription>;
  readonly labTestResults: AsyncCollection<LabTestResult>;
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
  readonly patientStory?: PatientStory | null;
  readonly doctorNotes?: string | null;
  readonly imagePaths?: (string | null)[] | null;
  readonly prescriptions?: (Prescription | null)[] | null;
  readonly prescriptionImagePaths?: (string | null)[] | null;
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
  readonly patientStory: AsyncItem<PatientStory | undefined>;
  readonly doctorNotes?: string | null;
  readonly imagePaths?: (string | null)[] | null;
  readonly prescriptions: AsyncCollection<Prescription>;
  readonly prescriptionImagePaths?: (string | null)[] | null;
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
  readonly appointmentID: string;
  readonly appointment?: Appointment | null;
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
  readonly appointmentID: string;
  readonly appointment: AsyncItem<Appointment | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Prescription = LazyLoading extends LazyLoadingDisabled ? EagerPrescription : LazyPrescription

export declare const Prescription: (new (init: ModelInit<Prescription>) => Prescription) & {
  copyOf(source: Prescription, mutator: (draft: MutableModel<Prescription>) => MutableModel<Prescription> | void): Prescription;
}

type EagerPatientStory = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<PatientStory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorID: string;
  readonly doctor?: Doctor | null;
  readonly patientID: string;
  readonly patientName: string;
  readonly rating: string;
  readonly date: string;
  readonly story?: string | null;
  readonly appointmentID: string;
  readonly appointment?: Appointment | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPatientStory = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<PatientStory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly doctorID: string;
  readonly doctor: AsyncItem<Doctor | undefined>;
  readonly patientID: string;
  readonly patientName: string;
  readonly rating: string;
  readonly date: string;
  readonly story?: string | null;
  readonly appointmentID: string;
  readonly appointment: AsyncItem<Appointment | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PatientStory = LazyLoading extends LazyLoadingDisabled ? EagerPatientStory : LazyPatientStory

export declare const PatientStory: (new (init: ModelInit<PatientStory>) => PatientStory) & {
  copyOf(source: PatientStory, mutator: (draft: MutableModel<PatientStory>) => MutableModel<PatientStory> | void): PatientStory;
}

type EagerLabTestResult = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<LabTestResult, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly testDate?: string | null;
  readonly labResultImages?: (string | null)[] | null;
  readonly patientID: string;
  readonly patient?: Patient | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLabTestResult = {
  readonly [__modelMeta__]: {
    identifier: OptionallyManagedIdentifier<LabTestResult, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly testDate?: string | null;
  readonly labResultImages?: (string | null)[] | null;
  readonly patientID: string;
  readonly patient: AsyncItem<Patient | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LabTestResult = LazyLoading extends LazyLoadingDisabled ? EagerLabTestResult : LazyLabTestResult

export declare const LabTestResult: (new (init: ModelInit<LabTestResult>) => LabTestResult) & {
  copyOf(source: LabTestResult, mutator: (draft: MutableModel<LabTestResult>) => MutableModel<LabTestResult> | void): LabTestResult;
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

type EagerDoctorSecondarySpecialties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DoctorSecondarySpecialties, 'id'>;
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

type LazyDoctorSecondarySpecialties = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DoctorSecondarySpecialties, 'id'>;
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

export declare type DoctorSecondarySpecialties = LazyLoading extends LazyLoadingDisabled ? EagerDoctorSecondarySpecialties : LazyDoctorSecondarySpecialties

export declare const DoctorSecondarySpecialties: (new (init: ModelInit<DoctorSecondarySpecialties>) => DoctorSecondarySpecialties) & {
  copyOf(source: DoctorSecondarySpecialties, mutator: (draft: MutableModel<DoctorSecondarySpecialties>) => MutableModel<DoctorSecondarySpecialties> | void): DoctorSecondarySpecialties;
}

type EagerSpecialtyHealthConditions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SpecialtyHealthConditions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly specialtyId?: string | null;
  readonly healthConditionId?: string | null;
  readonly specialty: Specialty;
  readonly healthCondition: HealthCondition;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySpecialtyHealthConditions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SpecialtyHealthConditions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly specialtyId?: string | null;
  readonly healthConditionId?: string | null;
  readonly specialty: AsyncItem<Specialty>;
  readonly healthCondition: AsyncItem<HealthCondition>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SpecialtyHealthConditions = LazyLoading extends LazyLoadingDisabled ? EagerSpecialtyHealthConditions : LazySpecialtyHealthConditions

export declare const SpecialtyHealthConditions: (new (init: ModelInit<SpecialtyHealthConditions>) => SpecialtyHealthConditions) & {
  copyOf(source: SpecialtyHealthConditions, mutator: (draft: MutableModel<SpecialtyHealthConditions>) => MutableModel<SpecialtyHealthConditions> | void): SpecialtyHealthConditions;
}