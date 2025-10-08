import { useEffect } from "react";

let minute, second;

export default function Countdown({
  timer,
  callbackFn,
}: {
  timer: number;
  callbackFn: () => void;
}) {
  useEffect(() => {
    const worker = new Worker(
      new URL("../../../worker.ts", import.meta.url).href
    );

    let minuteRef = document.getElementById("minute")!;
    let secondRef = document.getElementById("second")!;

    worker.postMessage(timer);
    worker.onmessage = (e) => {
      minute = e.data[0];
      second = e.data[1];

      minuteRef.textContent = minute.toString();
      secondRef.textContent = second.toString();

      if (minute === 0 && second <= 10) {
        minuteRef.dataset.status = "warning";
        secondRef.dataset.status = "warning";
      }

      if (minute === 0 && second <= 0) {
        minuteRef.dataset.status = "expired";
        secondRef.dataset.status = "expired";

        callbackFn();
      }
    };

    return () => worker.terminate();
  }, []);
  return (
    <div className="p-2 bg-foreground-400 rounded">
      <p className="text-4xl">
        <span id="minute" className="data-[status=expired]:text-red-500"></span>
        :
        <span
          id="second"
          className="data-[status=warning]:animate-pulse data-[status=warning]:text-red-500 data-[status=expired]:text-red-500"
        ></span>
      </p>
      <p className="text-sm font-semibold">Time Left</p>
    </div>
  );
}
