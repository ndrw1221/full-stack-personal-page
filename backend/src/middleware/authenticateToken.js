import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(403).send({ message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Failed to authenticate token." });
    }

    // if everything good, save to request for use in other routes
    req.userName = decoded.name;
    next();
  });
}
