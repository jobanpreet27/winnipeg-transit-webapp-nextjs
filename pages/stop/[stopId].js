import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import AlarmIcon from "@mui/icons-material/Alarm";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";

export default function stopId() {
  const router = useRouter();
  const { stopId } = router.query;
  const [schedule, setSchedule] = useState([]);

  const fetchSchedule = async () => {
    const data = await fetch("/api/schedule/" + stopId);
    const list = await data.json();
    setSchedule(list);
  };

  const setAlert = async (busKey, routeKey) => {
    const userId = await OneSignal.getUserId();
    try {
      fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, busKey, stopId, routeKey }),
      });
      alert("Your Alert Added");
    } catch (e) {
      alert("Something went wrong");
    }
  };

  const renderSchedule = (
    <div>
      {schedule.map((bus) => {
        return (
          <Card key={bus.key} sx={{ marginBottom: 1 }} variant='outlined'>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "primary.main" }}>{bus.route}</Avatar>}
              title={bus.variant.name}
              subheader={bus.departureTime}
              action={
                <IconButton onClick={() => setAlert(bus.key, bus.route)}>
                  <AlarmIcon />
                </IconButton>
              }
            />
          </Card>
        );
      })}
    </div>
  );

  useEffect(() => {
    if (router.isReady) {
      fetchSchedule();
    }
  }, [router.isReady]);

  return <Container maxWidth='sm'>{renderSchedule}</Container>;
}
