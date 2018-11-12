import { GraphNode } from '../graphNodeClass/graphNode.class';
import { DataMappersAbstract } from './dataMappers.abstract';

export class ForceHorseDataMapper extends DataMappersAbstract {
  nodes: Map<string, GraphNode> = new Map();

  constructor(address: string) {
    super(address);
  }

  mapData() {
    this.dataJson['nodes']
        .map(node => ({
          id: node['id'].toString(),
          name: node['label'] || node['id'].toString()
        }))
        .forEach(({ name, id }) =>
            this.nodes.set(id, new GraphNode(id, new Map(), 0, name))
        );
    this.dataJson['links'].forEach(edge => {
      const nodeId = edge['source'].toString();
      const nodeTargetId = edge['target'].toString();
      const node = this.nodes.get(nodeId);
      node.pointingAt.set(nodeTargetId, true);
    });
    return this.nodes;
  }
}