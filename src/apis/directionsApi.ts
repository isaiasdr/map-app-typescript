import axios from 'axios';

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiaXNhaWFzZHIiLCJhIjoiY2w2Z3drdXA2MDBmYjNpcnhna285aGRoNCJ9.Y1wGTGYHew6a55dtF16zyw'
    }
});

export default directionsApi;