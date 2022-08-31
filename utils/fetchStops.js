export default async function fetchStops(position, callback) {
  let data = await fetch(`/api/stops/${position.latitude}/${position.longitude}`);
  let stopsList = await data.json();
  callback(stopsList);
}
