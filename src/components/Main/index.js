import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { nasaApi } from "./config";
import YouTubeSearch from "../Youtube";
const Main = () => {
  const [apodData, setApodData] = useState({});
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApi}`;
  useEffect(() => {
    // Fetch data from NASA API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setApodData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <h3 id="title" className="pt-5 text-center">
        {apodData.title}
      </h3>
      <p id="date" className="text-center">
        Date: {apodData.date}
      </p>
      <p id="date" className="lead pt-5">
        {apodData.explanation}
      </p>
      <div id="multimedia" className="text-center">
        {apodData.media_type === "image" ? (
          <img src={apodData.url} alt={apodData.title} />
        ) : (
          <iframe title={apodData.title} src={apodData.url} />
        )}
        <p>Copyright: {apodData.copyright}</p>
      </div>
      <YouTubeSearch apodTitle={apodData.title} />
    </div>
  );
};

export default Main;
