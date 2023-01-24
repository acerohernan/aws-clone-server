require("dotenv").config();

const config = {
  mongo: {
    url: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    duration: process.env.JWT_DURATION,
  },
};

module.exports = { config };
