import { Router } from "express";
import { getAllClinic, getOneClinic, updateClinic,getMyClinicProfile, getAllArticles, getMyProfilPatient  } from "../controller";
import { registerKlinik,loginKlinik,registerPatient,loginPatient, logout } from "../controller/authController";
import { verifyToken } from "../middleware/auth";

const router = Router();


router.get("/all-klinik", getAllClinic); //✅
router.get("/klinik/:id", getOneClinic); //✅

router.post("/register/klinik", registerKlinik);
router.post("/login/klinik", loginKlinik);
router.get("/klinik/dashboard", verifyToken, getMyClinicProfile);
router.put("/klinik/:id", verifyToken, updateClinic);

router.post("/register/patient", registerPatient);
router.post("/login/patient", loginPatient);
router.get("/patient/dashboard", verifyToken, getMyProfilPatient);

router.get("/articles", getAllArticles);

router.post("/logout", logout)





export default router;