import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

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
              <CardContent sx={{ pt: 0, "&:last-child": { pb: 0 } }}>
                {stop.routes.map((route) => (
                  <Avatar
                    sx={{
                      display: "inline",
                      mr: 1,
                      px: 0.5,
                      color: "#000000",
                      bgcolor: route["badge-style"]["background-color"],
                    }}
                    variant='square'
                  >
                    {route.key}
                  </Avatar>
                ))}
              </CardContent>
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
