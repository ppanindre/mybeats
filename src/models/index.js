// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Doctor, Specialty, Patient, Availability, Appointment, Prescription, DoctorSpecialties } = initSchema(schema);

export {
  Doctor,
  Specialty,
  Patient,
  Availability,
  Appointment,
  Prescription,
  DoctorSpecialties
};