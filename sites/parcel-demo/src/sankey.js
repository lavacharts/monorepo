import { SankeyChart } from "@lavacharts/core";

SankeyChart({
  label: "SankeyDemo",
  containerId: "sankey",
  data: [
    ["From", "To", "Weight"],
    ["A", "X", 5],
    ["A", "Y", 7],
    ["A", "Z", 6],
    ["B", "X", 2],
    ["B", "Y", 9],
    ["B", "Z", 4]
  ]
});
