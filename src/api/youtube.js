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