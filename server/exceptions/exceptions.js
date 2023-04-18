export const MessageToUser = {
  unauthorized: "User not authorized",
  requestError: "Not contain required fields",
  validationRequestError: "Validation request error",
  userExistError: "User with this email exist",
  notExist: "User with this name not exist",
  notValidPassword: "Password not valid",
  userNotFound: "User not found",
};

export class ApiError extends Error {
  status;
  error;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, MessageToUser.unauthorized);
  }

  static BadRequest(message = MessageToUser.requestError, errors = []) {
    return new ApiError(400, message, errors);
  }
}
