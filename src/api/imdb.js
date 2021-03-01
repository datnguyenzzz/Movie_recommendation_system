import axios from 'axios';

import { CONFIGURES } from '../config';

export default axios.create({
    baseURL : "https://movie-database-imdb-alternative.p.rapidapi.com"
})