import { Binding } from "./Binding";
import { Chart } from "./Chart";
import { Dashboard } from "./Dashboard";
import { GoogleLoader } from "./lib/GoogleLoader";
import type { ChartSpec, ChartWrapperSpec, ControlWrapperSpec, DashboardSpec, LavaJsOptions, OneOrArrayOf } from "./types";
/**
 * LavaJs - Google Chart API
 *
 * This module can be used as a standalone, browser based library, or in
 * conjunction with the PHP library Lavacharts
 *
 * @link https://github.com/kevinkhill/lavacharts
 */
export default class LavaJs {
    /** Default options for the library */
    static defaults: LavaJsOptions;
    /** Configurable options for the library */
    options: LavaJsOptions;
    /** Flag for when `window.google !== undefined` */
    googleReady: boolean;
    /** Flag for when `document.readyState === "complete"` */
    domReady: boolean;
    /** Flag for when all resources are loaded to draw */
    readyToDraw: boolean;
    /** Chart registry */
    readonly registry: Record<string, Chart | Dashboard>;
    /** Loader for adding the google script and making `window.google` available */
    private readonly loader;
    /**
     * Create a new instance of the LavaJs library
     *
     * When creating an instance of LavaJs, the default behavior is
     * to check if `window.google !== undefined` and if so, then we
     * start the [[GoogleLoader]].
     *
     * The [[GoogleLoader]] will check the <head> for the
     * google static loader and if not found, inject it into the <head>.
     *
     * @emits [[Events.GOOGLE_READY]]
     * @emits [[Events.DRAW]]
     */
    constructor(options?: Partial<LavaJsOptions>);
    toggleDomReady(): void;
    toggleReadyToDraw(): void;
    /**
     * Get the instance of the GoogleLoader
     */
    getLoader(): GoogleLoader;
    /**
     * Get the value of an option from the library
     */
    getOption<T extends keyof LavaJsOptions>(option: T): LavaJsOptions[T];
    /**
     * Override the default options of the module.
     */
    configure(options: LavaJsOptions): this;
    /**
     * Wait for the DOM to be ready then draw ^_^
     *
     * If passed a single chart object, then you can skip the `lava.chart()`
     * call and draw a chart with only one method call!
     *
     * You can even pass an array of chart objects!!
     *
     * @emits [[Events.DRAW]]
     */
    draw(): Promise<void>;
    /**
     * Create a new [[Chart]] from an Object
     */
    chart(payload: ChartSpec<any>): Chart;
    /**
     * Create multiple [[Chart]]s from an array of Objects
     */
    charts(charts: ChartSpec[]): void;
    /**
     * Create a new [[Dashboard]] from an Object
     */
    dashboard(payload: DashboardSpec): Dashboard;
    /**
     * Create [[Dashboard]] [[Binding]]s
     *
     * Depending on the parameters, 4 different bindings can be produced:
     * - bind(control  , chart  ) => OneToOne Binding
     * - bind(control[], chart  ) => ManyToOne Binding
     * - bind(control  , chart[]) => OneToMany Binding
     * - bind(control[], chart[]) => ManyToMany Binding
     */
    bind(controlWraps: OneOrArrayOf<ControlWrapperSpec>, chartWraps: OneOrArrayOf<ChartWrapperSpec>): Binding;
    /**
     * Create an empty [[Binding]] to use as a builder.
     *
     * The binding provides the methods which both return `this` for chaining
     *  - addChart() to push a chartWrapper into the binding
     *  - addControl() to push a controlWrapper into the binding
     *
     *  @example ```
     * const oneToOneBinding = lava.binding().addControl({}).addChart({});
     * ```
     */
    binding(): Binding;
    /**
     * Register a [[Drawable]] with the module.
     *
     * The registry keeps a record of all created charts, which enables
     * the event firing through the common interface of `window.lava`
     */
    private register;
    /**
     * Attach a listener to the window resize event for redrawing the charts.
     */
    private attachResizeHandler;
}
export declare const lava: LavaJs;
