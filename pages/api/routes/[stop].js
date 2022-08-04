import fetch from "node-fetch-cache";

export default async function handler(req, res) {
  const { stop } = req.query;
  let url = new URL("https://api.winnipegtransit.com/v3/routes.json");
  url.searchParams.append("api-key", process.env.WT_API_KEY);
  url.searchParams.append("stop", stop);

  try {
    let data = await fetch(url);
    let routes = await data.json();
    res.status(200).send(routes["routes"]);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in fetching routes" });
  }
}
