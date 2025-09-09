const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Import routes (only once each)
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/users");
const resourceRoutes = require('./routes/resourceRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const questionRoutes = require("./routes/questions");

// ✅ Mount routes (only once each)
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/users", userRoutes);
app.use('/api/resources', resourceRoutes);
app.use("/uploads", express.static("uploads"));
app.use('/api/announcements', announcementRoutes);
app.use("/api/questions", questionRoutes); // 👈 Mount route

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
