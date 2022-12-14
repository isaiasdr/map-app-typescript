import { useContext, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';

import { PlacesContext, MapContext } from '../context';

import { Loading } from './';

export const MapView = () => {

    const { isLoading, userLocation } = useContext( PlacesContext );
    const { setMap } = useContext( MapContext );

    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if ( !isLoading ) {
            const map = new Map({
                container: mapDiv.current!,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: userLocation,
                zoom: 14,
            });

            setMap( map );
        }

    }, [ isLoading ]);

    if ( isLoading )
        return <Loading />;

    

    return (
        <div ref={ mapDiv } style={{ 
            height: '100vh',
            position: 'fixed',
            right: 0,
            top: 0,
            width: '100vw',
        }} />
    )
}
