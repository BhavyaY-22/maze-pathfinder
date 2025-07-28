# Maze Pathfinder

A visual maze-solving application built with Next.js and Tailwind CSS. Users can draw walls, set start/end points, and visualize the A* pathfinding algorithm in action.

-------

Live Demo: https://maze-pathfinder-one.vercel.app/

-------

Features:

- A* pathfinding visualization
- Toggle to draw and erase walls
- Set your own start and goal nodes
- Count the number of visited nodes and the final path length

-------

Tech Stack:

- Next.js
- React
- Tailwind CSS
- HTML/CSS/JavaScript
- ESLint

-------

Folder Structure:

maze-pathfinder/

├── src/app
     └── components/
            ├── action.js
 	    ├── count.js
	    ├── cell.js
	    └── grid.js
├── src/app/
     └── page.js
     ├── layout.js
     └── global.css
├── public/
├── README.md

-------

## Architecture Overview

The Maze Pathfinder is a React application built using the Next.js framework. It provides a visual and interactive simulation of the A* pathfinding algorithm on a 2D grid.


### Component Breakdown

#### Grid.js
- Renders the entire maze as a 2D grid.
- Composed of multiple `Cell` components.
- Handles the structure and passes interaction events down to individual cells.

#### Cell.js
- Represents a single cell in the grid (wall, empty, start, goal, visited, path).
- Receives props like `row`, `col`, `type`, and `onClick`.
- Applies conditional styling and classes based on the cell type.
- It focuses only on display and UI interaction for its cell.

#### Actions.js
- Provides UI controls to:
  - Select mode (`draw`, `start`, `goal`)
  - Trigger maze solving
  - Reset grid

#### Count.js
- Displays real-time statistics such as:
  - Total visited nodes
  - Final path length

#### page.js
- The main component that:
  - Initializes and manages the grid state
  - Implements the A* pathfinding algorithm
  - Coordinates user interactions and updates
  - Handles animations and state transitions


### Application Flow

1. **User Interaction**
   - Users click on cells to define walls, start, and goal positions.
   - Interaction is routed from `Cell → Grid → Page`.

2. **State & Algorithm Execution**
   - On “Solve”, the app executes the A* algorithm.
   - It calculates the optimal path, updates visited cells, and animates the result.
   - Uses `useState` and `useCallback` to manage state efficiently.

3. **UI Update**
   - Grid cells change type (e.g., from empty to visited to path).
   - `Cell.js` re-renders automatically via props.
