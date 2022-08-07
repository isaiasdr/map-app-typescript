import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';

import { MapsApp } from './MapsApp';

mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhaWFzZHIiLCJhIjoiY2w2Z3drdXA2MDBmYjNpcnhna285aGRoNCJ9.Y1wGTGYHew6a55dtF16zyw';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if( !navigator.geolocation ) {
  alert('Browser has no option of geolocation');
  throw new Error('Browser has no option of geolocation');
}

root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);