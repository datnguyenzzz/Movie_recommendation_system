import axios from 'axios';

const KEY = "AIzaSyDxE7L19o-63BwtMXV8Yh1gRWkpzYYItoE";

export default axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3/',
    params : {
        part : 'snippet',
        maxResults : 1,
        key : KEY
    }
})