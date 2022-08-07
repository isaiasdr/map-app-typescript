import { Map, Marker } from 'mapbox-gl';
import { MapState } from './'

type MapActionType = 
| { type: '[Map] - Set Map', payload: Map }
| { type: '[Map] - Set Markers', payload: Marker[] }

export const mapReducer = ( state: MapState, action: MapActionType ): MapState => {

    switch (action.type) {
        case '[Map] - Set Map': 
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            };

        case '[Map] - Set Markers':
            return {
                ...state,
                markers: action.payload
            };

        default:
            return state;
    };
};