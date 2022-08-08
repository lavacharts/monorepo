/// <reference types="google.visualization" />
import type { Dashboard } from "../Dashboard";
import type { DataQuery } from "../DataQuery";
import type { Drawable } from "../Drawable";
import type { RangeQuery } from "../types";
/**
 * Wrapper for turning single items into arrays
 */
export declare function box<T>(data: T | T[]): T[];
export declare function instanceOfRangeQuery(object: any): object is RangeQuery;
export declare function instanceOfDataQuery(object: any): object is DataQuery;
export declare function instanceOfDashboard(object: any): object is Dashboard;
/**
 * Retrieve the container element from the document
 */
export declare function getContainer({ id, containerId }: Drawable): HTMLElement;
/**
 * Prefixing the console logger
 */
export declare function makeDebugger(ns: string): (...rest: unknown[]) => void;
/**
 * Promise for the DOM to be ready.
 */
export declare function domReady(): Promise<void>;
/**
 * Function for dynamically creating new google classes
 */
export declare const newGoogleClass: (googleInstance: typeof google, className: string, ...restArgs: any[]) => any;
/**
 * Function for dynamically creating new google classes
 */
export declare function googleClassFactory(googleInstance: typeof google, className: string, ...restArgs: unknown[]): Promise<unknown>;
/**
 * Simple debouncer for the resize handler
 */
export declare function debounce(fn: () => void, delay: number): () => void;
