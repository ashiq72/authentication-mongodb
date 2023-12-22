const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const app = require("./app");

app.listen(PORT, () => {
  console.log("Server is running");
});
