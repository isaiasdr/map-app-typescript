import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [ number, number ],
    isLoadingPlaces: boolean;
    places: Feature[];

    //methods
    searchPlacesByTerm: (query: string) => Promise<Feature[]>
};

export const PlacesContext = createContext( {} as PlacesContextProps );