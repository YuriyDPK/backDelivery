const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const { Op } = require("sequelize");
const router = express.Router();

// Регистрация
router.post("/register", async (req, res) => {
  const { email, phone, name, password } = req.body;

  try {
    // Проверка уникальности email и телефона
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Пользователь с таким email или телефоном уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      phone,
      name,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error("Ошибка при регистрации пользователя:", error);
    res.status(500).json({ error: "Ошибка при регистрации пользователя" });
  }
});

// Авторизация
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Введенный email:", email);
  console.log("Введенный пароль:", password);

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Неправильный email или пароль" });
    }

    console.log("Хэшированный пароль из БД:", user.password);

    // Попробуем сами захешировать введенный пароль и сравнить с хешем в БД
    const hashedInputPassword = await bcrypt.hash(password, 10);
    console.log("Хэшированный введенный пароль:", hashedInputPassword);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Результат сравнения паролей:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Неправильный email или пароль" });
    }

    const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    res.status(500).json({ error: "Ошибка при авторизации" });
  }
});

module.exports = router;
