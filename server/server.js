const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./models/db");

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();
// Routes

app.use("/api" , require("./routes/Register"));
app.use("/api" , require("./routes/auth"));
app.use("/api", require("./routes/Profile/Profileinfo"));
app.use("/api", require("./routes/Profile/Changeavatar"));
app.use("/api", require("./routes/Profile/GetAll"));
app.use("/api/dashboard", require("./routes/dashboard/Uploadanime"));
app.use("/api/dashboard", require("./routes/dashboard/GetListAnime"));
app.use("/api/dashboard", require("./routes/dashboard/Banusers"));
app.use("/api/dashboard", require("./routes/dashboard/Rankedusers"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {console.log(`Server Connecting PORT : ${PORT}`);})