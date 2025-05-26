import { Router } from "express";
import { getAllClinic, getOneClinic, getAllArticles,  } from "../controller/public";
import { registerClinic,loginClinic,registerPatient,loginPatient, logout, authCheck } from "../controller/authController";
import { myClinicProfile, updateClinic  } from "../controller/klinik";
import { myPatientProfile, updatePatientProfile } from "../controller/patient";
import { createAppointment, getMyAppointments, getClinicAppointments, updateAppointmentStatus } from "../controller/appointment";
import { authenticateClinic, authenticatePatient } from "../middleware/auth";

const router = Router();

// 🔐 Klinik routes (yang spesifik ditaruh dulu)
router.get("/klinik/me", authenticateClinic, myClinicProfile); 
router.put("/klinik/:id", authenticateClinic, updateClinic);

// 🌐 Public routes
router.get("/all-klinik", getAllClinic);
router.get("/klinik/:id", getOneClinic); 
router.get("/articles", getAllArticles); 

// 🔐 Auth routes
router.post("/register/klinik", registerClinic);
router.post("/login/klinik", loginClinic);

router.post("/register/patient", registerPatient);
router.post("/login/patient", loginPatient);

// 🔐 Dashboard Pasien
router.get("/patient/me", authenticatePatient, myPatientProfile);
router.put("/patient/update", authenticatePatient, updatePatientProfile);

// appointment routes
router.post("/appointment", authenticatePatient, createAppointment);
router.get("/appointment", authenticatePatient, getMyAppointments);
router.get("/appointment-klinik", authenticateClinic, getClinicAppointments);
router.patch("/appointment/:id", authenticateClinic, updateAppointmentStatus);

// 🚪 Logout
router.post("/logout", logout);

// auth check
router.get("/auth-check", authCheck, authenticatePatient);





export default router;