const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(400).json({ message: "Authentication failed!" });
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, "jabuka");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    const err = new Error("Authentication failed!", 403);
    return next(err);
  }
};
