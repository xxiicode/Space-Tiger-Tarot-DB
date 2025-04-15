import React, { useEffect, useState } from 'react';


export const YoutubeFeed = () => {

    const [videos, setVideos] = useState([]);
    const channelId = 'UC3Hn8akBvSkIPCjI11nQaRQ';
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;


    useEffect(() => {
        const fetchVideos = async () => {
            try {
            const cachedData = localStorage.getItem('youtubeVideos');
            const lastFetchTime = localStorage.getItem('lastFetchTime');

            const oneHourInMs = 60 * 60 * 1000; // 1 hora en milisegundos
            const currentTime = new Date().getTime();

            if (cachedData && lastFetchTime && currentTime - lastFetchTime < oneHourInMs) {
                // Si los datos están en el cache y no ha pasado 1 hora, usamos los datos cacheados
                setVideos(JSON.parse(cachedData));
                console.log("Usando datos cacheados");
            } else {
                // Si no hay datos cacheados o ya pasó 1 hora, hacemos la solicitud a la API
                    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=3`
                    );
                    if (!response.ok) {
                        throw new Error('Error al obtener los videos');
                    }
                    const data = await response.json();
                    setVideos(data.items);

                    // Guardamos los videos en el localStorage
                    localStorage.setItem('youtubeVideos', JSON.stringify(data.items));
                    localStorage.setItem('lastFetchTime', currentTime.toString()); // Guardamos el tiempo de la última solicitud
                    console.log("Datos actualizados desde la API");
                }
            }   catch (error) {
                console.error('Error al obtener los videos o interactuar con localStorage:', error);
            }
        };
        fetchVideos();
    }, []);

    return (
        <div className="youtube-feed container">
            <h1 className='text-center mb-5 text-uppercase'>Last videos uploaded</h1>
            <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center">

                {videos.map((video) => (
                    <div key={video.id.videoId} className="col">
                        <div className="card border-0 rounded-border h-100">
                            <a
                                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    className='w-100 rounded-top'
                                    src={video.snippet.thumbnails.medium.url}
                                    alt={video.snippet.title}
                                />
                            </a>
                            <div className="card-body">
                                <p className='card-text d-none d-md-block'>{video.snippet.description}</p>
                                <a className='btn btn-outline-primary' href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">Watch video</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};
