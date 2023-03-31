/** @format */
const {
  validateUserSchema,
  validateLoginCredentials,
  validatePassword,
} = require("../model/userModel/validateUserSchema");
const { validateTaskCreate } = require("../model/taskModel/taskValidation");
const User = require("../model/userModel/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
var CryptoJS = require("crypto-js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class HelperFunction {
  constructor() {
    console.log("Helper function init!!");
  }

  // Validating incoming data from frontend
  async validateUserData(value) {
    const result = await validateUserSchema.validateAsync(value);
    return result;
  }

  // Generating hash password
  async generateHashPassword(password) {
    const result = await bcrypt.hash(password, 10);
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  // compare hash password
  async comparePassword(password, value) {
    const result = await bcrypt.compare(password, value);
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  // Generate token
  async generateToken(user) {
    const token = await jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );
    try {
      return token;
    } catch (error) {
      return false;
    }
  }

  // validate login credentials
  async validateLoginUserData(value) {
    const result = await validateLoginCredentials.validateAsync(value);
    return result;
  }

  // Validate user password
  async validateUserPassword(value) {
    const result = await validatePassword.validateAsync(value);
    return result;
  }

  // upload image
  async uploadImage(file) {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    try {
      return result;
    } catch (error) {
      return false;
    }
  }

  async validateTaskCreate(value) {
    const result = await validateTaskCreate.validateAsync(value);
    return result;
  }

  async encryptText(value) {
    var ciphertext = CryptoJS.AES.encrypt(value, "secret key 123").toString();
    return ciphertext;
  }
}

module.exports = new HelperFunction();
