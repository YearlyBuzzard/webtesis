import React, { useState, useEffect } from "react";
import axios from "axios";

function DistanceDisplay() {
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const response = await axios.get("http://localhost:3001/distance");
        setDistance(response.data.distance);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(() => {
      fetchDistance();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Distancia</h1>
      <p>{distance} cm</p>
    </div>
  );
}

export default DistanceDisplay;
