const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const superAdminRoutes = require("./Routes/superadmin.routes");
const adminRoutes = require("./Routes/admin.routes");
const userRoutes = require("./Routes/user.routes");
mongoose
  .connect("mongodb://localhost:27017/PartyHall", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successful");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/api/super", superAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.listen(3006, () => {
  console.log("Server Running ");
});
