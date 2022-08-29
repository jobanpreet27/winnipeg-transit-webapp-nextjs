export default function sortSchedule(array) {
  const schedule = [];
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
  return schedule;
}
