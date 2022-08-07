import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';

import { MapsApp } from './MapsApp';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_CREDENTIALS || '';

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