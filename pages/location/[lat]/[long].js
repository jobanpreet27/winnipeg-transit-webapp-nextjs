import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetchStops from "../../../utils/fetchStops";
import Container from "@mui/material/Container";
import Stop from "../../../components/Stop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Location() {
  const router = useRouter();
  const coords = { latitude: router.query.lat, longitude: router.query.long };
  const [stops, setStops] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      fetchStops(coords, setStops);
    }
  }, [router.isReady]);

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
