import type { ChartEvents, ChartTypes } from "./chart";
import type { BindingTuple, Formatter, UnknownObject } from "./core";
import type { RangeQuery } from "./data";

/**
 * Generic Parameter for `options` type
 */
export interface DrawableSpec<T = unknown> {
  type: ChartTypes | "Dashboard";
  containerId: string;
  label: string;
  data: UnknownObject | RangeQuery | unknown[];
  options?: T;
  formats?: Formatter[];
  events?: Record<ChartEvents, CallableFunction>;
}

export interface ChartSpec<T = UnknownObject> extends DrawableSpec<T> {
  type: ChartTypes;
  png?: boolean;
}

export interface DashboardSpec<T = UnknownObject> extends DrawableSpec<T> {
  type: "Dashboard";
  bindings: BindingTuple[];
}

export type ChartSpecWithOptions<T> = Omit<ChartSpec<T>, "type">;
