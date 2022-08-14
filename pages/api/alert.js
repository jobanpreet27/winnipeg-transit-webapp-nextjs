import { Worker } from "worker_threads";
import alertsController from "../../controllers/alertsController";

export default function handler(req, res) {
  if (req.method !== "POST") return;
  const { userId, busKey, stopId, routeKey } = req.body;
  try {
    alertsController.addAlert(userId);
    const worker = new Worker("./utils/alertWorker.js", {
      workerData: { userId, busKey, stopId, routeKey },
    });
    worker.on("exit", () => {
      console.log("worker done");
      alertsController.removeAlert(userId);
    });
    res.status(201).send({ message: "Alert Created" });
  } catch (error) {
    res.status(429).send({ message: error.message });
  }
}
