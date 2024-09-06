let adjacentList = [
  [1, 6, 8],
  [0, 4, 6, 9],
  [4, 6],
  [4, 5, 8],
  [1, 2, 3, 5, 9],
  [3, 4],
  [0, 1, 2],
  [8, 9],
  [0, 3, 7],
  [1, 4, 7],
];

let queue = [];
let path = [];
let result = [];

function createQueue(from, to) {
  return {
    from,
    to,
  };
}

function createPath(from, to) {
  if (path[to] === undefined) {
    path[to] = [from];
  }
}

function pushToQueue(from, to) {
  if (path[to] === undefined) {
    let obj = createQueue(from, to);
    queue.push(obj);
  }
}

function render(start, end) {
  if (adjacentList[start] === undefined || adjacentList[end] === undefined) {
    throw new Error("Input is not available");
  }
  path[start] = null;
  adjacentList[start].forEach((element) => pushToQueue(start, element));
  debugger;

  while (queue.length !== 0) {
    let current = queue.shift();
    createPath(current.from, current.to);
    adjacentList[current.to].forEach((element) =>
      pushToQueue(current.to, element)
    );
  }

  while (path[end] !== null || undefined) {
    result.push([Number(path[end]), Number(end)]);
    end = path[end];
  }

  return result.reverse();
}

console.log(render(9, 3));
