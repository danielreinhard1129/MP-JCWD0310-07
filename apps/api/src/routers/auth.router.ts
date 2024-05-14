import { AuthController } from "@/controllers/auth.controller";
import { verifyToken } from "@/lib/jwt";
import { Router } from "express";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.authController.registerController);
    this.router.post("/login", this.authController.loginController);
    this.router.post(
      "/forgot-password",
      this.authController.forgotPasswordController,
    );
    this.router.patch(
      "/reset-password", verifyToken, 
      this.authController.resetPasswordController,
    );
    this.router.get(
      '/keep-login',
      verifyToken,
      this.authController.keepLoginController,
    );
    // this.router.post(
    //   '/referral-code',
    //   this.authController.referralCodeController,
    // );
    this.router.get(
      '/user-point',
      this.authController.getPointUserController,
    );

    this.router.post("/register-organizer", this.authController.registerOrganizerController);
  }

  getRouter(): Router {
    return this.router;
  }
}
