export function minSpanTree_Kruskal(graph){
  const edges = graph.edges;
  let parents = new Array(graph.vertexNum).fill(0);
  let totalWeight = 0;

  const find = (parents, begin) => {
    while(parents[begin] > 0){
      begin = parents[begin];
    }
    return begin;
  }

  edges.forEach(edge => {
    const begin = find(parents, edge.begin);
    const end = find(parents, edge.end);

    if(begin !== end){
      totalWeight += edge.weight;
      parents[begin] = end;
      console.log(`${graph.vertexes[begin]}-----${graph.vertexes[end]} weight: ${edge.weight} totalWeight: ${totalWeight}`);
    }
  })
}

