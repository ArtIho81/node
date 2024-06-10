import { FIGHTER } from "../models/fighter.js";
import { responseMiddleware } from "./response.middleware.js";
import { fighterService } from "../services/fighterService.js";

const isValueInRange = (value, min, max) => value >= min && value <= max;
const isEmpty = (data) => (typeof data === "number" ? true : data?.length);
const validatePower = (power) => isValueInRange(power, 1, 100);
const validateDefense = (defense) => isValueInRange(defense, 1, 10);
const validateHealth = (health) => !health || isValueInRange(health, 80, 120);

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  const candidate = req.body;
  const errors = [];

  Object.keys(FIGHTER).forEach((field) => {
    if (field !== "id" && field !== "health" && !isEmpty(candidate[field])) {
      errors.push(`${field} is required`);
    } else if (
      (field === "power" && !validatePower(candidate[field])) ||
      (field === "defense" && !validateDefense(candidate[field])) ||
      (field === "health" && !validateHealth(candidate[field]))
    ) {
      errors.push(`${field} isn't valid`);
    }
  });

  if (candidate.id) {
    errors.push("Id in the request body is present");
  }

  if (errors.length > 0) {
    res.err = errors;
    return responseMiddleware(req, res, next);
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  const updatedData = req.body;
  const { id } = req.params;
  const fighter = fighterService.search({ id });
  if (!fighter) {
    res.err = new Error(`Fighter wasn't found`);
    return responseMiddleware(req, res, next);
  }

  const errors = [];
  const updatedFieldsNumber = Object.keys(FIGHTER).filter(
    (field) => field !== "id" && isEmpty(updatedData[field])
  );
  if (updatedFieldsNumber.length === 0) {
    errors.push("No data to update");
  } else {
    updatedFieldsNumber.forEach((update) => {
      if (
        (update === "power" && !validatePower(updatedData[update])) ||
        (update === "defense" && !validateDefense(updatedData[update])) ||
        (update === "health" && !validateHealth(updatedData[update]))
      ) {
        errors.push(`${update} isn't valid`);
      }
    });
  }
  if (errors.length > 0) {
    res.err = errors;
    return responseMiddleware(req, res, next);
  }
  next();
};

export { createFighterValid, updateFighterValid };
