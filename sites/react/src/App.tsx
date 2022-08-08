import "./App.css";

import { SankeyChart } from "@lavacharts/core";
import { useEffect } from "react";

function App() {
  const containerId = "chart";

  useEffect(() => {
    SankeyChart({
      label: "SankeyDemo",
      containerId,
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
  }, [window.google]);

  return (
    <div className="App">
      <h1>Lavacharts + React</h1>
      <div className="card">
        <div id={containerId}></div>
      </div>
    </div>
  );
}

export default App;
