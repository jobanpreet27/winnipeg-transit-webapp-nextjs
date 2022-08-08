import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function id() {
  const router = useRouter();
  const { id } = router.query;
  const [schedule, setSchedule] = useState([]);

  const fetchSchedule = async () => {
    const data = await fetch("/api/schedule/" + id);
    const list = await data.json();
    setSchedule(list);
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
