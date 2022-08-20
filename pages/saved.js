import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Stop from "../components/Stop";

export default function SavedStops() {
  let [stops, setStops] = useState([]);

  useEffect(() => {
    setStops(JSON.parse(localStorage.getItem("saved-stops")) || []);
  }, []);

  return (
    <Container maxWidth='sm'>
      {stops.map((stop) => (
        <Stop key={stop.key} stop={stop} />
      ))}
    </Container>
  );
}
