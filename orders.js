const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { Order, Product } = require("./models");

// Получение заказов по ID маршрута
router.get("/orders/:routeID", async (req, res) => {
  try {
    const routeID = req.params.routeID;
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
// Получение заказов по ID заказа
router.get("/orders/getbyid/:orderID", async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const order = await Order.findByPk(orderID);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Произошла ошибка при получении заказов" });
  }
});
// Обновление dateStart для заказа
router.post("/orders/:id/start", async (req, res) => {
  const { id } = req.params;
  const { dateStart } = req.body;

  try {
    // Найти заказ по ID
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    // Преобразование даты
    let startDate = new Date(dateStart);

    // Проверяем, удалось ли корректно преобразовать дату
    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ error: "Некорректный формат даты" });
    }

    // Добавляем 3 часа
    startDate.setHours(startDate.getHours() + 3);

    // Преобразуем в формат MySQL (YYYY-MM-DD HH:MM:SS)
    const formattedDate = startDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Обновление поля dateStart в заказе
    order.dateStart = formattedDate;
    await order.save();

    res
      .status(200)
      .json({ message: "Дата старта обновлена", dateStart: formattedDate });
  } catch (error) {
    console.error("Ошибка при обновлении заказа:", error);
    res.status(500).json({ error: "Ошибка при обновлении заказа" });
  }
});

// Обновление статуса заказа на "Выполнено"
router.post("/orders/:id/complete", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    order.status = "Выполнено";
    await order.save();

    res.status(200).json({ message: "Заказ выполнен" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении статуса заказа" });
  }
});
// Обновление статуса заказа на "Выполнено"
router.post("/orders/:id/complete", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    order.status = "Выполнено";
    await order.save();

    res.status(200).json({ message: "Заказ выполнен" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении статуса заказа" });
  }
});

// Добавление нового маршрута с полной информацией
router.post("/orders/add", async (req, res) => {
  try {
    const {
      orderNumber,
      routeID,
      name,
      client_fio,
      address,
      phoneNumbers,
      size,
      volume,
      quantity,
      comment,
    } = req.body;

    // Создаем новый маршрут
    const newOrder = await Order.create({
      orderNumber,
      routeID,
      name,
      client_fio,
      address,
      phoneNumbers,
      size,
      volume,
      quantity,
      comment,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при создании нового маршрута" });
  }
});
module.exports = router;
