import axios from 'axios';

import { CONFIGURES } from '../config';

const KEY = CONFIGURES.YOUTUBE_API_KEY;

export default axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3/',
    params : {
        part : 'snippet',
        maxResults : 1,
        key : KEY
    }
})

/*
const res = await youtube.get('/search', {
    params : {
        q : requestApi
    }
})

videoLink = "https://www.youtube.com/embed/"+youtubeId+
            "?cc_load_policy=3
             &autoplay=1
             &mute=0
             &controls=0
             &origin=http%3A%2F%2Flocalhost%3A3000
             &playsinline=1&showinfo=0&rel=0
             &iv_load_policy=3
             &modestbranding=0
             &playlist="+youtubeId+"
             &color=white&loop=1&enablejsapi=1&widgetid=1";
*/