/// <reference types="google.visualization" />
import type { QueryTransformer, RangeQuery } from "./types";
/**
 * Used for loading remote data as a {@link DataTable}
 *
 * @see https://developers.google.com/chart/interactive/docs/reference#Query
 */
export declare class DataQuery {
    url: string;
    opts: google.visualization.QueryOptions;
    transformer?: QueryTransformer | undefined;
    /**
     * Compose a DataQuery based on a URL to a Google Sheet
     *
     * Pass a Google Sheet ID and range in A1 notation
     * to create a URL to use with a [[DataQuery]]
     */
    static createFromSheetRange({ sheetId, range }: RangeQuery): DataQuery;
    /**
     * Create a new DataQuery for a DataTable
     *
     * @throws {Error}
     */
    constructor(url: string, opts?: google.visualization.QueryOptions, transformer?: QueryTransformer | undefined);
    /**
     * Send the query and fetch the DataTable
     */
    getDataTable(): Promise<google.visualization.DataTable>;
    /**
     * Send the DataQuery
     */
    send(): Promise<google.visualization.QueryResponse>;
}
