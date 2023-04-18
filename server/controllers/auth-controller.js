import authService from "../service/auth-service.js";
import { validateBody } from "../utils/validate-body.js";

const tokenLifePeriod = 30 * 24 * 60 * 60 * 1000;

class authController {
  async registration(req, res, next) {
    try {
      validateBody(req);
      const candidate = await authService.registration(req.body);
      res.cookie("refreshToken", candidate.refreshToken, {
        maxAge: tokenLifePeriod,
        httpOnly: true,
      });
      res.json(candidate);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      validateBody(req);
      const { email, password } = req.body;
      const user = await authService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: tokenLifePeriod,
        httpOnly: true,
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      res.clearCookie("refreshToken");
      const logOut = await authService.logout(refreshToken);
      return res.json(logOut);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      await authService.activate(req.params.link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const user = await authService.refresh(refreshToken);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: tokenLifePeriod,
        httpOnly: true,
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async createRole(req, res, next) {
    try {
      const role = await authService.createRole(req.body);
      console.log(role);
      res.json(role);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res) {
    try {
      const users = await authService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new authController();
