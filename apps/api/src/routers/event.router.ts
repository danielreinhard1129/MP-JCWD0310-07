import { EventController } from "@/controllers/event.controller";
import { verifyToken } from "@/lib/jwt";
import { uploader } from "@/lib/uploader";
import { Router } from "express";

export class EventRouter {
  private router: Router;
  private EventController: EventController;

  constructor() {
    this.EventController = new EventController();
    this.router = Router();
    this.initializeRoutes();
  }
  
  private initializeRoutes(): void {
    this.router.post(
      "/",
      verifyToken,
      uploader("IMG", "/images").array("thumbnail", 1),
      this.EventController.createEventController,
    );
    this.router.get('/', this.EventController.getEventsController)
    this.router.get('/:id', this.EventController.getEventController)
  }

  getRouter(): Router {
    return this.router;
  }
}
