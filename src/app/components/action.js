"use client"
//action buttons: to create walls, start and end points; to solve and reset
export default function Actions({
  currentMode,
  setCurrentMode,
  onSolve,
  onReset,
  canSolve,
  isAnimating,
}) {
  return (
    <div className="m-5 w-[500px]">
        <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                    <button
                        onClick={() => setCurrentMode("draw")}
                        disabled={isAnimating}
                        className={`flex items-center justify-start px-4 py-2 rounded-md border text-sm font-bold ${
                        currentMode === "draw"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                        }`}
                        >
                        Set-up Walls
                    </button>
                    <button
                        onClick={() => setCurrentMode("start")}
                        disabled={isAnimating}
                        className={`flex items-center justify-start px-4 py-2 rounded-md border text-sm font-bold ${
                        currentMode === "start"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                        }`}
                        >
                        Set Start Point
                    </button>
                    <button
                        onClick={() => setCurrentMode("goal")}
                        disabled={isAnimating}
                        className={`flex items-center justify-start px-4 py-2 rounded-md border text-sm font-bold ${
                        currentMode === "goal"
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-900 hover:bg-gray-100"
                        }`}
                        >
                        Set Goal Point
                    </button>
                </div>
            <div className="border-t pt-4 border-b pt-4 pb-4">
                <button
                    onClick={onSolve}
                    disabled={!canSolve}
                    className="w-full mb-2 flex items-center justify-center px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-900 text-white text-sm font-bold"
                    >SOLVE
                </button> 
                <button
                    onClick={onReset}
                    disabled={isAnimating}
                    className="w-full px-5 py-2 text-sm font-bold border rounded-md hover:bg-gray-100 hover:text-black flex items-center justify-center"
                    >
                    Reset
                </button>
            </div>
        </div>
    </div>
)}
