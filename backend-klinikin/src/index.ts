import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}))
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