import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

export default function Home() {
  const [userPosition, setUserPosition] = useState(null);
  const [stops, setStops] = useState([]);

  const fetchStops = async (position) => {
    let data = await fetch(`/api/stops/${position.latitude}/${position.longitude}`);
    let stopsList = await data.json();
    setStops(stopsList);
  };

  const renderStops = (
    <div>
      {stops.map((stop) => (
        <Link key={stop.key} href={"/stop/" + stop.key}>
          <Card sx={{ width: "100%", marginBottom: 1 }} variant='outlined'>
            <CardActionArea>
              <CardHeader title={stop.name} subheader={stop.distances.direct} />
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </div>
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      fetchStops(position.coords)
    );
  }, []);

  return <Container maxWidth='sm'>{renderStops}</Container>;
}
