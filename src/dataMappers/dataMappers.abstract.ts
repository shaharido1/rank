import * as Path from "path";
import * as fs from "fs";
import { GraphNode, GraphNodesMap } from '../graphNodeClass/graphNode.class';

export abstract class DataMappersAbstract {
  dataJson
  nodes: GraphNodesMap = new Map();

  constructor(address) {
    this.dataJson = JSON.parse(fs.readFileSync(Path.resolve(address), 'utf8'));
  }

  abstract mapData() : GraphNodesMap

}