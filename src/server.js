const { urlencoded, json } = require("express");
const express = require("express");
const { connecToDatabase } = require("./db");
const { registerRoutes } = require("./routes");
const cors = require("cors");
const { config } = require("./config");

const app = express();

// Configuration
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Router
registerRoutes(app);

const PORT = config.port;

app.listen(PORT, async () => {
  console.log(`The app is listening on http://localhost:${PORT}`);
  await connecToDatabase();
  console.log(`Database is connected!`);
});
