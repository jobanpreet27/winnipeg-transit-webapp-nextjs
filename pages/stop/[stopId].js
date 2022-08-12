import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";

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
    fetch("/api/alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, busKey, stopId, routeKey }),
    });
  };

  const renderSchedule = (
    <div>
      {schedule.map((bus) => {
        return (
          <div key={bus.key}>
            <h2>{bus.variant.name}</h2>
            <div>
              {new Date(bus.times.departure.estimated).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
            <button onClick={() => setAlert(bus.key, bus.route)}>Set Alert</button>
          </div>
        );
      })}
    </div>
  );

  useEffect(() => {
    if (router.isReady) {
      fetchSchedule();
    }
  }, [router.isReady]);

  return <div>{renderSchedule}</div>;
}
