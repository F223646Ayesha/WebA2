const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/public", express.static(path.join(__dirname, "public")));


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Failed:", err));


const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const reportRoutes = require("./routes/reportRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin/reports", reportRoutes); 


app.get("/", (req, res) => res.render("auth/login", { type: "student" }));
app.get("/admin/dashboard", (req, res) => res.render("admin/dashboard"));
app.get("/student/dashboard", (req, res) => res.render("student/dashboard"));
app.get("/admin/manageCourses", (req, res) => res.render("admin/manageCourses"));
app.get("/admin/manageStudents", (req, res) => res.render("admin/manageStudents"));
app.get("/admin/manageReports", (req, res) => res.render("admin/manageReports"));


app.use((req, res) => res.status(404).render("error", { message: "Page Not Found!" }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
