import { useEffect, useRef, useState } from "react";

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef(1);

  const [position, setPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const speed = 2;
  const barWidth = 367;

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => {
        let next = prev + directionRef.current * speed;

        if (next + barWidth >= containerWidth) {
          next = containerWidth - barWidth;
          directionRef.current = -1;
        }

        if (next <= -barWidth) {
          next = -barWidth;
          directionRef.current = 1;
        }

        return next;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [containerWidth]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-105 w-full">
        <div className="bg-mist-700 w-full h-80 rounded-lg flex items-center justify-center relative z-40">
          <div className="flex gap-5 absolute -bottom-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="">
                <img src="pin.svg" alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-950 h-14 rounded-lg mt-2 flex items-center justify-center relative">
          <img
            src="pickbar.svg"
            alt=""
            className="absolute"
            style={{
              left: position,
              width: barWidth,
            }}
          />
        </div>

        <div className="w-full h-3 border border-blue-950 bg-blue-950/50 mt-4 relative" ref={containerRef}>
          <div className="flex gap-7.5 w-full h-full justify-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-5.25 h-full bg-sky-500" />
            ))}
          </div>

          <div
            className="bg-red-400 w-0.5 h-14 absolute -top-3.5"
            style={{
              left: position + barWidth,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
