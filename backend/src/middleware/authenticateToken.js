import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  console.log("[AUTH] Authentiacation attemp from: ", req.ip);
  const token = req.cookies.token;

  if (!token) {
    console.log("[AUTH] No token provided.");
    return res.status(403).send({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("[AUTH] Failed to authenticate token.");
      return res.status(401).send({ message: "Failed to authenticate token." });
    }

    // if everything good, save to request for use in other routes
    console.log("[AUTH] Successful authentication: ", decoded.name);
    req.userName = decoded.name;
    next();
  });
}
