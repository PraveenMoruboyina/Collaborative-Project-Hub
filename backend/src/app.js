const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("CONTENT TYPE:", req.headers["content-type"]);
  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({
    received: req.body
  });
});

app.use("/api/auth", authRoutes);
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/projects", projectRoutes);
const invitationRoutes = require("./routes/invitationRoutes");

app.use("/api/invitations", invitationRoutes);
const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

module.exports = app;