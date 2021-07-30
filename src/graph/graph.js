import { minSpanTree_Prim } from './prim';
import { minSpanTree_Kruskal } from './kruskal';

export class Graph{
  _vertexes = [];
  _adjacencyMatrix = null;
  _edgesNum = 0;
  _vertexesIndex = {};
  _print = {};
  _edges = [];

  constructor(){ 
  }

  _parse(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  init(vertexes, edges){
    this._vertexes = [];
    const vertexesNum = vertexes.length;
    const temp = {};
    for(let i = 0; i < vertexesNum; i++){
      const vertex = vertexes[i];
      this._vertexes[i] = vertex; 
      this._vertexesIndex[vertex] = i;
      temp[vertex] = '\u221e';
    }

    this._adjacencyMatrix = [];
    for(let i = 0; i < vertexesNum; i++){
      this._adjacencyMatrix[i] = new Array(vertexesNum).fill(Infinity);
      this._print[this._vertexes[i]] = this._parse(temp);
      this._print[this._vertexes[i]][this._vertexes[i]] = 0;
    }

    this._edgesNum = edges.length;
    for(let i = 0; i < this._edgesNum; i++){
      const edge = edges[i];
      const headIndex = this._vertexesIndex[edge.head];
      const tailIndex = this._vertexesIndex[edge.tail];

      const [begin, end] = headIndex < tailIndex ? [headIndex, tailIndex] : [tailIndex, headIndex];

      this._edges.push({
        begin,
        end,
        weight: edge.weight
      });
      this._adjacencyMatrix[headIndex][tailIndex] = edge.weight;
      this._adjacencyMatrix[tailIndex][headIndex] = edge.weight;
      this._print[edge.head][edge.tail] = edge.weight;
      this._print[edge.tail][edge.head] = edge.weight;
    }
    this._edges.sort((a, b) => {
      return a.weight - b.weight;
    });
  }

  get adjacencyMatrix(){
    return this._adjacencyMatrix;
  }

  print(){
    console.table(this._print);
  }

  get vertexNum(){
    return this._vertexes.length;
  }

  get vertexes(){
    return this._vertexes;
  }

  get edges(){
    return this._edges;
  }
}

class EdgeNode{
  _weight = Infinity;
  _next = null;
  _index = -1;
  
  constructor(index, weight){
    this._index = index;
    this._weight = weight;
  }

  get index(){
    return this._index;
  }

  get weight(){
    return this._weight;
  }

  get next(){
    return this._next;
  }

  set next(edgeNode){
    this._next = edgeNode;
  }
}

class MultiAlEdge{
  _iVertexIndex = -1;
  _jVertexIndex = -1;
  _nextHasIVertexEdge = null;
  _nextHasJVertexEdge = null;

  constructor(i, j){
    this._iVertexIndex = i;
    this._jVertexIndex = j;
  }

  get iIndex(){
    return this._iVertexIndex;
  }

  get jIndex(){
    return this._jVertexIndex;
  }

  set nextEdgeHasI(edge){
    this._nextHasIVertexEdge = edge;
  }

  get nextEdgeHasI(){
    return this._nextHasIVertexEdge;
  }

  set nextEdgeHasJ(edge){
    this._nextHasIVertexEdge = edge;
  }

  get nextEdgeHasJ(){
    return this._nextHasIVertexEdge;
  } 
}

class Vertex{
  _data = null;
  _firstEdge = null;

  constructor(data){
    this._data = data;
  }

  get data(){
    return this._data;
  }

  set data(data){
    this._data = data;
  }

  get firstEdge(){
    return this._firstEdge;
  }

  set firstEdge(vertex){
    this._firstEdge = vertex;
  }
}

function AlGraphInit(vertexes, edges){
  let vertexList = [];
  let vertexIndex = {};
  vertexes.forEach((vertex, index) => {
    const vex = new Vertex(vertex);
    vertexList.push(vex);
    vertexIndex[vertex] = index;
  });

  edges.forEach(edge => {
    const headIndex = vertexIndex[edge.head];
    const tailIndex = vertexIndex[edge.tail];

    const head = vertexList[headIndex];
    const tail = vertexList[tailIndex];

    const edgeHeadNode = new EdgeNode(headIndex, edge.weight);
    const edgeTailNode = new EdgeNode(tailIndex, edge.weight);

    edgeHeadNode.next = tail.firstEdge;
    tail.firstEdge = edgeHeadNode;

    edgeTailNode.next = head.firstEdge;
    head.firstEdge = edgeTailNode;
  });

  return vertexList;
}

function MultiAlGraphInit(vertexes, edges){
  let multiAlGraph = [];
  let vertexIndex = {};

  vertexes.forEach((vertex, index) => {
    const vertexNode = new Vertex(vertex);
    multiAlGraph.push(vertexNode);
    vertexIndex[vertex] = index;
  });

  edges.forEach(edge => {
    const iIndex = vertexIndex[edge.head];
    const jIndex = vertexIndex[edge.tail];
    
    const iVertex = multiAlGraph[iIndex];
    const jVertex = multiAlGraph[jIndex];

    const multiAlGraphEdge = new MultiAlEdge(iIndex, jIndex);

    multiAlGraphEdge.nextEdgeHasI = iVertex.firstEdge;
    multiAlGraphEdge.nextEdgeHasJ = jVertex.firstEdge;
  })
}

function printAlGraph(alGraph){
  alGraph.forEach(vertex => {
    let printStr = '';
    printStr += vertex.data;
    let firstEdge = vertex.firstEdge;
    while(firstEdge !== null){
      printStr += `---${firstEdge.weight}--->${alGraph[firstEdge.index].data}`;
      firstEdge = firstEdge.next;
    }
    console.log(printStr);
  });
}

let visited = [];

function BFS(graph){
  const traverseQueue = [];
  for(let i = 0; i < graph.length; i++){
    visited[i] = false;
  }
  
  for(let i = 0; i < graph.length; i++){
    if(!visited[i]){
      traverseQueue.push(i);
      visited[i] = true;
      let cur = traverseQueue.pop();
      while(cur !== undefined){
        console.log(graph[cur].data);
        let next = graph[cur].firstEdge;
        while(next !== null){
          if(!visited[next.index]){
            traverseQueue.push(next.index);
            visited[next.index] = true;
          }
          next = next.next;
        }
        cur = traverseQueue.shift();
      }
    }
  }
}

function DFS(graph){
  for(let i = 0; i < graph.length; i++){
    visited[i] = false;
  }
  const recursive = (graph, i) => {
    console.log(graph[i].data);
    visited[i] = true;
    let nextNode = graph[i].firstEdge;
    while(nextNode !== null){
      if(!visited[nextNode.index]){
        recursive(graph, nextNode.index);
      }
      else{
        nextNode = nextNode.next;
      }
    }
  }
  for(let i = 0; i < graph.length; i++){
    if(!visited[i]){
      recursive(graph, i);
    }
  } 
}

export function main(){
  const graph = new Graph();
  graph.init(['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8'], [
    {
      head: 'v0',
      tail: 'v1',
      weight: 10,
    },
    {
      head: 'v2',
      tail: 'v1',
      weight: 18,
    },
    {
      head: 'v2',
      tail: 'v3',
      weight: 22,
    },
    {
      head: 'v4',
      tail: 'v3',
      weight: 20,
    },
    {
      head: 'v5',
      tail: 'v4',
      weight: 26,
    },
    {
      head: 'v0',
      tail: 'v5',
      weight: 11,
    },
    {
      head: 'v1',
      tail: 'v6',
      weight: 16,
    },
    {
      head: 'v6',
      tail: 'v5',
      weight: 17,
    },
    {
      head: 'v7',
      tail: 'v6',
      weight: 19,
    },
    {
      head: 'v7',
      tail: 'v4',
      weight: 7,
    },
    {
      head: 'v7',
      tail: 'v3',
      weight: 16,
    },
    {
      head: 'v3',
      tail: 'v6',
      weight: 24,
    },
    {
      head: 'v8',
      tail: 'v1',
      weight: 12,
    },
    {
      head: 'v8',
      tail: 'v2',
      weight: 8,
    },
    {
      head: 'v8',
      tail: 'v3',
      weight: 21,
    }, 
  ]);
  graph.print();
  minSpanTree_Prim(graph);

  console.log('-------kruskal--------');
  minSpanTree_Kruskal(graph);
}