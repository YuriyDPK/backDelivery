const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const { Op } = require("sequelize");
const authenticateToken = require("./middleware/authenticateToken");
const router = express.Router();
// Секрет для подписи токена
const JWT_SECRET = "your_jwt_secret";
// Регистрация
router.post("/register", async (req, res) => {
  const { email, phone, firstName, lastName, middleName, password } = req.body;

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
      firstName,
      lastName,
      middleName,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error("Ошибка при регистрации пользователя:", error);
    res.status(500).json({ error: "Ошибка при регистрации пользователя" });
  }
});

// Авторизация (логин)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Неправильный email или пароль" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Неправильный email или пароль" });
    }

    // Генерация JWT токена
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    res.status(500).json({ error: "Ошибка при авторизации" });
  }
});
// Получение данных профиля
router.get("/user/profile", authenticateToken, async (req, res) => {
  console.log(111);
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      phone: user.phone,
      email: user.email,
    });
  } catch (error) {
    console.error("Ошибка при получении данных профиля:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Обновление данных профиля
router.put("/user/update", authenticateToken, async (req, res) => {
  const { firstName, lastName, middleName, phone, email, password } = req.body;

  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    // Если пароль передан, то хэшируем новый пароль
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.middleName = middleName;
    user.phone = phone;
    user.email = email;

    await user.save();

    res.json({ message: "Данные профиля успешно обновлены" });
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});
module.exports = router;
