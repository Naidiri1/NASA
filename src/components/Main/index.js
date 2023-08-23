import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { nasaApi } from "./config";
import YouTubeSearch from "../Youtube";
import astronauts from "../../assets/astronauts.gif";
import "./style.css";

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
  }, [apiUrl]);

  return (
    <div className="container">
      <div className="astrounat">
        <img src={astronauts} alt="astronaut in movement"></img>
        <h3 id="title" className="text-center">
          {apodData.title}
        </h3>
      </div>
      <p id="date" className="text-center">
        Date: {apodData.date}
      </p>

      <p id="explanation" className=" pt-5">
        {apodData.explanation}
      </p>

      <div id="multimedia" className="text-center">
        {apodData.media_type === "image" ? (
          <img id="img" src={apodData.url} alt={apodData.title} />
        ) : (
          <iframe title={apodData.title} src={apodData.url} />
        )}
        <p id="copyright">Copyright: {apodData.copyright}</p>
      </div>

      <YouTubeSearch apodTitle={apodData.title} />
    </div>
  );
};

export default Main;
