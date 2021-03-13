import React from 'react';

const MovieInfo = ({movieDB, movieOverview, moviePoster}) => {
    console.log(movieDB);
    var youtubeId,videoLink,thumbnail;
    youtubeId = movieDB.id.videoId;
    thumbnail = movieDB.snippet.thumbnails.high.url;
    videoLink = "https://www.youtube.com/embed/"+youtubeId+"?autoplay=1&mute=0&controls=0&origin=http%3A%2F%2Flocalhost%3A3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0&playlist="+youtubeId+"&color=white&loop=1&enablejsapi=1&widgetid=1";
    
    return (
        <div className = "player-wrapper-info-tab">
            <iframe src= {videoLink}
                    frameBorder="0"
                    className="react-player-info-tab"
                    allowFullScreen>
            </iframe>
        </div>
    )
}

export default MovieInfo