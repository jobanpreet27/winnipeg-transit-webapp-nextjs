import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Stop from "../components/Stop";

export default function Home() {
  const [userPosition, setUserPosition] = useState(null);
  const [stops, setStops] = useState([]);
  const defaultCoords = {
    latitude: "49.852263",
    longitude: "-97.112128",
  };

  const fetchStops = async (position) => {
    let data = await fetch(`/api/stops/${position.latitude}/${position.longitude}`);
    let stopsList = await data.json();
    setStops(stopsList);
  };

  useEffect(() => {
    const getStops = async () => {
      if (navigator.permissions) {
        const result = await navigator.permissions.query({ name: "geolocation" });
        if (result.state !== "granted") fetchStops(defaultCoords);
      }
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition((position) =>
          fetchStops(position.coords)
        );
      else {
        fetchStops(defaultCoords);
      }
    };
    getStops();
  }, []);

  return (
    <Container maxWidth='md' sx={{ p: 0 }}>
      {stops.map((stop) => (
        <Stop key={stop.key} stop={stop} />
      ))}
    </Container>
  );
}
