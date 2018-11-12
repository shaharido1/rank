import { GraphNode, GraphNodesMap } from './graphNodeClass/graphNode.class';
import { CompereResults, forCompereNode } from './compereResults/compereResults';
import { RankConfigInterface } from './interfaces/rank.config.interface';

export class RankServer {
  nodes: GraphNodesMap = new Map();
  nodesToFilre: GraphNodesMap = new Map();
  forDebug = {
    loopingThrowGraphCounter: 0,
    iterations: 0
  };
  config: RankConfigInterface;

  constructor(
      nodes: GraphNodesMap,
      config: RankConfigInterface = {
        threshold: 0.3,
        reFireThreshold: 0.005,
        decay: 0.6,
        allowDoubleFire: false
      }) {
    this.nodes = nodes;
    this.config = config;
  }

  compereResults(activeNodes) {
    const firstResult =
        Array.from(this.calculateRank(activeNodes).entries())
            .map(([id, { activationValue, name }]: [string, GraphNode]): forCompereNode => ({id, activationValue, name}))
    this.config.allowDoubleFire = !this.config.allowDoubleFire;
    this.resetReults();
    const secondResult =
        Array.from(this.calculateRank(activeNodes).entries())
            .map(([id, { activationValue, name }]: [string, GraphNode]): forCompereNode => ({id, activationValue, name}))
    const compereResult = new CompereResults(firstResult, secondResult);
    compereResult.init();

  }

  calculateRank(activeNodes: Array<string>) {
    console.log('init');
    console.log('configuration' + JSON.stringify(this.config));
    console.log('nodes first to fire: ' + activeNodes);
    this.setActiveNodes(activeNodes);
    this.spreadActivation();
    return this.nodes;
  }

  private resetReults() {
    this.forDebug = {
      loopingThrowGraphCounter: 0,
      iterations: 0
    };
    this.nodes = new Map(
        Array.from(this.nodes.entries())
            .map(([key, { pointingAt, name }]): [string, GraphNode] => ([
              key,
              new GraphNode(key, pointingAt, 0, name)
            ]))
    );
  }

  setActiveNodes(activeNodes) {
    activeNodes
        .map(id => this.nodes.get(id))
        .filter(Boolean)
        .forEach(node => node.activationValue = 1);
    activeNodes
        .filter(id => this.nodes.has(id))
        .forEach(id => this.nodesToFilre.set(id, this.nodes.get(id)));
  }

  spreadActivation() {
    while (this.nodesToFilre.size > 0) {
      this.debuggingData();
      const nextToFire = new Map();
      this.nodesToFilre.forEach((fireNode) => {
        fireNode.lastFire = fireNode.activationValue;
        fireNode.hasFired = true;
        Array.from(fireNode.pointingAt.keys())
            .map(targetNodeId => this.nodes.get(targetNodeId))
            .map(targetNode => {
              const adjastedValue = targetNode.activationValue + fireNode.activationValue * this.config.decay;
              targetNode.activationValue = adjastedValue > 1 ? 1 : adjastedValue;
              return targetNode;
            })
            .filter(({ activationValue }) => activationValue > this.config.threshold)
            .filter(targetNode => this.config.allowDoubleFire ? targetNode.deltaActivationPrecent > this.config.reFireThreshold : !targetNode.hasFired)
            .forEach(targetNode => nextToFire.set(targetNode._id, targetNode));
      });
      this.nodesToFilre = new Map(nextToFire);
    }
  }

  private debuggingData() {
    this.forDebug.loopingThrowGraphCounter++;
    console.log('loop on graph: ' + this.forDebug.loopingThrowGraphCounter);
    this.forDebug.iterations += this.nodesToFilre.size;
    console.log('iterations in loop: ' + this.forDebug.iterations);
  }


}