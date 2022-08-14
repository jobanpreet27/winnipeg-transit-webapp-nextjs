export default async function handler(req, res) {
  const { stopid } = req.query;
  let schedule = [];
  let url = new URL(
    `https://api.winnipegtransit.com/v3/stops/${stopid}/schedule.json`
  );
  url.searchParams.append("api-key", process.env.WT_API_KEY);
  url.searchParams.append("usage", "long");

  const sortSchedule = (array) => {
    array.forEach((routes) => {
      routes["scheduled-stops"].forEach((stop) => {
        let stopInfo = { ...stop, route: routes.route.key };
        stopInfo.departureTime = new Date(
          stop.times.departure.estimated
        ).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        schedule.push(stopInfo);
      });
    });
    schedule.sort((a, b) => {
      return a.times.departure.estimated > b.times.departure.estimated ? 1 : -1;
    });
  };
  //Fetch schedule
  try {
    let data = await fetch(url);
    let stopSchedule = await data.json();
    sortSchedule(stopSchedule["stop-schedule"]["route-schedules"]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching schedule" });
  }
  res.status(200).send(schedule);
}
