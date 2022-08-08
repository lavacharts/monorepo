import { Binding } from "./Binding";
import { Drawable } from "./Drawable";
import type { DashboardSpec } from "./types";
export declare class Dashboard extends Drawable {
    bindings: Binding[];
    needsBindings: boolean;
    constructor(payload: DashboardSpec);
    /**
     * Get the Google Class for creating a new {@link Dashboard} instance
     */
    getGoogleConstructor(): "Dashboard";
    /**
     * Draw the {@link Dashboard}
     */
    draw(): Promise<void>;
}
