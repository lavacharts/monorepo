/// <reference types="google.visualization" />
import { ChartWrapperSpec, ControlWrapperSpec } from "./types/wrapper";
import type { OneOrArrayOf } from "./types";
declare type BindingType = "OneToOne" | "OneToMany" | "ManyToOne" | "ManyToMany";
export declare class Binding {
    private controlWraps;
    private chartWraps;
    static create(controlWraps: OneOrArrayOf<ControlWrapperSpec>, chartWraps: OneOrArrayOf<ChartWrapperSpec>): Binding;
    get type(): BindingType;
    constructor(controlWraps?: ControlWrapperSpec | ControlWrapperSpec[], chartWraps?: ChartWrapperSpec | ChartWrapperSpec[]);
    addControl(controlDef: ControlWrapperSpec): this;
    addChart(chartDef: ChartWrapperSpec): this;
    getControlWraps(): Promise<google.visualization.ControlWrapper[]>;
    getChartWraps(): Promise<google.visualization.ChartWrapper[]>;
}
export {};
