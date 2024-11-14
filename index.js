const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

const mongoose = require("mongoose");
const superAdminRoutes = require("./Routes/superadmin.routes");
const adminRoutes = require("./Routes/admin.routes");
const userRoutes = require("./Routes/user.routes");

const clusterLink = process.env.CLUSTER_LINK;
mongoose
  .connect(clusterLink, {
    // .connect('mongodb://localhost:27017/PartyHall', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Cluster connection successful");
  })
  .catch(() => {
    console.log("Cluster connection failed");
  });

app.use("/api/super", superAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log("Server Running on port : " + port);
});
