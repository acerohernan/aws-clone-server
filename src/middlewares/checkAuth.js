const { decodeJWT } = require("../services/jwt");

function checkAuth(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer) return res.status(401).send("Unathorized");

  const token = bearer.replace("Bearer ", "");

  if (!token) return res.status(401).send("Unathorized");

  const decoded = decodeJWT(token);

  if (!decoded) return res.status(401).send("Unathorized");

  req.user = { id: decoded.sub };

  next();
}

module.exports = checkAuth;
