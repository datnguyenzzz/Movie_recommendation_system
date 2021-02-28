import axios from 'axios';

const KEY = "AIzaSyDzc3aM11JkYpf5ekgCc2bgP_Z0DkFr2yc";

export default axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3/',
    params : {
        part : 'snippet',
        maxResults : 1,
        key : KEY
    }
})