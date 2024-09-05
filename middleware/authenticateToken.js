const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Токен не предоставлен" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Неверный токен" });
    }

    // Сохраняем идентификатор пользователя для использования в запросах
    req.userId = user.userId;
    next();
  });
};

module.exports = authenticateToken;
