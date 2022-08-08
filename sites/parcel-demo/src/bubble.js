import { BubbleChart } from "@lavacharts/core";

BubbleChart({
  label: "BubbleDemo",
  containerId: "bubble",
  data: [
    ["ID", "Life Expectancy", "Fertility Rate", "Region", "Population"],
    ["CAN", 80.66, 1.67, "North America", 33739900],
    ["DEU", 79.84, 1.36, "Europe", 81902307],
    ["DNK", 78.6, 1.84, "Europe", 5523095],
    ["EGY", 72.73, 2.78, "Middle East", 79716203],
    ["GBR", 80.05, 2, "Europe", 61801570],
    ["IRN", 72.49, 1.7, "Middle East", 73137148],
    ["IRQ", 68.09, 4.77, "Middle East", 31090763],
    ["ISR", 81.55, 2.96, "Middle East", 7485600],
    ["RUS", 68.6, 1.54, "Europe", 141850000],
    ["USA", 78.09, 2.05, "North America", 307007000]
  ],
  options: {
    title:
      "Fertility rate vs life expectancy in selected countries (2010)." +
      " X=Life Expectancy, Y=Fertility, Bubble size=Population, Bubble color=Region",
    hAxis: { title: "Life Expectancy" },
    vAxis: { title: "Fertility Rate" },
    bubble: { textStyle: { fontSize: 11 } }
  }
});
