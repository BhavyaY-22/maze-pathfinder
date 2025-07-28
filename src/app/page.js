"use client"

import { useState, useCallback } from "react"
import Actions from "./components/action"
import Grid from "./components/grid"
import Count from "./components/count"

const GRID_SIZE = 20

// Cell types
const CELL_TYPES = {
  EMPTY: 0,
  WALL: 1,
  START: 2,
  GOAL: 3,
  VISITED: 4,
  PATH: 5,
}

export default function MazePathfinder() {
  const [grid, setGrid] = useState(() =>
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(CELL_TYPES.EMPTY)),
  )
  const [startPos, setStartPos] = useState(null)
  const [goalPos, setGoalPos] = useState(null)
  const [drawMode, setDrawMode] = useState("wall")
  const [isAnimating, setIsAnimating] = useState(false)
  const [pathLength, setPathLength] = useState(0)
  const [visitedNodes, setVisitedNodes] = useState(0)
  const [currentMode, setCurrentMode] = useState("draw")
  const resetGrid = useCallback(() => {
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(CELL_TYPES.EMPTY)),
    )
    setStartPos(null)
    setGoalPos(null)
    setPathLength(0)
    setVisitedNodes(0)
    setIsAnimating(false)
  }, [])

  const clearPath = useCallback(() => {
    setGrid((prev) =>
      prev.map((row) =>
        row.map((cell) => (cell === CELL_TYPES.VISITED || cell === CELL_TYPES.PATH ? CELL_TYPES.EMPTY : cell)),
      ),
    )
    setPathLength(0)
    setVisitedNodes(0)
    setIsAnimating(false)
  }, [])

  const handleCellClick = useCallback(
    (row, col) => {
      if (isAnimating) return

      if (currentMode === "start") {
        // Remove previous start position
        if (startPos) {
          setGrid((prev) => {
            const newGrid = [...prev]
            newGrid[startPos.row][startPos.col] = CELL_TYPES.EMPTY
            return newGrid
          })
        }
        setStartPos({ row, col })
        setGrid((prev) => {
          const newGrid = [...prev]
          newGrid[row][col] = CELL_TYPES.START
          return newGrid
        })
      } else if (currentMode === "goal") {
        // Remove previous goal position
        if (goalPos) {
          setGrid((prev) => {
            const newGrid = [...prev]
            newGrid[goalPos.row][goalPos.col] = CELL_TYPES.EMPTY
            return newGrid
          })
        }
        setGoalPos({ row, col })
        setGrid((prev) => {
          const newGrid = [...prev]
          newGrid[row][col] = CELL_TYPES.GOAL
          return newGrid
        })
      } else {
        // Drawing walls/erasing
        const currentCell = grid[row][col]
        if (currentCell === CELL_TYPES.START || currentCell === CELL_TYPES.GOAL) return

        setGrid((prev) => {
          const newGrid = [...prev]
  if (drawMode === "wall") {
    newGrid[row][col] = currentCell === CELL_TYPES.WALL ? CELL_TYPES.EMPTY : CELL_TYPES.WALL
  } else {
    newGrid[row][col] = CELL_TYPES.EMPTY
  }
  return newGrid
        })
      }
    },
    [currentMode, startPos, goalPos, grid, drawMode, isAnimating],
  )

  const solveMaze = useCallback(async () => {
    if (!startPos || !goalPos || isAnimating) return

    setIsAnimating(true)
    clearPath()

    // A* pathfinding algorithm implementation
    const heuristic = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col)

    const getNeighbors = (pos) => {
      const neighbors = []
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ]

      for (const [dr, dc] of directions) {
        const newRow = pos.row + dr
        const newCol = pos.col + dc

        if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
          neighbors.push({ row: newRow, col: newCol })
        }
      }
      return neighbors
    }

    const openSet = [startPos]
    const cameFrom = new Map()
    const gScore = new Map()
    const fScore = new Map()
    const visited = new Set()

    const posKey = (pos) => `${pos.row},${pos.col}`

    gScore.set(posKey(startPos), 0)
    fScore.set(posKey(startPos), heuristic(startPos, goalPos))

    let visitedCount = 0

    while (openSet.length > 0) {
      // Find node with lowest fScore
      let current = openSet[0]
      let currentIndex = 0

      for (let i = 1; i < openSet.length; i++) {
        if (
          (fScore.get(posKey(openSet[i])) || Number.POSITIVE_INFINITY) <
          (fScore.get(posKey(current)) || Number.POSITIVE_INFINITY)
        ) {
          current = openSet[i]
          currentIndex = i
        }
      }

      openSet.splice(currentIndex, 1)
      visited.add(posKey(current))
      visitedCount++

      // Animate visited node
      if (
        !(current.row === startPos.row && current.col === startPos.col) &&
        !(current.row === goalPos.row && current.col === goalPos.col)
      ) {
        setGrid((prev) => {
          const newGrid = [...prev]
          newGrid[current.row][current.col] = CELL_TYPES.VISITED
          return newGrid
        })
        setVisitedNodes(visitedCount)
        await new Promise((resolve) => setTimeout(resolve, 50))
      }

      // Check if we reached the goal
      if (current.row === goalPos.row && current.col === goalPos.col) {
        // Reconstruct path
        const path = []
        let pathNode = current

        while (pathNode) {
          path.unshift(pathNode)
          pathNode = cameFrom.get(posKey(pathNode))
        }

        // Animate path
        for (let i = 1; i < path.length - 1; i++) {
          const pathPos = path[i]
          setGrid((prev) => {
            const newGrid = [...prev]
            newGrid[pathPos.row][pathPos.col] = CELL_TYPES.PATH
            return newGrid
          })
          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        setPathLength(path.length - 1)
        setIsAnimating(false)
        return
      }

      // Check neighbors
      for (const neighbor of getNeighbors(current)) {
        const neighborKey = posKey(neighbor)
        const neighborCell = grid[neighbor.row][neighbor.col]

        if (neighborCell === CELL_TYPES.WALL || visited.has(neighborKey)) continue

        const tentativeGScore = (gScore.get(posKey(current)) || Number.POSITIVE_INFINITY) + 1

        if (!openSet.some((pos) => pos.row === neighbor.row && pos.col === neighbor.col)) {
          openSet.push(neighbor)
        } else if (tentativeGScore >= (gScore.get(neighborKey) || Number.POSITIVE_INFINITY)) {
          continue
        }

        cameFrom.set(neighborKey, current)
        gScore.set(neighborKey, tentativeGScore)
        fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, goalPos))
      }
    }

    // No path found
    setIsAnimating(false)
  }, [startPos, goalPos, isAnimating, grid, clearPath])

  return (
    <div className="py-8 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-purple-400">Maze Pathfinder</h1>
      <Grid
        grid={grid}
        onCellClick={handleCellClick}
        isAnimating={isAnimating}
        cellTypes={CELL_TYPES}
      />
      <Actions
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        drawMode={drawMode}
        setDrawMode={setDrawMode}
        onSolve={solveMaze}
        onReset={resetGrid}
        onClearPath={clearPath}
        canSolve={!!startPos && !!goalPos && !isAnimating}
        isAnimating={isAnimating}
      />
      <Count pathLength={pathLength} visitedNodes={visitedNodes} hasStart={!!startPos} hasGoal={!!goalPos} />  
    </div>  
  )
}
