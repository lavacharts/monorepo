"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AnnotationChart: () => AnnotationChart,
  AreaChart: () => AreaChart,
  BarChart: () => BarChart,
  BubbleChart: () => BubbleChart,
  CalendarChart: () => CalendarChart,
  CandlestickChart: () => CandlestickChart,
  ColumnChart: () => ColumnChart,
  ComboChart: () => ComboChart,
  DonutChart: () => DonutChart,
  GanttChart: () => GanttChart,
  GaugeChart: () => GaugeChart,
  GeoChart: () => GeoChart,
  HistogramChart: () => HistogramChart,
  LavaJs: () => LavaJs,
  LineChart: () => LineChart,
  PieChart: () => PieChart,
  SankeyChart: () => SankeyChart,
  ScatterChart: () => ScatterChart,
  SteppedAreaChart: () => SteppedAreaChart,
  TableChart: () => TableChart,
  TimelineChart: () => TimelineChart,
  TreeMapChart: () => TreeMapChart,
  WordTreeChart: () => WordTreeChart,
  lava: () => lava
});
module.exports = __toCommonJS(src_exports);

// src/LavaJs.ts
var import_mobx2 = require("mobx");

// src/lib/utils.ts
function box(data) {
  return Array.isArray(data) ? data : [data];
}
function instanceOfRangeQuery(object) {
  return (object == null ? void 0 : object.sheetId) && (object == null ? void 0 : object.range);
}
function instanceOfDataQuery(object) {
  return (object == null ? void 0 : object.send) && (object == null ? void 0 : object.getDataTable);
}
function instanceOfDashboard(object) {
  return (object == null ? void 0 : object.draw) && (object == null ? void 0 : object.bindings);
}
function getContainer({ id, containerId }) {
  const container = document.getElementById(containerId);
  if (container === null) {
    throw new Error(
      `${id} tried to render into the target element "${containerId}", but this was not found in page.`
    );
  }
  return container;
}
function makeDebugger(ns) {
  return (...rest) => console.log(`[LAVAJS] (${ns}):`, ...rest);
}
async function domReady() {
  return new Promise((resolve) => {
    if (["interactive", "complete"].includes(document.readyState)) {
      resolve();
    } else {
      document.addEventListener("DOMContentLoaded", () => resolve());
    }
  });
}
var newGoogleClass = (googleInstance, className, ...restArgs) => {
  const { visualization } = googleInstance;
  const googleClass = visualization[className];
  if (restArgs) {
    return new googleClass(...restArgs);
  } else {
    return new googleClass();
  }
};
function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(), delay);
  };
}

// src/Binding.ts
var Binding = class {
  controlWraps = [];
  chartWraps = [];
  static create(controlWraps, chartWraps) {
    return new Binding(controlWraps, chartWraps);
  }
  get type() {
    const manyControlWraps = Array.isArray(this.controlWraps);
    const oneControlWrap = !manyControlWraps;
    const manyChartWraps = Array.isArray(this.chartWraps);
    const oneChartWrap = !manyChartWraps;
    if (oneControlWrap && oneChartWrap)
      return "OneToOne";
    else if (oneControlWrap && manyChartWraps)
      return "OneToMany";
    else if (manyControlWraps && oneChartWrap)
      return "ManyToOne";
    else
      return "ManyToMany";
  }
  constructor(controlWraps, chartWraps) {
    if (controlWraps) {
      this.controlWraps.push(...box(controlWraps));
    }
    if (chartWraps) {
      this.chartWraps.push(...box(chartWraps));
    }
  }
  addControl(controlDef) {
    this.controlWraps.push(controlDef);
    return this;
  }
  addChart(chartDef) {
    this.chartWraps.push(chartDef);
    return this;
  }
  async getControlWraps() {
    const google = await lava.getLoader().loadGoogle();
    if (this.controlWraps.length === 1) {
      return newGoogleClass(google, "ControlWrapper", ...this.controlWraps);
    }
    return Promise.all(
      this.controlWraps.map(
        (control) => newGoogleClass(google, "ControlWrapper", control)
      )
    );
  }
  async getChartWraps() {
    const google = await lava.getLoader().loadGoogle();
    if (this.chartWraps.length === 1) {
      return newGoogleClass(google, "ChartWrapper", ...this.chartWraps);
    }
    return Promise.all(
      this.chartWraps.map(
        (chart) => newGoogleClass(google, "ChartWrapper", chart)
      )
    );
  }
};

// src/ChartProps.ts
var CHART_PROPS = {
  AnnotationChart: ["AnnotationChart", "annotationchart", 1],
  AreaChart: ["AreaChart", "corechart", 1],
  BarChart: ["BarChart", "corechart", 1],
  BubbleChart: ["BubbleChart", "corechart", 1],
  CalendarChart: ["Calendar", "calendar", 1],
  CandlestickChart: ["CandlestickChart", "corechart", 1],
  ColumnChart: ["ColumnChart", "corechart", 1],
  ComboChart: ["ComboChart", "corechart", 1],
  DonutChart: ["PieChart", "corechart", 1],
  GanttChart: ["Gantt", "gantt", 1],
  GaugeChart: ["Gauge", "gauge", 1],
  GeoChart: ["GeoChart", "geochart", 1],
  HistogramChart: ["Histogram", "corechart", 1],
  LineChart: ["LineChart", "corechart", 1],
  PieChart: ["PieChart", "corechart", 1],
  SankeyChart: ["Sankey", "sankey", 1],
  ScatterChart: ["ScatterChart", "corechart", 1],
  SteppedAreaChart: ["SteppedAreaChart", "corechart", 1],
  TableChart: ["Table", "table", 1],
  TimelineChart: ["Timeline", "timeline", 1],
  TreeMapChart: ["TreeMap", "treemap", 1],
  WordTreeChart: ["WordTree", "wordtree", 1]
};
function getChartClass(chart) {
  return CHART_PROPS[chart.type][0 /* CLASS */];
}
function getChartPackage(chart) {
  return CHART_PROPS[chart.type][1 /* PACKAGE */];
}

// src/DataQuery.ts
var debug = makeDebugger("DataQuery");
var DataQuery = class {
  constructor(url, opts = { sendMethod: "auto" }, transformer) {
    this.url = url;
    this.opts = opts;
    this.transformer = transformer;
    this.url = url;
    this.opts = opts;
    if (transformer) {
      this.transformer = transformer;
    }
  }
  static createFromSheetRange({
    sheetId,
    range
  }) {
    const base = "https://docs.google.com/spreadsheets/d";
    return new DataQuery(`${base}/${sheetId}/gviz/tq?range=${range}`);
  }
  async getDataTable() {
    debug("Sending DataQuery");
    const response = await this.send();
    debug("Response received");
    debug(response);
    return response.getDataTable();
  }
  async send() {
    const google = await lava.getLoader().loadGoogle();
    let query = await newGoogleClass(google, "Query", this.url, this.opts);
    if (this.transformer) {
      query = this.transformer(query);
    }
    return new Promise((resolve, reject) => {
      debug(`Requesting ${this.url}`);
      query.send((response) => {
        if (response.isError()) {
          reject(response);
        }
        resolve(response);
      });
    });
  }
};

// src/lib/datatable.ts
async function createDataTable(payload) {
  const google = await lava.getLoader().loadGoogle();
  if (instanceOfDataQuery(payload)) {
    return payload.getDataTable();
  }
  if (typeof payload === "function") {
    const emptyTable = await newGoogleClass(google, "DataTable");
    return payload(emptyTable);
  }
  if (Array.isArray(payload)) {
    return google.visualization.arrayToDataTable(payload);
  }
  if (typeof payload.getTableProperties === "function") {
    return payload;
  }
  if ("data" in payload) {
    if (Array.isArray(payload.data)) {
      return google.visualization.data.join(
        newGoogleClass(google, "DataTable", payload.data[0]),
        newGoogleClass(google, "DataTable", payload.data[1]),
        payload.keys,
        payload.joinMethod,
        payload.dt1Columns,
        payload.dt2Columns
      );
    }
    if (typeof payload.data === "object") {
      payload = payload.data;
    }
  }
  return newGoogleClass(google, "DataTable", payload);
}

// src/Drawable.ts
var Drawable = class {
  options = {};
  data;
  googleChart;
  get id() {
    return `${this.type}::${this.label}`;
  }
  containerId;
  label;
  type;
  formats = [];
  events = {};
  initialData;
  debug;
  constructor(drawable) {
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
  async handleGoogle() {
    const google = window.google;
    const chartClass = this.getGoogleConstructor();
    const container = getContainer(this);
    this.googleChart = newGoogleClass(google, chartClass, container);
    if (this.formats) {
      this.applyFormats();
    }
    const definedEvents = Object.keys(this.events);
    definedEvents.forEach((eventType) => {
      const { addListener } = google.visualization.events;
      const handler = this.events[eventType];
      if (typeof handler === "function") {
        addListener(this.googleChart, eventType, (event) => {
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
  async draw() {
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
  on(event, handler, ctx) {
    this.debug(`Attaching <${event}> handler`);
    if (ctx) {
      handler = handler.bind(ctx);
    }
    this.events[event] = handler;
    return this;
  }
  async set(optionRef, value) {
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
  async updateData(payload, autoRedraw = true) {
    return this.update({ data: payload }, autoRedraw);
  }
  updateOptions(payload, autoRedraw = true) {
    return this.update({ options: payload }, autoRedraw);
  }
  async update({ data, options }, autoRedraw = true) {
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
  applyFormats(formats) {
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
  async processInitialData() {
    this.debug("Setting initial data", this.initialData);
    if (typeof this.initialData !== "undefined") {
      const data = typeof this.initialData === "string" ? new DataQuery(this.initialData) : this.initialData;
      await this.setData(data);
      delete this.initialData;
    }
  }
  async setData(payload) {
    this.data = await createDataTable(payload);
    if (payload.formats) {
      this.applyFormats(payload.formats);
    }
  }
};

// src/Chart.ts
var Chart = class extends Drawable {
  png = false;
  type;
  static create(chart) {
    return new Chart(chart);
  }
  constructor(chart) {
    super(chart);
    this.type = chart.type;
    this.png = Boolean(chart.png);
  }
  getGoogleConstructor() {
    return getChartClass(this);
  }
  async draw() {
    await super.draw();
    if (this.png)
      this.replaceWithPng();
  }
  replaceWithPng() {
    const container = getContainer(this);
    const img = document.createElement("img");
    img.src = this.googleChart.getImageURI();
    container.innerHTML = "";
    container.appendChild(img);
  }
};

// src/Dashboard.ts
var Dashboard = class extends Drawable {
  bindings;
  needsBindings = true;
  constructor(payload) {
    super(payload);
    this.bindings = payload.bindings;
  }
  getGoogleConstructor() {
    return "Dashboard";
  }
  async draw() {
    if (this == null ? void 0 : this.initialData) {
      await this.processInitialData();
    }
    if (this.bindings.length > 0) {
      for (const binding of this.bindings) {
        this.googleChart.bind(
          await binding.getControlWraps(),
          await binding.getChartWraps()
        );
      }
    }
    this.googleChart.draw(this.data);
  }
};

// src/DefaultOptions.ts
var DefaultOptions = {
  autodraw: true,
  autoloadGoogle: true,
  chartPackages: ["corechart"],
  debounceTimeout: 500,
  debug: false,
  language: "en",
  mapsApiKey: "",
  responsive: true,
  timezone: "America/Los_Angeles"
};

// src/lib/GoogleLoader.ts
var import_mobx = require("mobx");

// src/lib/static-loader.ts
var debug2 = makeDebugger("StaticLoader");
async function injectStaticLoader(target) {
  if (typeof window.google !== "undefined") {
    debug2("window.google is defined; skipping script injection.");
    return;
  } else {
    debug2("building script tag for the static loader.");
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.defer = true;
      script.src = GoogleLoader.LOADER_URL;
      script.onload = script.onreadystatechange = (event) => {
        event = event || window.event;
        if (event.type === "load" || /loaded|complete/.test(script.readyState)) {
          script.onload = script.onreadystatechange = null;
          debug2("Google static loader is ready.");
          resolve();
        }
      };
      target.appendChild(script);
    });
  }
}

// src/lib/GoogleLoader.ts
var debug3 = makeDebugger("GoogleLoader");
var _GoogleLoader = class {
  googleReady = false;
  packages = /* @__PURE__ */ new Set(["corechart"]);
  language;
  mapsApiKey;
  constructor({ language = "en", mapsApiKey = "" }) {
    (0, import_mobx.makeObservable)(this, {
      googleReady: import_mobx.observable,
      toggleGoogleReady: import_mobx.action
    });
    this.language = language;
    this.mapsApiKey = mapsApiKey;
  }
  toggleGoogleReady() {
    this.googleReady = !this.googleReady;
  }
  get googleIsDefined() {
    return typeof window.google !== "undefined";
  }
  get scriptTagInPage() {
    const scripts = document.getElementsByTagName("script");
    return Array.from(scripts).map((script) => script.src).includes(_GoogleLoader.LOADER_URL);
  }
  get config() {
    const config = {
      language: this.language,
      packages: Array.from(this.packages)
    };
    if (this.mapsApiKey !== "") {
      config.mapsApiKey = this.mapsApiKey;
    }
    return config;
  }
  register(drawable) {
    if (instanceOfDashboard(drawable)) {
      this.packages.add("controls");
    } else {
      this.packages.add(getChartPackage(drawable));
    }
  }
  async loadGoogle() {
    debug3("Loading Google...");
    await injectStaticLoader(document.head);
    return new Promise((resolve) => {
      debug3(`Loading version "${_GoogleLoader.API_VERSION}"`, this.config);
      window.google.charts.load(_GoogleLoader.API_VERSION, this.config);
      window.google.charts.setOnLoadCallback(() => {
        debug3(`window.google is ready.`);
        this.toggleGoogleReady();
        resolve(window.google);
      });
    });
  }
};
var GoogleLoader = _GoogleLoader;
__publicField(GoogleLoader, "API_VERSION", "current");
__publicField(GoogleLoader, "LOADER_URL", "https://www.gstatic.com/charts/loader.js");

// src/LavaJs.ts
var debug4 = makeDebugger("MainInstance");
var LavaJs = class {
  options;
  googleReady = false;
  domReady = false;
  readyToDraw = false;
  registry = {};
  loader;
  constructor(options) {
    (0, import_mobx2.makeObservable)(this, {
      domReady: import_mobx2.observable,
      readyToDraw: import_mobx2.observable,
      toggleDomReady: import_mobx2.action,
      toggleReadyToDraw: import_mobx2.action
    });
    this.options = {
      ...DefaultOptions,
      ...options
    };
    debug4(`Initializing LavaJs`, this.options);
    this.loader = new GoogleLoader({ language: this.options.language });
    if (this.options.responsive === true) {
      this.attachResizeHandler();
    }
    if (this.options.autoloadGoogle) {
      (0, import_mobx2.reaction)(
        () => this.loader.googleIsDefined,
        () => {
          (0, import_mobx2.trace)();
          debug4("this.loader.googleIsDefined");
          this.toggleReadyToDraw();
        }
      );
      this.loader.loadGoogle();
    }
    const disposer = (0, import_mobx2.when)(
      () => this.loader.googleReady && this.domReady,
      () => {
        if (this.options.autodraw) {
          debug4("reacting to this.readyToDraw.");
          this.draw();
          disposer();
        }
      }
    );
    domReady().then(() => {
      debug4(`DOM Ready.`);
      this.toggleDomReady();
    });
  }
  toggleDomReady() {
    this.domReady = !this.domReady;
  }
  toggleReadyToDraw() {
    this.readyToDraw = !this.readyToDraw;
  }
  getLoader() {
    return this.loader;
  }
  getOption(option) {
    if (typeof this.options[option] === "undefined") {
      throw new Error(`${String(option)} is not a valid option`);
    }
    return this.options[option];
  }
  configure(options) {
    this.options = {
      ...this.options,
      ...options
    };
    return this;
  }
  async draw() {
    await domReady();
    Object.values(this.registry).forEach((chart) => {
      debug4(`Drawing ${chart.id}`);
      chart.draw();
    });
  }
  chart(payload) {
    const chart = new Chart(payload);
    debug4(`Registering ${chart.id}`);
    return this.register(chart);
  }
  charts(charts) {
    charts.forEach((def) => this.chart(def));
  }
  dashboard(payload) {
    const dashboard = new Dashboard(payload);
    return this.register(dashboard);
  }
  bind(controlWraps, chartWraps) {
    return Binding.create(controlWraps, chartWraps);
  }
  binding() {
    return new Binding();
  }
  register(drawable) {
    debug4(`Registering ${drawable.id} packages with the Google Loader`);
    this.loader.register(drawable);
    this.registry[drawable.id] = drawable;
    return drawable;
  }
  attachResizeHandler() {
    window.addEventListener(
      "resize",
      debounce(() => {
        debug4(`Window re-sized, redrawing...`);
        this.draw();
      }, this.options.debounceTimeout)
    );
  }
};
__publicField(LavaJs, "defaults", DefaultOptions);
var lava = new LavaJs();

// src/lib/chart-fns.ts
function AnnotationChart(config) {
  return lava.chart({ type: "AnnotationChart", ...config });
}
function AreaChart(config) {
  return lava.chart({ type: "AreaChart", ...config });
}
function BarChart(config) {
  return lava.chart({ type: "BarChart", ...config });
}
function BubbleChart(config) {
  return lava.chart({ type: "BubbleChart", ...config });
}
function CalendarChart(config) {
  return lava.chart({ type: "CalendarChart", ...config });
}
function CandlestickChart(config) {
  return lava.chart({ type: "CandlestickChart", ...config });
}
function ColumnChart(config) {
  return lava.chart({ type: "ColumnChart", ...config });
}
function ComboChart(config) {
  return lava.chart({ type: "ComboChart", ...config });
}
function DonutChart(config) {
  return lava.chart({ type: "DonutChart", ...config });
}
function GanttChart(config) {
  return lava.chart({ type: "GanttChart", ...config });
}
function GaugeChart(config) {
  return lava.chart({ type: "GaugeChart", ...config });
}
function GeoChart(config) {
  return lava.chart({ type: "GeoChart", ...config });
}
function HistogramChart(config) {
  return lava.chart({ type: "HistogramChart", ...config });
}
function LineChart(config) {
  return lava.chart({ type: "LineChart", ...config });
}
function PieChart(config) {
  return lava.chart({ type: "PieChart", ...config });
}
function SankeyChart(config) {
  return lava.chart({ type: "SankeyChart", ...config });
}
function ScatterChart(config) {
  return lava.chart({ type: "ScatterChart", ...config });
}
function SteppedAreaChart(config) {
  return lava.chart({ type: "SteppedAreaChart", ...config });
}
function TableChart(config) {
  return lava.chart({ type: "TableChart", ...config });
}
function TimelineChart(config) {
  return lava.chart({ type: "TimelineChart", ...config });
}
function TreeMapChart(config) {
  return lava.chart({ type: "TreeMapChart", ...config });
}
function WordTreeChart(config) {
  return lava.chart({ type: "WordTreeChart", ...config });
}
//# sourceMappingURL=index.js.map