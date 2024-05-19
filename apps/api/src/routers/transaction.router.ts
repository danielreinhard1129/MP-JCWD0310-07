import { TransactionController } from "@/controllers/transaction.controller";
import { verifyToken } from "@/lib/jwt";
import { uploader } from "@/lib/uploader";
import { Router } from "express";

export class TransactionRouter {
  private router: Router;
  private TransactionController: TransactionController;

  constructor() {
    this.TransactionController = new TransactionController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      verifyToken,
      this.TransactionController.createTransactionController,
    );
    this.router.patch(
      "/",
      verifyToken,
      this.TransactionController.updateTransactionController,
    );
    this.router.patch(
      "/:id",
      verifyToken,
      uploader("IMG", "/payment").array("paymentProof", 1),
      this.TransactionController.updatePaymentProofController,
    );
    this.router.get(
      "/:id",
      this.TransactionController.getTransactionController,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
