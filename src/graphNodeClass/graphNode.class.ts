

export type GraphNodesMap = Map<string, GraphNode>
export class GraphNode  {
  hasFired: boolean = false;
  lastFire: number =0;
  activationValue : number = 0;
  private static numberWellAboveOne = 10;
  get deltaActivationPrecent() {
    return this.lastFire===0? GraphNode.numberWellAboveOne : (this.activationValue - this.lastFire)/this.lastFire
  }
  pointingAt: Map<string, boolean>;
  _id: string;
  name: string = null;

  constructor(_id, pointingAt, activationValue =0, name?) {
    this._id=_id;
    this.pointingAt = pointingAt;
    this.activationValue = activationValue;
    this.name = name || _id
  }


}