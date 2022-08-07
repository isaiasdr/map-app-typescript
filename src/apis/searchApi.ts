import axios from 'axios';

const access_token = process.env.REACT_APP_MAPBOX_CREDENTIALS || '';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        language: 'es',
        access_token
    }
});

export default searchApi;