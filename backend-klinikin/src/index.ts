import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: ["http://localhost:3000", "http://192.168.0.113:8081"], // Ganti dengan URL frontend Anda
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.get("/", (req, res) => {
  try {
      res.status(200).json({
          status: "success",
          message: "Welcome to klinikin API"
      })
  } catch (error) {
      console.log(error);
      res.status(500).json({
          status: "error",
          message: "Internal server error"
      })
  }
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});