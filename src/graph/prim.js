
export function minSpanTree_Prim(graph){
  let i, j, k;
  let weightList = new Array(graph.vertexNum); // 当前生成树中的节点到图中剩余节点的权重
  let edgeTailIndex = [0]; // 对应weightList中每条边的初始节点索引

  const vertexes = graph.vertexes;
  let totalWeight = 0;

  weightList[0] = [0];
  for(i = 1; i < graph.vertexNum; i++){
    weightList[i] = graph.adjacencyMatrix[0][i];
    edgeTailIndex[i] = 0;
  }
  for(i = 1; i < graph.vertexNum; i++){
    let minWeight = Infinity;
    k = 0;

    for(j = 1; j < graph.vertexNum; j++){
      if(weightList[j] !== 0 && weightList[j] < minWeight){
        minWeight = weightList[j];
        k = j;
      }
    }

    totalWeight += minWeight;
    weightList[k] = 0;

    console.log(`${vertexes[edgeTailIndex[k]]}------${vertexes[k]} weight: ${minWeight} totalWeight: ${totalWeight}`);

    for(j = 0; j < graph.vertexNum; j++){
      if(weightList[j] !== 0 && graph.adjacencyMatrix[k][j] < weightList[j]){
        weightList[j] = graph.adjacencyMatrix[k][j];
        edgeTailIndex[j] = k;
      }
    }
  }
}
