import { Binding } from "./Binding";
import { Drawable } from "./Drawable";

import type { DashboardSpec } from "./types";

export class Dashboard extends Drawable {
  public bindings: Binding[];

  public needsBindings = true;

  constructor(payload: DashboardSpec) {
    super(payload);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.bindings = payload.bindings;
  }

  /**
   * Get the Google Class for creating a new {@link Dashboard} instance
   */
  public getGoogleConstructor() {
    return "Dashboard" as const;
  }

  /**
   * Draw the {@link Dashboard}
   */
  public async draw(): Promise<void> {
    if (this?.initialData) {
      await this.processInitialData();
    }

    // this.googleChart = await AsyncGoogleFactory(
    //   this.getGoogleConstructor(),
    //   getContainer(this.containerId)
    // );

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
}
