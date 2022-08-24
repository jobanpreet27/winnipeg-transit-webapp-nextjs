import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Bus from "../../components/Bus";
import CircularProgress from "@mui/material/CircularProgress";

export default function StopId() {
  const router = useRouter();
  const { stopId } = router.query;
  const [schedule, setSchedule] = useState(null);

  const fetchSchedule = async () => {
    const data = await fetch("/api/schedule/" + stopId);
    const list = await data.json();
    setSchedule(list);
  };

  const renderSchedule = () => {
    if (!schedule) {
      return (
        <CircularProgress
          sx={{ position: "absolute", top: "45%", left: "45%" }}
          size='4rem'
        />
      );
    } else {
      return schedule.map((bus) => <Bus bus={bus} stopId={stopId} />);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchSchedule();
    }
  }, [router.isReady]);

  return (
    <Container maxWidth='sm' sx={{ p: 0 }}>
      {renderSchedule()}
    </Container>
  );
}
