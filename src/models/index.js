// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Doctor, Specialty, HealthCondition, PrimaryToSecondary, Patient, Availability, Appointment, Prescription, PatientStory, LabTestResult, ChatMessage, DoctorSpecialties, DoctorSecondarySpecialties, SpecialtyHealthConditions } = initSchema(schema);

export {
  Doctor,
  Specialty,
  HealthCondition,
  PrimaryToSecondary,
  Patient,
  Availability,
  Appointment,
  Prescription,
  PatientStory,
  LabTestResult,
  ChatMessage,
  DoctorSpecialties,
  DoctorSecondarySpecialties,
  SpecialtyHealthConditions
};