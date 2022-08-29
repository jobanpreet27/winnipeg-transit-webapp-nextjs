export default async function handler(req, res) {
  const { name } = req.query;
  const url = new URL(`https://api.winnipegtransit.com/v3/locations:${name}.json`);
  url.searchParams.append("api-key", process.env.WT_API_KEY);

  try {
    const data = await fetch(url);
    const locations = await data.json();
    console.log(locations);
    res.send(locations.locations);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
}
