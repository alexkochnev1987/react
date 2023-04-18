import { validationResult } from "express-validator";
import { ApiError, MessageToUser } from "../exceptions/exceptions.js";

export const validateBody = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.BadRequest(
      MessageToUser.validationRequestError,
      errors.array()
    );
  }
};
