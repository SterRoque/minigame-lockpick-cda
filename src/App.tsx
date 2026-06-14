import { useEffect, useRef, useState } from "react";
import { cn } from "./utils/cn";

function App() {
  const [pins, setPins] = useState(
    Array(9)
      .fill(0)
      .map((_, i) => ({ id: i, level: 0, locked: false })),
  );
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  const speed = 2.5;
  const barWidth = 480;
  const containerWidth = containerRef.current?.offsetWidth || 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let next = prev + directionRef.current * speed;

        if (next + barWidth > containerWidth) {
          directionRef.current = -1;
        }

        if (next <= -barWidth) {
          directionRef.current = 1;
        }

        return next;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [containerWidth]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="bg-slate-700 w-120 h-60 flex items-end pb-6 rounded-2xl border-2 border-slate-500">
        <div className="flex gap-5 px-4 justify-between w-full">
          {pins.map((pin) => {
            let pinColor = "bg-gray-500";
            if (pin.locked) pinColor = "bg-red-600";
            else if (pin.level > 0) pinColor = "bg-yellow-500";

            return (
              <div
                key={pin.id}
                className={cn(
                  "flex flex-col items-center flex-1 transition-all duration-200",
                  pin.level > 0 ? "scale-105" : "opacity-80",
                )}
              >
                <div className="w-full bg-slate-900 h-40 rounded relative flex items-end overflow-hidden border border-slate-600">
                  <div
                    className={`w-full ${pinColor} transition-all duration-300 rounded-t`}
                    style={{ height: `${(pin.level / 4) * 100 || 15}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        ref={containerRef}
        className="bg-blue-950 w-120 h-14 rounded-lg mt-2 flex items-center justify-center relative overflow-hidden border border-blue-900"
      >
        <div
          className="absolute h-full bg-blue-500/20"
          style={{
            left: position,
            width: barWidth,
            transition: "transform 0.1s ease",
          }}
        >
          <div className="w-full h-1 bg-cyan-400 absolute top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="relative bg-slate-900 w-120 h-3 mt-5 flex items-center justify-between rounded border border-slate-600 px-4">
        {pins.map((pin, index) => (
          <div
            className="bg-sky-500 w-7.5 h-3"
            key={pin.id}
            ref={(el) => {
              blocksRef.current[index] = el;
            }}
          />
        ))}

        <div
          className="bg-red-500 w-0.5 h-10 absolute -top-2.5 z-50 shadow-[0_0_8px_#ef4444]"
          style={{
            left: position + barWidth,
          }}
        />
      </div>
    </div>
  );
}

export default App;
