/// <reference types="google.visualization" />
import { Chart } from "../Chart";
import { Dashboard } from "../Dashboard";
import type { GoogleLoaderOptions } from "../types";
export declare class GoogleLoader {
    /**
     * Version of the Google charts API to load
     */
    static API_VERSION: string;
    /**
     * Url to Google's static loader
     */
    static LOADER_URL: string;
    /**
     * Observable prop for when the library is ready to draw charts
     */
    googleReady: boolean;
    /**
     * Packages to load
     */
    packages: Set<string>;
    /**
     * Language to load
     */
    private language;
    /**
     * API Key if using GeoCharts
     */
    private mapsApiKey;
    /**
     * Create a new instance of the GoogleLoader
     *
     * @param options LavaJsOptions
     */
    constructor({ language, mapsApiKey }: GoogleLoaderOptions);
    toggleGoogleReady(): void;
    /**
     * Flag that will be true once window.google is available in page.
     */
    get googleIsDefined(): boolean;
    /**
     * Flag that will be true once Google's Static Loader is in page.
     */
    get scriptTagInPage(): boolean;
    /**
     * Get the options for the google loader.
     */
    get config(): GoogleLoaderOptions;
    /**
     * Extract and register the package needed to draw the chart.
     */
    register(drawable: Chart | Dashboard): void;
    /**
     * Load the Google Static Loader and resolve the promise when ready.
     */
    loadGoogle(): Promise<typeof google>;
}
