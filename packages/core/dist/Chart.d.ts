import { Drawable } from "./Drawable";
import type { ChartClasses, ChartSpec, ChartTypes } from "./types";
export declare class Chart extends Drawable {
    /**
     * If this is set to true, then the [[Chart]]
     * will be drawn and converted to a PNG
     */
    png: boolean;
    /** The google.visualization type */
    readonly type: ChartTypes;
    /** Static creation method */
    static create(chart: ChartSpec): Chart;
    constructor(chart: ChartSpec);
    /**
     * Get the Google Class for creating a new {@link Chart} instance
     */
    getGoogleConstructor(): ChartClasses;
    /**
     * Draw the chart
     */
    draw(): Promise<void>;
    /**
     * Draws the chart as a PNG instead of the standard SVG
     *
     * @see https://developers.google.com/chart/interactive/docs/printing
     */
    private replaceWithPng;
}
