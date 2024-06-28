require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const connectDB = require("./models/db");
const { mysocket } = require('./routes/socket');
const server = http.createServer(app);

app.use(express.json());

// CORS Configuration
const allowedOrigins = [process.env.CLIENT_URL]; // https://burgeranime.vercel.app 
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));




// Connect to MongoDB
connectDB();

// Socket.io
mysocket(server);


// Routes
app.use("/api", require("./routes/Register"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/Profile/Profileinfo"));
app.use("/api", require("./routes/Profile/Changeavatar"));
app.use("/api", require("./routes/Profile/GetAll"));
app.use("/api/dashboard", require("./routes/dashboard/Uploadanime"));
app.use("/api/dashboard", require("./routes/dashboard/GetListAnime"));
app.use("/api/dashboard", require("./routes/dashboard/Banusers"));
app.use("/api/dashboard", require("./routes/dashboard/Rankedusers"));
app.use("/api/dashboard", require("./routes/dashboard/Premium"));

app.use("/api/animes" , require("./routes/Animes/WatchLike") );



const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on PORT : ${PORT}`);
});
