"use client"
//create maze grid
import Cell from "./cell"

export default function Grid({ grid, onCellClick, isAnimating, cellTypes }) {
  return (
     
    <div className="grid grid-cols-20 gap-0 w-fit mx-auto">
        {grid.map((row, rowIndex) =>
          row.map((cellType, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              type={cellType}
              row={rowIndex}
              col={colIndex}
              onClick={onCellClick}
              disabled={isAnimating}
              cellTypes={cellTypes}
            />
          )),
        )}
    </div>
  )
}
