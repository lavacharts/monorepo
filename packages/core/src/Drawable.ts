import { DataQuery } from "./DataQuery";
import { createDataTable } from "./lib/datatable";
import {
  getContainer,
  instanceOfRangeQuery,
  makeDebugger,
  newGoogleClass
} from "./lib/utils";

import type {
  ChartEvents,
  ChartUpdateReturn,
  ConsoleLog,
  DrawableSpec,
  Formatter,
  OptionDataPayload,
  UnknownObject
} from "./types";

/**
 * Base class for [[Chart]]s and [[Dashboard]]s
 */
export abstract class Drawable {
  /**
   * Configurable options
   */
  public options: UnknownObject = {};

  /**
   * DataTable for the [[Drawable]]
   */
  public data!: google.visualization.DataTable;

  /**
   * Google chart object created once the [[Drawable]] has been rendered
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public googleChart!: any;

  /**
   * Unique identifier for the [[Drawable]]
   */
  public get id(): string {
    return `${this.type}::${this.label}`;
  }

  /**
   * Element ID of the DOM node for the container
   */
  public readonly containerId: string;

  /**
   * Unique label for the [[Drawable]]
   */
  public readonly label: string;

  /**
   * Type of [[Drawable]]
   */
  public readonly type: DrawableSpec["type"];

  /**
   * Formatters for the DataTable
   */
  protected formats: Formatter[] = [];

  /**
   * Event listeners for the Drawable
   */
  protected events: Partial<Record<ChartEvents, CallableFunction>> = {};

  /**
   * The initial source of data for the DataTable
   */
  protected initialData?: DataQuery | unknown[] | UnknownObject;

  protected debug: ConsoleLog;

  abstract getGoogleConstructor(): string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(drawable: DrawableSpec<any>) {
    this.containerId = drawable.containerId;
    this.type = drawable.type || "Dashboard";

    if ("label" in drawable) {
      this.label = drawable.label;
    } else {
      this.label = this.containerId;
    }

    if (instanceOfRangeQuery(drawable.data)) {
      this.initialData = DataQuery.createFromSheetRange(drawable.data);
    } else {
      this.initialData = drawable.data;
    }

    if (drawable.options) {
      this.options = drawable.options;
    }

    if (drawable.events) {
      this.events = drawable.events;
    }

    if (drawable.formats) {
      this.formats = drawable.formats;
    }

    this.debug = makeDebugger(`${this.id}`);
  }

  async handleGoogle(): Promise<void> {
    const google = window.google;

    const chartClass = this.getGoogleConstructor();
    const container = getContainer(this);

    this.googleChart = newGoogleClass(google, chartClass, container);

    if (this.formats) {
      this.applyFormats();
    }

    const definedEvents = Object.keys(this.events) as ChartEvents[];

    definedEvents.forEach(eventType => {
      const { addListener } = google.visualization.events;
      const handler = this.events[eventType];

      if (typeof handler === "function") {
        addListener(this.googleChart, eventType, (event: unknown) => {
          handler({
            event,
            $this: this,
            data: this.data,
            chart: this.googleChart
          });
        });
      }
    });
  }

  /**
   * Draws the [[Drawable]] with the predefined data and options.
   */
  public async draw(): Promise<void> {
    this.debug(`in super.draw()`);

    await this.handleGoogle();

    if ("initialData" in this) {
      await this.processInitialData();
    }

    if (this.formats) {
      this.applyFormats();
    }

    this.googleChart.draw(this.data, this.options);
  }

  /**
   * Overriding the `on()` method from [[TinyEmitter]] to
   * register the handlers to our own map.
   */
  public on(event: ChartEvents, handler: () => unknown, ctx?: unknown): this {
    this.debug(`Attaching <${event}> handler`);

    if (ctx) {
      // eslint-disable-next-line no-param-reassign
      handler = handler.bind(ctx);
    }

    this.events[event] = handler;

    return this;
  }

  /**
   * Sugar method for setting options via string reference
   */
  public async set(
    optionRef: string,
    value: unknown
  ): Promise<ChartUpdateReturn> {
    // if (optionRef.includes(".")) {
    //   const options = optionRef.split(".");
    // }

    const payload = {
      [optionRef]: value
    };

    this.updateOptions(payload);

    return {
      data: this.data,
      chart: this.googleChart,
      options: this.options
    };
  }

  /**
   * Sugar method for updating the chart's data directly
   */
  public async updateData(
    payload: UnknownObject,
    autoRedraw = true
  ): Promise<ChartUpdateReturn> {
    return this.update({ data: payload }, autoRedraw);
  }

  /**
   * Sugar method for updating the chart's options directly
   */
  public updateOptions(
    payload: UnknownObject,
    autoRedraw = true
  ): Promise<ChartUpdateReturn> {
    return this.update({ options: payload }, autoRedraw);
  }

  /**
   * Plumbing method Update a chart's options and/or data
   *
   * The chart will redraw if the `autoRedraw` option is set.
   * default: `true`
   */
  public async update(
    { data, options }: OptionDataPayload,
    autoRedraw = true
  ): Promise<ChartUpdateReturn> {
    if (typeof options !== "undefined") {
      this.debug("Setting options", options);
      this.options = Object.assign(this.options, options);
    }

    if (typeof data !== "undefined") {
      this.debug("Setting data", data);
      this.setData(data);
    }

    if (autoRedraw === true) {
      await this.draw();
    }

    return {
      data: this.data,
      chart: this.googleChart,
      options: this.options
    };
  }

  /**
   * Apply the formats to the DataTable
   */
  public applyFormats(formats?: Formatter[]): void {
    if (formats) {
      this.formats = formats;
    }

    for (const format of this.formats) {
      const formatter = new window.google.visualization[format.type](
        format.options
      );

      this.debug(`Formatting column [${format.index}]`, format);

      formatter.format(this.data, format.index);
    }
  }

  /**
   * Send the [[DataQuery]] if it is one, otherwise create a DataTable
   */
  protected async processInitialData(): Promise<void> {
    this.debug("Setting initial data", this.initialData);

    if (typeof this.initialData !== "undefined") {
      const data =
        typeof this.initialData === "string"
          ? new DataQuery(this.initialData)
          : this.initialData;

      await this.setData(data);

      delete this.initialData;
    }
  }

  /**
   * Sets the [[DataTable]] for the [[Drawable]].
   */
  protected async setData(
    payload: Parameters<typeof createDataTable>[0]
  ): Promise<void> {
    this.data = await createDataTable(payload);

    /**
     * Instead of checking and re-throwing, lets let Google fail...
     *
     * @TODO does this work?
     */
    // if (this.data instanceof google.visualization.DataTable === false) {
    //   throw new Error(`There was a error setting the data for ${this.id}`);
    // }

    if (payload.formats) {
      this.applyFormats(payload.formats);
    }
  }
}
