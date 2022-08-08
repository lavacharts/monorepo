import { ChartSpec } from "./drawables";
import { ChartWrapperSpec, ControlWrapperSpec } from "./wrapper";

export type ConsoleLog = typeof console.log;

export type UnknownObject = Record<string, unknown>;


export type BindingTuple = [ControlWrapperSpec, ChartWrapperSpec];

export type SupportedFormatters = "NumberFormat" | "DateFormat";

export interface ScriptElement extends HTMLScriptElement {
  readyState: string;
  onreadystatechange: ((event: Event) => void) | null;
}

export interface OptionDataPayload {
  data?: unknown;
  options?: Record<string, unknown>;
}

export interface Formatter {
  index: number;
  options: Record<string, unknown>;
  type: SupportedFormatters;
}

export interface LavaJsOptions {
  autodraw: boolean;
  autoloadGoogle: boolean;
  chartPackages: string[];
  datetimeFormat: string;
  debounceTimeout: number;
  debug: boolean;
  language: string;
  mapsApiKey: string;
  responsive: boolean;
  timezone: string;
}
