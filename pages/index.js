import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Stop from "../components/Stop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const [stops, setStops] = useState(null);
  const defaultCoords = {
    latitude: "49.852263",
    longitude: "-97.112128",
  };

  const fetchStops = async (position) => {
    let data = await fetch(`/api/stops/${position.latitude}/${position.longitude}`);
    let stopsList = await data.json();
    setStops(stopsList);
  };
  const renderStops = () => {
    if (!stops) {
      return (
        <CircularProgress
          sx={{ position: "absolute", top: "45%", left: "45%" }}
          size='4rem'
        />
      );
    } else {
      return stops.map((stop) => <Stop key={stop.key} stop={stop} />);
    }
  };

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

  useEffect(() => {
    getStops();
  }, []);

  return (
    <Container maxWidth='sm' sx={{ p: 0 }}>
      {renderStops()}
    </Container>
  );
}
