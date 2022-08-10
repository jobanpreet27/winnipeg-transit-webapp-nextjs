const axios = require("axios").default;
const { Worker } = require("worker_threads");
const path = require("path");
export default function handler(req, res) {
  if (req.method !== "POST") return;

  const { userId, busId, stopId } = req.body;
  const options = {
    method: "POST",
    url: "https://onesignal.com/api/v1/notifications",
    headers: {
      Accept: "application/json",
      Authorization: "Basic " + process.env.SIGNAL_REST_API_KEY,
      "Content-Type": "application/json",
    },
    data: {
      included_segments: ["include_player_ids"],
      contents: { en: "Your bus is 5 mins away" },
      include_player_ids: [userId],
      name: "alert",
      app_id: process.env.NEXT_PUBLIC_SIGNAL_APPID,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  const worker = new Worker("./components/alertWorker.js", {
    workerData: { num: 10, message: "Hello World" },
  });

  res.status(201).send({ message: "Alert Created" });
}
