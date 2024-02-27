import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies["auth_token"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;
