import { youtubeApi } from "../Main/config";
import React, { useState, useEffect } from "react";
import axios from "axios";

const YouTubeSearch = ({ apodTitle }) => {
  const [video, setVideo] = useState([]);
  const [videoItem, setVideoItem] = useState();

  useEffect(() => {
    if (apodTitle) {
      searchVideo(apodTitle);
    }
  }, [apodTitle]);

  const searchVideo = async (query) => {
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
      console.error("Error fetching video:", error.message);
    }
  };

  useEffect(() => {
    if (video.length > 0) {
      const selectedVideo = video[0];
      setVideoItem(
        <div className="video-item">
          <iframe
            title={`YouTube Video: ${selectedVideo.snippet.title}`}
            width="400"
            height="450"
            src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else {
      setVideoItem(null);
    }
  }, [video]);

  return <div className="containers">{videoItem}</div>;
};

export default YouTubeSearch;
