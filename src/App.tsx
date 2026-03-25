function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-105 w-full">
        <div className="bg-mist-700 w-full h-80 rounded-lg flex items-center justify-center relative">
          <div className="flex gap-5 absolute -bottom-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="">
                <img src="pin.svg" alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full bg-blue-950 h-14 rounded-lg mt-2 flex items-center justify-center">
          <img src="pickbar.svg" alt="" />
        </div>

        <div className="w-full h-3 border border-blue-950 bg-blue-950/50 mt-4">
          <div className="flex gap-7.5 w-full h-full justify-center">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="w-5.25 h-full bg-sky-500" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
