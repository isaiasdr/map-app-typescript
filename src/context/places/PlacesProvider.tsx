import { useEffect, useReducer } from 'react';
import { searchApi } from '../../apis';
import { getUserLocation } from '../../helpers';

import { PlacesContext, placesReducer } from './';

import { Feature, PlacesResponse } from '../../interfaces/places';

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [ number, number ];
    isLoadingPlaces: boolean;
    places: Feature[];
};

const PLACES_INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
};

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({ children }: Props) => {

const [ state, dispatch ] = useReducer( placesReducer, PLACES_INITIAL_STATE );

    useEffect(() => {
        getUserLocation()
            .then( coords => dispatch({ type: '[Places] - Set User Location', payload: coords }) )
    }, []);

    const searchPlacesByTerm = async( query: string ): Promise<Feature[]> => {
        if ( query.length === 0 ) {
            dispatch({
                type: '[Places] - Set Places',
                payload: []
            });

            return [];
        }

        if ( !state.userLocation ) throw new Error('No hay ubicacion del usuario');

        dispatch({ type: '[Places] - Set Loading Places' });

        const resp = await searchApi.get<PlacesResponse>(`/${ query }.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        dispatch({
            type: '[Places] - Set Places',
            payload: resp.data.features
        });

        return resp.data.features;
    }

    return (
        <PlacesContext.Provider value = {{
            ...state,

            //methods
            searchPlacesByTerm,
        }}>
            { children }
        </PlacesContext.Provider>
    );
};