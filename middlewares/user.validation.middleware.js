import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";
import { responseMiddleware } from "./response.middleware.js";

const validateEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.trim());
const validatePassword = (password) => password.trim().length >= 3;
const validatePhone = (phone) => /^\+380[\d]{9}$/.test(phone.trim());
const isEmpty = (data) => data?.length;

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const candidate = req.body;
  const errors = [];

  Object.keys(USER).forEach((field) => {
    if (field !== "id" && !isEmpty(candidate[field])) {
      errors.push(`${field} is required`);
    } else if (
      (field === "phoneNumber" && !validatePhone(candidate[field])) ||
      (field === "email" && !validateEmail(candidate[field])) ||
      (field === "password" && !validatePassword(candidate[field]))
    ) {
      errors.push(`${field} isn't valid`);
    }
  });
  if (candidate.id) {
    errors.push("Id is present in the request body");
  }

  if (errors.length > 0) {
    res.err = errors;
    return responseMiddleware(req, res, next);
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const updatedData = req.body;
  const { id } = req.params;
  const user = userService.search({ id });
  if (!user) {
    res.err = new Error(`User wasn't found`);
    return responseMiddleware(req, res, next);
  }
  const errors = [];
  const updatedFields = Object.keys(USER).filter(
    (field) => field !== "id" && isEmpty(updatedData[field])
  );
  if (updatedFields.length === 0) {
    errors.push("No data to update");
  } else {
    updatedFields.forEach((update) => {
      if (
        (update === "phoneNumber" && !validatePhone(updatedData[update])) ||
        (update === "email" && !validateEmail(updatedData[update])) ||
        (update === "password" && !validatePassword(updatedData[update]))
      ) {
        errors.push(`${update} isn't valid`);
      }
    });
  }
  if (updatedData.id) {
    errors.push("Id is present in the request body");
  }

  if (errors.length > 0) {
    res.err = errors;
    return responseMiddleware(req, res, next);
  }
  next();
};

export { createUserValid, updateUserValid };
