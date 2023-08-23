import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { nasaApi } from "./config";
import YouTubeSearch from "../Youtube";
import astronauts from "../../assets/astronauts.gif";
import Card from "react-bootstrap/Card";
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

      <p id="explanation" className=" pt-5 pb-5">
        {apodData.explanation}
      </p>
      <div id="img-youtube">
        <div>
          <Card style={{ width: "40rem",border:"none", display:"flex"}}>
            <Card.Img
              className="class--image"
              src={apodData.url}
              alt={apodData.title}
            />
            <Card.Body style={{margin:"auto"}}>
              <Card.Title className="card-title">
                Copyright: {apodData.copyright}
              </Card.Title>
              <Card.Text>
              Astronomy Picture of the Day
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: "40rem", border:"none",  display:"flex"  }}>
            <Card.Body>
              <YouTubeSearch apodTitle={apodData.title} />
              <Card.Title className="card-title">Video related</Card.Title>
              <Card.Text >
               If you want to know more about the APO 
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Main;
