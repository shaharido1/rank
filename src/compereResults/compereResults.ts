export type forCompereNode =  {activationValue: number, name: string, id: string};
export type CompereArray = Array<forCompereNode>

export class CompereResults {
  firstResult: CompereArray;
  secondResult: CompereArray;

  static sortArray(compereArray: CompereArray): CompereArray {
    return compereArray
        .sort((node1: forCompereNode, node2: forCompereNode) => node1.activationValue - node2.activationValue);
  }

  static orderScale(compereArray: CompereArray): CompereArray {
    let order = 1;
    let lestValue = compereArray[0].activationValue;
    return compereArray.map(({activationValue, id, name} : forCompereNode) => {
      order = activationValue === lestValue ? order : order + 1;
      lestValue = activationValue;
      return {
        id,
        name,
        activationValue: order
      }
    })

  }


  static groupBy(orderArray: CompereArray) : Map<string, Array<string>>{
    const map = new Map();
    orderArray.forEach(({activationValue, name}: forCompereNode) => {
      const collection = map.get(activationValue) || [];
      collection.push(name);
      map.set(activationValue, collection);
    });
    return map;
  }

  constructor(firstResult: CompereArray, secondResult: CompereArray) {
    this.firstResult = CompereResults.sortArray(firstResult);
    this.secondResult = CompereResults.sortArray(secondResult);
    ;
  }


  init() {
    console.log('rank absolute numer 1');
    console.log(this.firstResult);
    console.log('rank absolute numer 2');
    console.log(this.secondResult);


    console.log('rank order scale 1');
    console.log(CompereResults.groupBy(CompereResults.orderScale(this.firstResult)));

    console.log('rank order scale 2');
    console.log(CompereResults.groupBy(CompereResults.orderScale(this.secondResult)));
  }

