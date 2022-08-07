import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const BtnMyLocation = () => {

    const { map } = useContext( MapContext );
    const { userLocation } = useContext( PlacesContext );

    const onClick = () => {

        if ( !map ) throw new Error ('Map not ready');
        if ( !userLocation ) throw new Error ('user location not ready');

        map.flyTo({
            zoom: 14,
            center: userLocation
        });
    };

    return (
        <button
            className='btn btn-primary'
            onClick={ onClick }
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            Mi ubicacion
        </button>
    )
}
