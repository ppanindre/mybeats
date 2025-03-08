// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Doctor, Specialty, PrimaryToSecondary, Patient, Availability, Appointment, Prescription, PatientStory, LabTestResult, DoctorSpecialties, DoctorSecondarySpecialties } = initSchema(schema);

export {
  Doctor,
  Specialty,
  PrimaryToSecondary,
  Patient,
  Availability,
  Appointment,
  Prescription,
  PatientStory,
  LabTestResult,
  DoctorSpecialties,
  DoctorSecondarySpecialties
};