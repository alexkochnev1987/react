import User from "../models/user.js";
import Role from "../models/role.js";
import {
  generateToken,
  hashPassword,
  isValidPassword,
} from "../utils/hash-password.js";
import * as uuid from "uuid";
import MailService from "./mail-service.js";
import TokenService from "./token-service.js";
import { UserDTO } from "../dtos/user-dto.js";
import { ApiError, MessageToUser } from "../exceptions/exceptions.js";
import tokenService from "./token-service.js";

class AuthService {
  async registration(body) {
    const { username, password, email } = body;
    if (!username || !password || !email) throw ApiError.BadRequest();
    const candidate = await User.findOne({ email });
    if (candidate) throw ApiError.BadRequest(MessageToUser.userExistError);

    const hashedPassword = hashPassword(password);
    const role = await Role.findOne({ value: "user" });
    const activationLink = uuid.v4();
    const user = await User.create({
      activationLink,
      email,
      username,
      password: hashedPassword,
      roles: [role.value],
    });
    await new MailService().sendActivationsMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );
    const userDTO = new UserDTO(user);
    const { accessToken, refreshToken } = TokenService.generateTokens({
      ...userDTO,
    });
    TokenService.saveToken(user._id, refreshToken);

    return { ...userDTO, accessToken, refreshToken };
  }
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) throw ApiError.BadRequest(MessageToUser.notExist);
    const validPassword = isValidPassword(password, user.password);
    if (!validPassword)
      throw ApiError.BadRequest(MessageToUser.notValidPassword);

    const userDTO = new UserDTO(user);
    const { accessToken, refreshToken } = TokenService.generateTokens({
      ...userDTO,
    });
    await TokenService.saveToken(user._id, refreshToken);
    return { ...userDTO, accessToken, refreshToken };
  }

  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnauthorizedError();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) throw ApiError.UnauthorizedError();
    console.log(userData, tokenFromDB);
    const userDTO = new UserDTO(userData);
    const tokens = TokenService.generateTokens({
      ...userDTO,
    });
    await TokenService.saveToken(userData._id, tokens.refreshToken);
    return { ...userDTO, ...tokens };
  }
  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) throw ApiError.BadRequest(MessageToUser.userNotFound);
    user.isActivated = true;
    await user.save();
  }

  async createRole(data) {
    const role = await Role.create({ value: data.role });
    return role;
  }

  async getUsers() {
    const users = await User.find();
    return users;
  }

  async update(post) {
    if (!post._id) throw ApiError.BadRequest("Id not found");
    const newPost = await Post.findOneAndUpdate(post._id, post, {
      new: true,
    });
    return newPost;
  }

  async delete(id) {
    if (!id) throw ApiError.BadRequest("Id not found");
    const post = await Post.findByIdAndDelete(id);
    return post;
  }
}

export default new AuthService();
