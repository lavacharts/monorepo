import "./App.css"

import SankeyChart from "./components/SankeyChart";

function App() {
  const containerId = "chart";
  const data = [
    ["From", "To", "Weight"],
    ["A", "X",               5]   ,
    ["A",  "Y", 7],
    ["A", "Z", 6],
    ["B", "X", 2],
    [ "B",  "Y", 9],
    ["B", "Z", 4]
  ];

  return (
    <div className="App">
      <h1>Lavacharts + React</h1> 
      <div className="card">
        <SankeyChart data={data} />
      </div>
    </div>
  );
}



export default App;
