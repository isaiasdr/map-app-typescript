import { FC, useReducer, useContext, useEffect } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';

import { MapContext, mapReducer } from './';
import { PlacesContext } from '../places/PlacesContext';
import { directionsApi } from '../../apis';
import { DirectionsResponse } from '../../interfaces/directions';


export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];

};

const MAP_INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
};

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const MapProvider: FC<Props> = ({ children }) => {

const [ state, dispatch ] = useReducer( mapReducer, MAP_INITIAL_STATE );

    const { places } = useContext( PlacesContext );

    useEffect(() => {
        if ( state.map ) {
            state.markers.forEach( marker => marker.remove() );
            const newMakers: Marker[] = [];

            for (const place of places) {
                const [ lng, lat ] = place.center;

                const popup = new Popup()
                    .setHTML(`
                        <h6>${ place.text_es }</h6>
                        <p>${ place.place_name_es }</p>
                    `);

                const newMarker = new Marker()
                    .setPopup( popup )
                    .setLngLat([ lng, lat ])
                    .addTo( state.map )

                newMakers.push( newMarker );
            }

            dispatch({
                type: '[Map] - Set Markers',
                payload: newMakers
            });
        }

        //Todo: limpiar poliline
        
    }, [ places ]);

    const setMap = ( map: Map ) => {

        const myLocationPopup = new Popup()
            .setHTML(`
            <h4>Aqui ando</h4>
            <p>segun esto</p>
            `);

        new Marker()
            .setLngLat( map.getCenter() )
            .setPopup( myLocationPopup )
            .addTo( map );

        dispatch({
            type: '[Map] - Set Map',
            payload: map
        });
    };

    const getRouteBetweenPoints = async ( start: [ number, number ], end: [ number, number ] ) => {
        const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
        const { distance, duration, geometry } = resp.data.routes[0];

        const { coordinates: coords } = geometry;

        let kms = distance / 1000;
            kms = Math.round( kms * 100 );
            kms /= 100;

        const minutes = Math.floor( duration / 60 );

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords) {
            const newCoord: [ number, number ] = [ coord[0], coord[1] ];
            bounds.extend( newCoord );
        }

        state.map?.fitBounds( bounds, {
            padding: 200
        });

        //polyline

        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: coords
                }
            }
        }

        if ( state.map?.getLayer( 'RouteString' ) ) {
            state.map?.removeLayer( 'RouteString' );
            state.map?.removeSource( 'RouteString' );
        }

        state.map?.addSource( 'RouteString', sourceData );
        state.map?.addLayer({ 
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        });
    };

    return (
        <MapContext.Provider value = {{
            ...state,

            //methods
            setMap,
            getRouteBetweenPoints
        }}>
            { children }
        </MapContext.Provider>
    );
};