import { useLava} from "@lavacharts/react";
import { useEffect, useRef } from "react";

export default function SankeyChart({ data }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lava.draw();
  });

  return <div ref={chartRef} id={containerId}></div>;
}
