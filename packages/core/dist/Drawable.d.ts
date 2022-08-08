/// <reference types="google.visualization" />
import { DataQuery } from "./DataQuery";
import { createDataTable } from "./lib/datatable";
import type { ChartEvents, ChartUpdateReturn, ConsoleLog, DrawableSpec, Formatter, OptionDataPayload, UnknownObject } from "./types";
/**
 * Base class for [[Chart]]s and [[Dashboard]]s
 */
export declare abstract class Drawable {
    /**
     * Configurable options
     */
    options: UnknownObject;
    /**
     * DataTable for the [[Drawable]]
     */
    data: google.visualization.DataTable;
    /**
     * Google chart object created once the [[Drawable]] has been rendered
     */
    googleChart: any;
    /**
     * Unique identifier for the [[Drawable]]
     */
    get id(): string;
    /**
     * Element ID of the DOM node for the container
     */
    readonly containerId: string;
    /**
     * Unique label for the [[Drawable]]
     */
    readonly label: string;
    /**
     * Type of [[Drawable]]
     */
    readonly type: DrawableSpec["type"];
    /**
     * Formatters for the DataTable
     */
    protected formats: Formatter[];
    /**
     * Event listeners for the Drawable
     */
    protected events: Partial<Record<ChartEvents, CallableFunction>>;
    /**
     * The initial source of data for the DataTable
     */
    protected initialData?: DataQuery | unknown[] | UnknownObject;
    protected debug: ConsoleLog;
    abstract getGoogleConstructor(): string;
    constructor(drawable: DrawableSpec<any>);
    handleGoogle(): Promise<void>;
    /**
     * Draws the [[Drawable]] with the predefined data and options.
     */
    draw(): Promise<void>;
    /**
     * Overriding the `on()` method from [[TinyEmitter]] to
     * register the handlers to our own map.
     */
    on(event: ChartEvents, handler: () => unknown, ctx?: unknown): this;
    /**
     * Sugar method for setting options via string reference
     */
    set(optionRef: string, value: unknown): Promise<ChartUpdateReturn>;
    /**
     * Sugar method for updating the chart's data directly
     */
    updateData(payload: UnknownObject, autoRedraw?: boolean): Promise<ChartUpdateReturn>;
    /**
     * Sugar method for updating the chart's options directly
     */
    updateOptions(payload: UnknownObject, autoRedraw?: boolean): Promise<ChartUpdateReturn>;
    /**
     * Plumbing method Update a chart's options and/or data
     *
     * The chart will redraw if the `autoRedraw` option is set.
     * default: `true`
     */
    update({ data, options }: OptionDataPayload, autoRedraw?: boolean): Promise<ChartUpdateReturn>;
    /**
     * Apply the formats to the DataTable
     */
    applyFormats(formats?: Formatter[]): void;
    /**
     * Send the [[DataQuery]] if it is one, otherwise create a DataTable
     */
    protected processInitialData(): Promise<void>;
    /**
     * Sets the [[DataTable]] for the [[Drawable]].
     */
    protected setData(payload: Parameters<typeof createDataTable>[0]): Promise<void>;
}
