import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Stop from "../components/Stop";
import CircularProgress from "@mui/material/CircularProgress";
import fetchStops from "../utils/fetchStops";

export default function Home() {
  const [stops, setStops] = useState();
  const defaultCoords = {
    latitude: "49.852263",
    longitude: "-97.112128",
  };

  const getStops = async () => {
    if (navigator.permissions) {
      const result = await navigator.permissions.query({ name: "geolocation" });
      if (result.state !== "granted") fetchStops(defaultCoords, setStops);
    }
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition((position) =>
        fetchStops(position.coords, setStops)
      );
    else {
      fetchStops(defaultCoords, setStops);
    }
  };

  useEffect(() => {
    getStops();
  }, []);

  if (!stops) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "45%", left: "45%" }}
        size='4rem'
      />
    );
  }
  return (
    <Container maxWidth='sm' sx={{ p: 0 }}>
      {stops.map((stop) => (
        <Stop key={stop.key} stop={stop} />
      ))}
    </Container>
  );
}
