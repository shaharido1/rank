import { GraphNode } from '../graphNodeClass/graphNode.class';
import { DataMappersAbstract } from './dataMappers.abstract';

export class DrawGraphDataMapper extends DataMappersAbstract{
  nodes: Map<string, GraphNode> = new Map();

  constructor(address) {
    super(address)
  }

  mapData() {
    this.dataJson['graphml']['graph']['nodes']['node']
        .map(node => ({
          id : node['-id'],
          name: node["-mainText"] || node['-id'],
        }))
        .forEach(({id, name}) =>
        this.nodes.set(id, new GraphNode(id, new Map(), 0, name))
    );
    this.dataJson['graphml']['graph']['edges']['edge'].forEach(edge => {
      const nodeId = edge['-vertex1'];
      const nodeTargetId = edge['-vertex2'];
      const node = this.nodes.get(nodeId);
      node.pointingAt.set(nodeTargetId, true);
    });
    return this.nodes
  }
}