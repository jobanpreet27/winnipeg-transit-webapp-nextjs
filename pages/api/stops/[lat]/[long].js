import fetch from "node-fetch-cache";

export default async function handler(req, res) {
  const { lat, long } = req.query;
  let stopsUrl = new URL("https://api.winnipegtransit.com/v2/stops.json");
  stopsUrl.searchParams.append("api-key", process.env.WT_API_KEY);
  stopsUrl.searchParams.append("lat", lat);
  stopsUrl.searchParams.append("lon", long);
  stopsUrl.searchParams.append("distance", "500");
  let routesUrl = new URL("https://api.winnipegtransit.com/v3/routes.json");
  routesUrl.searchParams.append("api-key", process.env.WT_API_KEY);

  let stopsList = [];
  let routesList = [];
  let dataPromises = [];

  //Fetch stops
  try {
    let data = await fetch(stopsUrl);
    let stops = await data.json();
    stopsList = stops["stops"];
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching stops" });
  }

  //Fetch routes
  stopsList.forEach((stop) => {
    let routeUrl = new URL(routesUrl.toString());
    routeUrl.searchParams.append("stop", stop.key);
    dataPromises.push(fetch(routeUrl).then((data) => data.json()));
  });

  try {
    await Promise.all(dataPromises).then((list) => {
      list.forEach((routes, index) => {
        stopsList[index].routes = routes["routes"];
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching routes" });
  }

  res.status(200).send(stopsList);
}
