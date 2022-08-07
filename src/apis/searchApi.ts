import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        language: 'es',
        access_token: 'pk.eyJ1IjoiaXNhaWFzZHIiLCJhIjoiY2w2Z3drdXA2MDBmYjNpcnhna285aGRoNCJ9.Y1wGTGYHew6a55dtF16zyw'
    }
});

export default searchApi;