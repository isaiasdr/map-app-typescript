import { useContext, useState } from 'react';
import { PlacesContext, MapContext } from '../context';
import { Feature } from '../interfaces/places';

import { LoadingPlaces } from './';


export const SearchResults = () => {

    const { isLoadingPlaces, places, userLocation } = useContext( PlacesContext );
    const { map, getRouteBetweenPoints } = useContext( MapContext );

    const [ activeId, setActiveId ] = useState('');

    const onPlaceClick = ( place: Feature ) => {

        const [ lng, lat ] = place.center;
        setActiveId( place.id );

        map?.flyTo({
            center: [ lng, lat ],
            zoom: 14
        });
    };

    const getRoute = ( place: Feature ) => {

        if ( !userLocation ) return;

        const [ lng, lat ] = place.center;

        getRouteBetweenPoints( userLocation, [ lng, lat ] );
    };

    if ( isLoadingPlaces )
        return <LoadingPlaces />;

    if ( places.length === 0 )
        return <></>;

    return (
        <ul className='list-group mt-3' style={{ overflowY: 'auto', height: '85vh' }}>
            {
                places.map( place => (
                    <li 
                        className={`${ activeId === place.id ? 'active' : '' } list-group-item list-group-item-action pointer`}
                        key={ place.id }
                        onClick={ () => onPlaceClick( place ) }
                    >
                        <h6> { place.text_es } </h6>

                        <p
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            { place.place_name }
                        </p>

                        <button
                            className={`btn btn-sm ${ activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary' } }`}
                            onClick={ () => getRoute(place) }
                        >
                            Direcciones
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}
