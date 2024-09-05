const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const orders = require("./orders");
const users = require("./users");
const products = require("./products");
const { sequelize } = require("./models");

const app = express();

app.use(bodyParser.json());

// Подключаем маршруты
app.use("/api", routes);
app.use("/api", orders);
app.use("/api", users);
app.use("/api", products);

app.listen(3000, async () => {
  console.log("Server is running on http://localhost:3000");
  await sequelize.authenticate();
  console.log("Connected to the database!");
});
