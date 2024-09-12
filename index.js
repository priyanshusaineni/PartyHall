const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

const mongoose = require("mongoose");
const superAdminRoutes = require("./Routes/superadmin.routes");
const adminRoutes = require("./Routes/admin.routes");
const userRoutes = require("./Routes/user.routes");
mongoose
  .connect(
    "mongodb+srv://shivarama635:6ZKu3osXc17b8nbE@cluster0.gqpduvy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      // .connect('mongodb://localhost:27017/PartyHall', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    //console.log("successful");
  })
  .catch(() => {
    //console.log("Connection failed");
  });

app.use("/api/super", superAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3006, () => {
  //console.log("Server Running ");
});
