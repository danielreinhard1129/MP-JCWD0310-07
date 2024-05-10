import { forgotPasswordService } from "@/services/auth/forgot-password.service";
import { getUserPointService } from "@/services/auth/getuserpoint.service";
import { keepLoginService } from "@/services/auth/keep-login.service";
import { loginService } from "@/services/auth/login.service";
import { referralCodeService } from "@/services/auth/referral-code.service";
import { register } from "@/services/auth/register.service";
import { resetPasswordService } from "@/services/auth/reset-password.service";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await register(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await forgotPasswordService(req.body);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async resetPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = Number(req.body.user.id);
      const password = req.body.password;

      const result = await resetPasswordService(userId, password);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async keepLoginController(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.body.user.id;

      const result = await keepLoginService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // async referralCodeController(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     // const id = req.body.user.id;

  //     const result = await referralCodeService(req.body);

  //     return res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getPointUserController(req: Request, res: Response, next: NextFunction) {
    try {
      // const id = req.body.user.id;

      const result = await getUserPointService();

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
