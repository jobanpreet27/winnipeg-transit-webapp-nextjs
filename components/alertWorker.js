const { workerData } = require("worker_threads");
const sendNotification = require("./sendNotification").sendNotification;
const axios = require("axios");
const moment = require("moment");

const { routeKey, stopId, busKey, userId } = workerData;
const url = new URL(
  `https://api.winnipegtransit.com/v3/stops/${stopId}/schedule.json`
);
url.searchParams.append("api-key", process.env.WT_API_KEY);
let timeLeft = 100; // 100 minutes

const timer = () => new Promise((res) => setTimeout(res, 30000));

const getBusTime = async () => {
  let time = 0;
  const response = await axios(url.toString());
  const schedule = response.data["stop-schedule"]["route-schedules"];
  schedule.forEach((route) => {
    if (route.route.key !== routeKey) return;
    route["scheduled-stops"].every((bus) => {
      if (bus.key === busKey) {
        time = moment(bus.times.departure.estimated).diff(moment(), "minutes");
        return false;
      }
      return true;
    });
  });

  return time;
};

const load = async function () {
  while (timeLeft > 5) {
    console.log("loop ran");
    await timer();
    timeLeft = await getBusTime();
    console.log(timeLeft);
  }
  sendNotification(userId, `${routeKey}  will on the stop in ${timeLeft} mins`);
};
load();
