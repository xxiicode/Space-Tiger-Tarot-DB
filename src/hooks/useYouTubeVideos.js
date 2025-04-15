import { useState, useEffect } from 'react';
import axios from 'axios';

export const useYouTubeVideos = (channelId, apiKey) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
            params: {
              part: 'snippet',
              channelId: channelId,
              maxResults: 5,
              order: 'date',
              type: 'video',
              key: apiKey
            }
          }
        );

        setVideos(response.data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelId, apiKey]);

  return { videos, loading, error };
}; 