import fetch from "node-fetch-cache";

export default async function handler(req, res) {
  let url = new URL("https://api.winnipegtransit.com/v2/stops.json");
  const { lat, long } = req.query;
  url.searchParams.append("api-key", process.env.WT_API_KEY);
  url.searchParams.append("lat", lat);
  url.searchParams.append("lon", long);
  url.searchParams.append("distance", "500");
  try {
    let data = await fetch(url);
    let stops = await data.json();
    res.status(200).send(stops);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error fetching stops" });
  }
}
