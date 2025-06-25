import { Router } from "express";
import { getAllClinic, getOneClinic, getAllArticles, getOneArticle } from "../controller/public";
import { registerClinic,loginClinic,registerPatient,loginPatient, logout, authCheck } from "../controller/authController";
import { myClinicProfile, updateClinic, uploadClinicImage  } from "../controller/klinik";
import { myPatientProfile, updatePatientProfile } from "../controller/patient";
import { createAppointment, getMyAppointments, getClinicAppointments, updateAppointmentStatus, deleteAppointment } from "../controller/appointment";
import {filterClinics} from "../controller/filter";
import { reviewClinic, getClinicReviews } from "../controller/review";
import { authenticateClinic, authenticatePatient } from "../middleware/auth";
import upload from "../middleware/multer";


const router = Router();

// 🔐 Klinik routes
router.get("/klinik/me", authenticateClinic, myClinicProfile); 
router.put("/klinik/:id", authenticateClinic, updateClinic);
router.post("/klinik/upload-image", authenticateClinic, upload.single("photo"), uploadClinicImage)

// 🌐 Public routes
router.get("/all-klinik", getAllClinic);
router.get("/klinik/:id", getOneClinic); 
router.get("/articles", getAllArticles);
router.get("/article/:id", getOneArticle);


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
router.delete("/appointment/:id", authenticatePatient, deleteAppointment);
router.get("/appointment-klinik", authenticateClinic, getClinicAppointments);
router.patch("/appointment/:id", authenticateClinic, updateAppointmentStatus);

// 🔍 Filter clinic
router.get("/filter-klinik", filterClinics);

// 📝 Review Klinik
router.post("/review-klinik", authenticatePatient, reviewClinic);
router.get("/review-klinik/:clinicId", getClinicReviews);

// 🚪 Logout
router.post("/logout", logout);

// auth check
router.get("/auth-check", authCheck, authenticatePatient);

export default router;