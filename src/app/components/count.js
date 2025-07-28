"use client"
//counting visited cells and final path length
export default function Count({ pathLength, visitedNodes}) {
  return (

      <div className="flex flex-row gap-x-4 items-center">
         <div className="text-center p-3 bg-amber-50 rounded-lg">
            <div className="text-xs text-amber-600 font-bold">Visited Cells</div>
            <div className="text-2xl font-bold text-amber-600">{visitedNodes}</div>
         </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xs text-green-600 font-bold">Path Length</div>
          <div className="text-2xl font-bold text-green-600">{pathLength}</div>
        </div>
      </div>
    
  )
}
