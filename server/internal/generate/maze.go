package generate

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

const (
	Height = 31
	Width  = 31
)

type Maze struct {
	height int       `json:"height"`
	width  int       `json:"width"`
	data   [3]string `json:"data"`
}

func generateMaze() [][]int {
	rand.Seed(time.Now().UnixNano())

	maze := make([][]int, Height)
	for i := range maze {
		maze[i] = make([]int, Width)
	}
	stack := make([][2]int, Height*Width)
	var ways [4][2]int

	for i, v := range maze {
		for j, _ := range v {
			if ((i%2 == 1) && (j%2 == 1)) && ((i < Height) && (j < Width)) {
				maze[i][j] = 0
			} else {
				maze[i][j] = 1
			}

		}
	}

	pos := 0
	stack[pos][0] = 1
	stack[pos][1] = 1
	maze[stack[pos][0]][stack[pos][1]] = 2

	isExit := false
	findOfExit := false
	waysCount := 0
	isMazeReady := false
	for !isMazeReady {
		waysCount = 0

		if findOfExit {
			tmp := Height % 2
			if stack[pos][0]+1 == Height-tmp {
				maze[stack[pos][0]+1][stack[pos][1]] = 2
				findOfExit = false
			}
		}

		if stack[pos][0]-2 >= 0 && maze[stack[pos][0]-2][stack[pos][1]] == 0 {
			ways[waysCount][0] = stack[pos][0] - 2
			ways[waysCount][1] = stack[pos][1]
			waysCount++
		}
		if stack[pos][0]+2 < Height && maze[stack[pos][0]+2][stack[pos][1]] == 0 {
			ways[waysCount][0] = stack[pos][0] + 2
			ways[waysCount][1] = stack[pos][1]
			waysCount++
		}
		if stack[pos][1]-2 >= 0 && maze[stack[pos][0]][stack[pos][1]-2] == 0 {
			ways[waysCount][0] = stack[pos][0]
			ways[waysCount][1] = stack[pos][1] - 2
			waysCount++
		}
		if stack[pos][1]+2 < Width && maze[stack[pos][0]][stack[pos][1]+2] == 0 {
			ways[waysCount][0] = stack[pos][0]
			ways[waysCount][1] = stack[pos][1] + 2
			waysCount++
		}

		if waysCount > 0 {
			diaraction := rand.Intn(waysCount)
			pos++
			stack[pos] = ways[diaraction]
			maze[stack[pos][0]][stack[pos][1]] = 2

			if stack[pos][0] != stack[pos-1][0] {
				if stack[pos][0]-stack[pos-1][0] > 0 {
					maze[stack[pos][0]-1][stack[pos][1]] = 2
				} else {
					maze[stack[pos][0]+1][stack[pos][1]] = 2
				}
			} else {
				if stack[pos][1]-stack[pos-1][1] > 0 {
					maze[stack[pos][0]][stack[pos][1]-1] = 2
				} else {
					maze[stack[pos][0]][stack[pos][1]+1] = 2
				}
			}

		} else if pos > 0 {
			if !isExit {
				isExit = true
				findOfExit = true
			}
			pos--
		} else {
			isMazeReady = true
		}
	}

	for i, v := range maze {
		for j, e := range v {
			if e == 2 {
				maze[i][j] = 0
			}
		}
	}

	//костыль
	maze[0][0] = 2
	maze[1][0] = 2
	maze[0][1] = 2
	maze[1][1] = 2
	maze[Height-1][0] = 2
	maze[Height-1][1] = 2
	maze[Height-2][0] = 2
	maze[Height-2][1] = 2
	maze[Height-1][Width-1] = 2
	maze[Height-1][Width-2] = 2
	maze[Height-2][Width-1] = 2
	maze[Height-2][Width-2] = 2
	maze[0][Width-1] = 2
	maze[0][Width-2] = 2
	maze[1][Width-1] = 2
	maze[1][Width-2] = 2

	for _, v := range maze {
		for _, e := range v {
			if e == 1 {
				fmt.Print("# ")
			} else if e == 2 {
				fmt.Print("@ ")
			} else {
				fmt.Print("  ")
			}
		}
		fmt.Println()
	}
	return maze
}

func getString(maze [][]int) string {
	var str string
	for _, v := range maze {
		for _, e := range v {
			str += strconv.Itoa(e)
		}
	}
	return str
}

func GetField() string {
	return getString(generateMaze()) + getString(generateMaze()) + getString(generateMaze())
}
