/** @format */

const jwt = require("jsonwebtoken");
var createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      throw createError.Unauthorized("Token is not present");
    } else {
      const verify = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      try {
        req.user = verify;
        next();
      } catch (error) {
        throw createError.Unauthorized("Invalid token");
      }
    }
  } catch (error) {
    next(error);
  }
};
