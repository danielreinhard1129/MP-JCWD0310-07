import { createTransactionService } from "@/services/transaction/create-transaction.service";
import { getTransactionService } from "@/services/transaction/get-transaction.service";
import { updatePaymentProofService } from "@/services/transaction/update-payment.service";
import { updateTransactionService } from "@/services/transaction/update-transaction.service";
import { Request, Response } from "express";

export class TransactionController {
  async createTransactionController(req: Request, res: Response) {
    try {
      const result = await createTransactionService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      throw error;
    }
  }

  async updateTransactionController(req: Request, res: Response) {
    try {
      const result = await updateTransactionService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      throw error;
    }
  }

  async getTransactionController(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const result = await getTransactionService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      throw error;
    }
  }

  async updatePaymentProofController(req: Request, res: Response) {
    try {
      const files = req.files as Express.Multer.File[];

      const result = await updatePaymentProofService(
        Number(req.params.id),
        files[0],
      );

      return res.status(200).send(result);
    } catch (error) {
      throw error;
    }
  }
}
