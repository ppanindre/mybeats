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
import Appointments from "../../screens/mybeatsScreens/Appointments";
import Patients from "../../screens/mybeatsScreens/Patients";
import Patient from "../../screens/mybeatsScreens/Patient";
import DoctorPrescription from "../../screens/mybeatsScreens/DoctorPrescription";
import DoctorAvailability from "../../screens/mybeatsScreens/DoctorAvailability";
import ShippingAddress from "../../screens/mybeatsScreens/ShippingAddress";
import EditAddress from "../../screens/mybeatsScreens/EditAddress";
import DoctorProfile from "../../screens/mybeatsScreens/DoctorProfile";
import DoctorMedicine from "../../screens/mybeatsScreens/DoctorMedicine";
import DoctorDashboard from "../../screens/mybeatsScreens/DoctorDashboard";
import PatientDashboard from "../../screens/mybeatsScreens/PatientDashboard";
import ImageAnalyzeDisplay from "../../../../MyCharts/Components/ImageAnalyzeDisplay";

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
            name: "pharmacy",
            component: Pharmacy,
        },
        {
            headerTitle: "Lab",
            name: "lab",
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
            headerTitle: "Payment",
            name: "payment",
            component: Payment,
        },
        {
            headerTitle: "Appointments",
            name: "appointments",
            component: Appointments,
        },
        {
            headerTitle: "Patients",
            name: "patients",
            component: Patients,
        },
        {
            headerTitle: "Patient",
            name: "patient",
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
            headerTitle: "Image Analyzer",
            name: "ImageAnalyzeDisplay",
            component: ImageAnalyzeDisplay,
        },
    ],
};
