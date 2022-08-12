import { Worker } from "worker_threads";
import sendNotification from "../../components/sendNotification";

export default function handler(req, res) {
  if (req.method !== "POST") return;
  const { userId, busKey, stopId, routeKey } = req.body;
  const worker = new Worker("./components/alertWorker.js", {
    workerData: { userId, busKey, stopId, routeKey },
  });
  res.status(201).send({ message: "Alert Created" });
}
