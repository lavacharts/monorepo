/// <reference types="google.visualization" />
export declare type Google = typeof google;
export declare type GoogleHandler = (google: Google) => void;
export interface GoogleReadyHandler {
    googleReady: GoogleHandler;
}
export declare type QueryTransformer = (query: google.visualization.Query) => google.visualization.Query;
export interface DataQueryInterface {
    url: string;
    opts?: google.visualization.QueryOptions;
    transformer?: QueryTransformer;
}
export declare type DataQueryFactory = (payload: DataQueryInterface) => google.visualization.Query;
export interface GoogleLoaderOptions {
    language?: string;
    packages?: string[];
    mapsApiKey?: string;
}
