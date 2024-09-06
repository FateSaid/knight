const possibleMoves = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

let queue = [];
let path = [];
const graph = createGraph();

function Node(from, to) {
  return { from, to };
}

function addNodeToQueue(node) {
  queue.push(node);
}

function createGraph() {
  let graphArray = [];
  for (let i = 0; i < 8; i++) {
    graphArray.push([]);
    for (let j = 0; j < 8; j++) {
      graphArray[i][j] = 0;
    }
  }
  return graphArray;
}

function generateMoves(start) {
  let [startX, startY] = start;

  let moves = possibleMoves
    .map((move) => [move[0] + startX, move[1] + startY])
    .filter(
      (item) => item[0] >= 0 && item[0] <= 7 && item[1] >= 0 && item[1] <= 7
    );

  moves.forEach((theMove) => {
    let node = Node(start, theMove);
    let [x, y] = node.to;
    if (graph[x][y] === 0) {
      graph[startX][startY] = 1;
      addNodeToQueue(node);
    }
  });
}

function knightMoves(start, end) {
  let [endX, endY] = end;
  if (start[0] > 7 || start[1] > 7 || endX > 7 || endY > 7) {
    throw new Error("Input is bigger than graph coordinates");
  }
  generateMoves(start);

  while (queue.length !== 0) {
    let node = queue.shift();
    path.push(node);
    generateMoves(node.to);

    if (node.to[0] === endX && node.to[1] === endY) {
      return findPath(start, node.to);
    }
  }
}

function findPath(start, end) {
  let array = [];
  let [startX, startY] = start;
  let [endX, endY] = end;

  let index = path.findIndex(
    (element) => element.to[0] === endX && element.to[1] === endY
  );
  let node = path[index];
  array.push(node);

  while (startX !== node.from[0] && startY !== node.from[1]) {
    index = path.findIndex(
      (element) =>
        element.to[0] === node.from[0] && element.to[1] === node.from[1]
    );
    node = path[index];
    array.push(node);
  }
  let result = array.map((obj) => obj.from);
  result.unshift([endX, endY]);
  console.log(`You made it in ${result.length} moves! Here's your path:`);
  return result.reverse();
}

console.log(knightMoves([3, 3], [7, 0]));
