import sortSchedule from "../../../utils/sortSchedule";

export default async function handler(req, res) {
  const { stopid } = req.query;
  let url = new URL(
    `https://api.winnipegtransit.com/v3/stops/${stopid}/schedule.json`
  );
  url.searchParams.append("api-key", process.env.WT_API_KEY);
  url.searchParams.append("usage", "long");
  //Fetch schedule
  try {
    let data = await fetch(url);
    let stopSchedule = await data.json();
    const schedule = sortSchedule(stopSchedule["stop-schedule"]["route-schedules"]);
    res.status(200).send(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching schedule" });
  }
}
