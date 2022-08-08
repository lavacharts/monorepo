import { lava } from "../LavaJs";

import type { Chart } from "../Chart";
import type { ChartSpecWithOptions } from "../types";

export function AnnotationChart(
  config: ChartSpecWithOptions<google.visualization.AnnotationChartOptions>
): Chart {
  return lava.chart({ type: "AnnotationChart", ...config });
}

export function AreaChart(
  config: ChartSpecWithOptions<google.visualization.AreaChartOptions>
): Chart {
  return lava.chart({ type: "AreaChart", ...config });
}

export function BarChart(
  config: ChartSpecWithOptions<google.visualization.BarChartOptions>
): Chart {
  return lava.chart({ type: "BarChart", ...config });
}

export function BubbleChart(
  config: ChartSpecWithOptions<google.visualization.BubbleChartOptions>
): Chart {
  return lava.chart({ type: "BubbleChart", ...config });
}

export function CalendarChart(
  config: ChartSpecWithOptions<google.visualization.CalendarOptions>
): Chart {
  return lava.chart({ type: "CalendarChart", ...config });
}

export function CandlestickChart(
  config: ChartSpecWithOptions<google.visualization.CandlestickChartOptions>
): Chart {
  return lava.chart({ type: "CandlestickChart", ...config });
}

export function ColumnChart(
  config: ChartSpecWithOptions<google.visualization.ColumnChartOptions>
): Chart {
  return lava.chart({ type: "ColumnChart", ...config });
}

export function ComboChart(
  config: ChartSpecWithOptions<google.visualization.ComboChartOptions>
): Chart {
  return lava.chart({ type: "ComboChart", ...config });
}

export function DonutChart(
  config: ChartSpecWithOptions<google.visualization.PieChartOptions>
): Chart {
  return lava.chart({ type: "DonutChart", ...config });
}

export function GanttChart(
  config: ChartSpecWithOptions<google.visualization.GanttChartOptions>
): Chart {
  return lava.chart({ type: "GanttChart", ...config });
}

export function GaugeChart(
  config: ChartSpecWithOptions<google.visualization.GaugeChartOptions>
): Chart {
  return lava.chart({ type: "GaugeChart", ...config });
}

export function GeoChart(
  config: ChartSpecWithOptions<google.visualization.GeoChartOptions>
): Chart {
  return lava.chart({ type: "GeoChart", ...config });
}

export function HistogramChart(
  config: ChartSpecWithOptions<google.visualization.HistogramHistogramOptions>
): Chart {
  return lava.chart({ type: "HistogramChart", ...config });
}

export function LineChart(
  config: ChartSpecWithOptions<google.visualization.LineChartOptions>
): Chart {
  return lava.chart({ type: "LineChart", ...config });
}

export function PieChart(
  config: ChartSpecWithOptions<google.visualization.PieChartOptions>
): Chart {
  return lava.chart({ type: "PieChart", ...config });
}

export function SankeyChart(
  config: ChartSpecWithOptions<google.visualization.SankeyChartOptions>
): Chart {
  return lava.chart({ type: "SankeyChart", ...config });
}

export function ScatterChart(
  config: ChartSpecWithOptions<google.visualization.ScatterChartOptions>
): Chart {
  return lava.chart({ type: "ScatterChart", ...config });
}

export function SteppedAreaChart(
  config: ChartSpecWithOptions<google.visualization.SteppedAreaChartOptions>
): Chart {
  return lava.chart({ type: "SteppedAreaChart", ...config });
}

export function TableChart(
  config: ChartSpecWithOptions<google.visualization.TableOptions>
): Chart {
  return lava.chart({ type: "TableChart", ...config });
}

export function TimelineChart(
  config: ChartSpecWithOptions<google.visualization.TimelineOptions>
): Chart {
  return lava.chart({ type: "TimelineChart", ...config });
}

export function TreeMapChart(
  config: ChartSpecWithOptions<google.visualization.TreeMapOptions>
): Chart {
  return lava.chart({ type: "TreeMapChart", ...config });
}

export function WordTreeChart(config: ChartSpecWithOptions<unknown>): Chart {
  return lava.chart({ type: "WordTreeChart", ...config });
}
