import { Feature } from '../../interfaces/places';
import { PlacesState } from './';

type PlacesActionType = 
| { type: '[Places] - Set User Location', payload: [number, number] }
| { type: '[Places] - Set Loading Places' }
| { type: '[Places] - Set Places', payload: Feature[] }

export const placesReducer = ( state: PlacesState, action: PlacesActionType ): PlacesState => {

    switch (action.type) {
        case '[Places] - Set User Location':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            };

        case '[Places] - Set Places':
            return {
                ...state,
                isLoadingPlaces: false,
                places: action.payload
            };

        case '[Places] - Set Loading Places':
            return {
                ...state,
                isLoadingPlaces: false,
                places: []
            }

        default:
            return state;
    };
};