import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get(
  "/",
  (req, res, next) => {
    try {
      const data = fighterService.getAllFighters();
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const { id } = req.params;
      const data = fighterService.search(id);
      if (!data) {
        throw new Error(`Incorrect id`);
      }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      const fighter = req.body;
      const data = fighterService.add(user);
      if (!data) {
        throw new Error(`${fighter.name} already exist`);
      }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.patch(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      const { id } = req.params;
      const update = req.body;
      const data = fighterService.update(id, update);
      if (!data) {
        throw new Error(`Incorrect id`);
      }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const { id } = req.params;
      const data = fighterService.delete(id);
      if (!data) {
        throw new Error(`Incorrect id`);
      }
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);
export { router };
