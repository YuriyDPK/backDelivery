const express = require("express");
const router = express.Router();
const { Product, Order } = require("./models");

// Маршрут для получения товаров по ID заказа
router.get("/products/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const products = await Product.findAll({ where: { orderId } });

    res.json(products);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error); // Лог ошибки
    res.status(500).json({ error: "Ошибка при получении товаров" });
  }
});
// Проверка, отсканированы ли все товары для заказа
router.get("/products/check-order-status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    // Получаем все товары для этого заказа
    const products = await Product.findAll({ where: { orderId } });

    // Проверяем, все ли товары имеют статус "Отсканирован"
    const allScanned = products.every(
      (product) => product.status === "Отсканирован"
    );

    res.json({ allScanned });
  } catch (error) {
    console.error("Ошибка при проверке статуса товаров:", error);
    res.status(500).json({ error: "Ошибка при проверке статуса товаров" });
  }
});
// Update status of a product after scanning
router.post("/products/:id/status", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Товар не найден" });
    }

    product.status = "Отсканирован";
    await product.save();

    res.status(200).json({ message: "Товар отсканирован" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении статуса товара" });
  }
});
router.post("/products/add", async (req, res) => {
  const {
    productNumberDatamatrix,
    productName,
    size,
    volume,
    price,
    quantity,
    orderID,
  } = req.body;

  try {
    // Добавляем новый товар
    const newProduct = await Product.create({
      productNumberDatamatrix,
      productName,
      size,
      volume,
      price,
      quantity,
      orderID: orderID, // Привязываем к заказу
      status: "Не отсканирован", // Статус по умолчанию
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error);
    res.status(500).json({ error: "Ошибка при добавлении продукта" });
  }
});
module.exports = router;
