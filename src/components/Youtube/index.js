import { youtubeApi } from "../Main/config";
import React, { useState, useEffect } from "react";
import axios from "axios";

const YouTubeSearch = ({ apodTitle }) => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    if (apodTitle) {
      searchVideos(apodTitle);
    }
  }, [apodTitle]);

  const searchVideos = async (query) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: youtubeApi,
            q: query,
            part: "snippet",
            type: "video",
            maxResults: 1,
          },
        }
      );
      setVideo(response.data.items);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <div className="container">
      <h2>YouTube Video Related to NASA APOD: {apodTitle}</h2>
      {video.length > 0 ? (
        <div className="video-item">
          <h3>{video[0].snippet.title}</h3>
          <iframe
            width="760"
            height="315"
            src={`https://www.youtube.com/embed/${video[0].id.videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No related YouTube video found.</p>
      )}
    </div>
  );
};

export default YouTubeSearch;
