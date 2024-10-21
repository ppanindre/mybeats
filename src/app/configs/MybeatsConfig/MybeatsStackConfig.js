import Appointment from "../../screens/mybeatsScreens/Appointment";
import ConsultDoctor from "../../screens/mybeatsScreens/ConsultDoctor";
import Diagnostics from "../../screens/mybeatsScreens/Diagnostics";
import Lab from "../../screens/mybeatsScreens/Lab";
import Medicines from "../../screens/mybeatsScreens/Medicines";
import Pharmacy from "../../screens/mybeatsScreens/Pharmacy";
import SearchDoctors from "../../screens/mybeatsScreens/SearchDoctors";
import SearchMedicines from "../../screens/mybeatsScreens/SearchMedicines";
import ConfirmAddress from "../../screens/mybeatsScreens/ConfirmAddress";
import Cart from "../../screens/mybeatsScreens/Cart";
import UploadPrescription from "../../screens/mybeatsScreens/UploadPrescription";
import Payment from "../../screens/mybeatsScreens/Payment";
import Appointments from "../../screens/mybeatsScreens/DoctorAppointments";
import Patients from "../../screens/mybeatsScreens/Patients";
import Patient from "../../screens/mybeatsScreens/PatientInfo";
import DoctorPrescription from "../../screens/mybeatsScreens/DoctorPrescription";
import DoctorAvailability from "../../screens/mybeatsScreens/DoctorAvailability";
import ShippingAddress from "../../screens/mybeatsScreens/ShippingAddress";
import EditAddress from "../../screens/mybeatsScreens/EditAddress";
import DoctorProfile from "../../screens/mybeatsScreens/DoctorProfile";
import DoctorMedicine from "../../screens/mybeatsScreens/DoctorMedicine";
import DoctorDashboard from "../../screens/mybeatsScreens/DoctorDashboard";
import PatientDashboard from "../../screens/mybeatsScreens/PatientDashboard";
import SearchPatients from "../../screens/mybeatsScreens/SearchPatients";
import HealthTracking from "../../components/PatientInfo/HealthTracking";
import HealthHistory from "../../components/PatientInfo/HealthHistory";
import PatientAppointments from "../../screens/mybeatsScreens/PatientAppointments";
import PatientAppointmentInfoScreen from "../../components/PatientAppointmentsComponents/PatientAppointmentInfoScreen";
import DoctorAppointmentDetailScreen from "../../components/DoctorAppointmentsComponents/DoctorAppointmentDetailScreen";
import DoctorAppointmentNotesScreen from "../../screens/mybeatsScreens/DoctorAppointmentNotesScreen";
import ImageAnalyzeDisplay from "../../../../MyCharts/Components/ImageAnalyzeDisplay";
import ConfirmAppointment from "../../screens/mybeatsScreens/ConfirmAppointment";
import AllPatientStories from "../../screens/mybeatsScreens/AllPatientStories";
import AppointmentImagesScreen from "../../components/PatientAppointmentsComponents/AppointmentImagesScreen";

export const mybeatsStackConfig = {
    screens: [
        {
            headerTitle: "Consult Doctors",
            name: "consultDoctor",
            component: ConsultDoctor,
        },
        {
            headerTitle: "Diagnostics",
            name: "diagnostics",
            component: Diagnostics,
        },
        {
            headerTitle: "Medicines",
            name: "medicines",
            component: Medicines,
        },
        {
            headerTitle: "Search Doctors",
            name: "searchDoctors",
            component: SearchDoctors,
            showHeader: false,
        },
        {
            headerTitle: "Search Patients",
            name: "searchPatients",
            component: SearchPatients,
            showHeader: false,
        },
        {
            headerTitle: "Search Medicines",
            name: "searchMedicines",
            component: SearchMedicines,
        },
        {
            headerTitle: "Appointment",
            name: "appointment",
            component: Appointment,
        },
        {
            headerTitle: "Pharmacy",
            name: "pharmacyInfo",
            component: Pharmacy,
        },
        {
            headerTitle: "Lab",
            name: "labInfo",
            component: Lab,
        },
        {
            headerTitle: "Confirm Address",
            name: "confirmAddress",
            component: ConfirmAddress,
        },
        {
            headerTitle: "Cart",
            name: "cart",
            component: Cart,
        },
        {
            headerTitle: "Upload Prescription",
            name: "uploadPrescription",
            component: UploadPrescription,
        },
        {
            headerTitle: "Checkout",
            name: "payment",
            component: Payment,
            showHeader: true
        },
        {
            headerTitle: "Appointments",
            name: "appointments",
            component: Appointments,
        },
        {
            headerTitle: "Appointments",
            name: "patientAppointments",
            component: PatientAppointments,
        },
        {
            headerTitle: "Appointment Info",
            name: "appointmentInfo",
            component: PatientAppointmentInfoScreen,
        },
        {
            headerTitle: "Appointment Info",
            name: "doctorAppointmentInfo",
            component: DoctorAppointmentDetailScreen,
        },
        {
            headerTitle: "Confirm Appointment",
            name: "confirmAppointment",
            component: ConfirmAppointment,
        },
        {
            headerTitle: "Confirm Appointment",
            name: "appointmentImages",
            component: AppointmentImagesScreen,
        },
        {
            headerTitle: "Write Notes",
            name: "doctorAppointmentNotes",
            component: DoctorAppointmentNotesScreen,
        },
        {
            headerTitle: "Patients",
            name: "patients",
            component: Patients,
        },
        {
            headerTitle: "Patient",
            name: "patientInfo",
            component: Patient,
        },
        {
            headerTitle: "Search Medicines",
            name: "doctorPrescription",
            component: DoctorPrescription,
        },
        {
            headerTitle: "Availability",
            name: "doctorAvailability",
            component: DoctorAvailability,
        },
        {
            headerTitle: "Shipping Address",
            name: "shippingAddress",
            component: ShippingAddress,
        },
        {
            headerTitle: "Doctor Dashboard",
            name: "doctorDashboard",
            component: DoctorDashboard,
            showHeader: false,
        },
        {
            headerTitle: "Patient Dashboard",
            name: "patientDashboard",
            component: PatientDashboard,
            showHeader: false
        },
        {
            headerTitle: "Edit Address",
            name: "editAddress",
            component: EditAddress,
        },
        {
            headerTitle: "Doctor Profile",
            name: "doctorProfile",
            component: DoctorProfile,
        },
        {
            headerTitle: "Prescription",
            name: "doctorMedicine",
            component: DoctorMedicine,
        },
        {
            headerTitle: "Health Tracking",
            name: "healthTracking",
            component: HealthTracking,
        },
        {
            headerTitle: "Health History",
            name: "healthHistory",
            component: HealthHistory,
        },
        {
            headerTitle: "Image Analyzer",
            name: "ImageAnalyzeDisplay",
            component: ImageAnalyzeDisplay,
        },
        {
            headerTitle: "Patient Stories",
            name: "allPatientStories",
            component: AllPatientStories,
        },
    ],
};
