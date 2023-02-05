/** @format */

const {
  validateUserData,
  generateHashPassword,
  generateToken,
  validateLoginUserData,
  comparePassword,
  uploadImage,
  validateUserPassword,
} = require("../../helper/helper");

const {
  findUserByEmailorUsername,
  saveNewUser,
  updateProfilePicture,
  updateUserName,
  handleSearchUser,
  FetchUserById,
  UpdatePassword,
  followedUser,
} = require("../../query/userQuery/userQuery");

var createError = require("http-errors");

class UserController {
  constructor() {
    console.log("User controller running");
  }

  // *** Register new user
  async register(req, res, next) {
    try {
      const result = await validateUserData(req.body);
      // *** Check user email or username has already been taken or not
      const user = await findUserByEmailorUsername(
        result.email,
        result.username
      );
      if (user) {
        throw createError.Conflict("Email or username has already been taken");
      } else {
        // *** Hash user password
        const hash = await generateHashPassword(result.password);
        if (!hash) {
          throw createError.NotAcceptable("Weak password. Try again.");
        } else {
          const newUser = await saveNewUser(result, hash);
          if (!newUser) {
            throw createError.InternalServerError();
          } else {
            // Generate token
            const token = await generateToken(newUser);
            return res.status(201).json({
              msg: "Registration successfull",
              user: newUser,
              token: token,
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // *** Login
  async login(req, res, next) {
    try {
      const result = await validateLoginUserData(req.body);
      const user = await findUserByEmailorUsername(
        result.email,
        result.username
      );
      if (!user) {
        throw createError.Conflict("No user found with this email or username");
      } else {
        // Compare user password
        const passwordResult = await comparePassword(
          result.password,
          user.password
        );
        console.log(passwordResult);
        if (!passwordResult) {
          throw createError.Conflict("User credential is not correct");
        } else {
          const token = await generateToken(user);
          if (!token) {
            throw createError.NotImplemented("Invalid token! please try again");
          } else {
            return res.status(201).json({
              msg: "Login successfull",
              user: user,
              token: token,
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // *** Update profile image
  async updateProfileImage(req, res, next) {
    try {
      const file = req.files.image;
      const uploadLink = await uploadImage(file);
      const result = await updateProfilePicture(req.user._id, uploadLink.url);
      return res.status(200).json({ msg: "Profile picture updated", result });
    } catch (error) {
      next(error);
    }
  }

  // *** update profile name
  async updateProfileName(req, res, next) {
    try {
      const { name } = req.body;
      if (!name) {
        throw createError.NotAcceptable("Invalid input");
      } else {
        const user = await updateUserName(req.user._id, name);
        try {
          return res.status(200).json({ msg: "Profile updated", user });
        } catch (error) {
          throw createError.InternalServerError();
        }
      }
    } catch (error) {
      next(error);
    }
  }

  // *** Search user
  async searchUser(req, res, next) {
    try {
      const result = await handleSearchUser(req.query.key, req.user._id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async fetchUser(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError.BadRequest("Url parameter is invalid");
      } else {
        const user = await FetchUserById(id);
        // console.log(user);
        try {
          return res.status(200).json(user);
        } catch (error) {
          throw createError.InternalServerError();
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      if (!req.body.password.trim() || !req.body.newPassword.trim()) {
        throw createError.BadRequest("You cannot proceed with empty password");
      } else {
        // const result = await validateUserPassword(req.body);
        const user = await FetchUserById(req.user._id);
        if (!user) {
          throw createError.Conflict("No user found");
        } else {
          const result = await comparePassword(
            req.body.password,
            user.password
          );
          // console.log(result)
          if (!result) {
            throw createError.Forbidden("Old password is not correct");
          } else {
            const hash = await generateHashPassword(req.body.newPassword);
            if (!hash) {
              throw createError.Conflict("Password is not secure");
            } else {
              const result = await UpdatePassword(req.user._id, hash);
              if (!result) {
                throw createError.InternalServerError("Something went wrong");
              } else {
                return res
                  .status(200)
                  .json({ msg: "Password has been updated" });
              }
            }
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async followUser(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) {
        throw createError;
      } else {
        const user = await FetchUserById(id);
        const result = await followedUser(user, req.user._id);
        if (!result) {
          throw createError.InternalServerError(
            "Something went wrong. Try again!"
          );
        } else {
          return res
            .status(200)
            .json({ msg: "You followed this user", result });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
