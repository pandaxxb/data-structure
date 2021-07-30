class Vertex{
  _data = null;
  _firstIn = null;
  _firstOut = null;

  constructor(data){
    this._data = null;
  }

  set data(data){
    this._data = data;
  }

  get data(){
    return this._data;
  }

  set firstIn(arcNode){
    this._firstIn = arcNode;
  }

  get firstIn(){
    return this._firstIn;
  }

  set firstOut(arcNode){
    this._firstOut = arcNode;
  }

  get firstOut(){
    return this._firstOut;
  }
}

class ArcNode{
  _headIndex = -1;
  _tailIndex = -1;
  _nextSameHeadArc = null;
  _nextSameTailArc = null;

  constructor(head, tail){
    this._headIndex = head;
    this._tailIndex = tail;
  }

  get headIndex(){
    return this._headIndex;
  }

  get tailIndex(){
    return this._tailIndex;
  }

  set nextSameHeadArc(arcNode){
    this._nextSameHeadArc = arcNode;
  }

  get nextSameHeadArc(){
    return this._nextSameHeadArc;
  }

  set nextSameTailArc(arcNode){
    this._nextSameTailArc = arcNode; 
  }

  get nextSameTailArc(){
    return this._nextSameTailArc;
  }
}

function initDirectedGraph(vertexes, arcs){
  let directedGraph = [];
  let vertexIndex = {};

  vertexes.forEach((vertex, index) => {
    let vertexNode = new Vertex(vertex);
    directedGraph.push(vertexNode);
    vertexIndex[vertex] = index;
  });

  arcs.forEach(arc => {
    const headIndex = vertexIndex[arc.head];
    const tailIndex = vertexIndex[arc.tail];

    const arcNode = new ArcNode(headIndex, tailIndex);

    const headVertex = directedGraph[headIndex];
    const tailVertex = directedGraph[tailIndex];

    arcNode.nextSameHeadArc = headVertex.firstIn;
    headVertex.firstIn = arcNode;
    arcNode.nextSameTailArc = tailVertex.firstOut;
    tailVertex.firstOut = arcNode;
  })
}