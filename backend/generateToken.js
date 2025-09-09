const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { role: "admin" },
  "CampusPrepIsAwesome123", // must match your JWT_SECRET
  { expiresIn: "1d" }
);

console.log("Your admin token:\n", token);
