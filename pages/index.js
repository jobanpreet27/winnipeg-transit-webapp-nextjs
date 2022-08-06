import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

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
          <a>
            <h2>{stop.name}</h2>
            <h3>{stop.distances.direct}</h3>
          </a>
        </Link>
      ))}
    </div>
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      fetchStops(position.coords)
    );
  }, []);

  return <div>{renderStops} </div>;
}
