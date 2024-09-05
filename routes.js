const express = require("express");
const { Op } = require("sequelize");
const { Route, Order } = require("./models");

const router = express.Router();

// Получение всех маршрутов (кроме сегодняшней даты)
router.get("/routes", async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0 + 3, 0, 0, 0); // Добавляем 3 часа к началу дня

    const endOfToday = new Date();
    endOfToday.setHours(23 + 3, 59, 59, 999); // Добавляем 3 часа к концу дня

    const routes = await Route.findAll({
      where: {
        date: {
          [Op.notBetween]: [startOfToday, endOfToday], // Исключаем сегодняшние маршруты
        },
      },
    });

    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: "Произошла ошибка при получении маршрутов" });
  }
});

// Получение маршрутов по диапазону дат
router.get("/routes/filter", async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const routes = await Route.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    res.json(routes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Произошла ошибка при фильтрации маршрутов" });
  }
});
// Получение маршрутов только за сегодня

router.get("/routes/today", async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0 + 3, 0, 0, 0); // Добавляем 3 часа к началу дня

    const endOfToday = new Date();
    endOfToday.setHours(23 + 3, 59, 59, 999); // Добавляем 3 часа к концу дня

    const routes = await Route.findAll({
      where: {
        date: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
    });

    res.json(routes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Произошла ошибка при получении маршрутов за сегодня" });
  }
});

// Новый маршрут для получения количества заказов и их статусов для маршрута
router.get("/routes/orders", async (req, res) => {
  const { routeID } = req.query;
  try {
    const orders = await Order.findAll({
      where: {
        routeID: routeID,
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Произошла ошибка при получении заказов" });
  }
});
// Добавление нового маршрута
router.post("/routes/add", async (req, res) => {
  const { number, points, status, date, userID } = req.body;

  // Валидация входных данных
  if (!number || !status || !date) {
    return res.status(400).json({ error: "Необходимо заполнить все поля" });
  }

  try {
    // Создаем новый маршрут
    const newRoute = await Route.create({
      number,
      points: points || 0, // Количество точек можно не указывать, если неизвестно
      status,
      date,
      userID,
    });

    // Возвращаем созданный маршрут
    res.status(201).json(newRoute);
  } catch (error) {
    console.error("Ошибка при добавлении маршрута:", error);
    res.status(500).json({ error: "Произошла ошибка при добавлении маршрута" });
  }
});
module.exports = router;
