"use client"
//different type of cells on the maze
const getCellStyles = (type, cellTypes) => {
  switch (type) {
    case cellTypes.EMPTY:
      return "bg-white hover:bg-gray-50"
    case cellTypes.WALL:
      return "bg-gray-900"
    case cellTypes.START:
      return "bg-green-500"
    case cellTypes.GOAL:
      return "bg-red-500"
    case cellTypes.VISITED:
      return "bg-blue-200"
    case cellTypes.PATH:
      return "bg-yellow-400"
    default:
      return "bg-white"
  }
}

export default function Cell({ type, row, col, onClick, disabled, cellTypes }) {
  const handleClick = () => {
    if (!disabled) onClick(row, col)
  }
  return (
    <div
      className={`
        w-6 h-6 border border-gray-200 cursor-pointer transition-colors duration-150
        ${getCellStyles(type, cellTypes)}
        ${disabled ? "cursor-not-allowed" : ""}
      `}
      onClick={handleClick}
    />
  )
}
