export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:                   string;
    type:                 string;
    place_type:           string[];
    relevance:            number;
    properties:           Properties;
    text_es:              string;
    language_es?:         string;
    place_name_es:        string;
    text:                 string;
    language?:            string;
    place_name:           string;
    matching_text?:       string;
    matching_place_name?: string;
    bbox?:                number[];
    center:               number[];
    geometry:             Geometry;
    context:              Context[];
}

export interface Context {
    id:           string;
    text_es:      string;
    text:         string;
    short_code?:  string;
    wikidata?:    string;
    language_es?: Language;
    language?:    Language;
}

export enum Language {
    Es = "es",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    foursquare?: string;
    landmark?:   boolean;
    address?:    string;
    category?:   string;
    accuracy?:   string;
}
