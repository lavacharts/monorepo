/// <reference types="google.visualization" />
import type { QueryTransformer } from "./google";
export declare type OneOrArrayOf<T> = T | T[];
export interface DataQueryOptions {
    url: string;
    opts: google.visualization.QueryOptions;
    transformer?: QueryTransformer;
}
export interface RangeQuery {
    sheetId: string;
    range: string;
}
