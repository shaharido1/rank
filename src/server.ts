import { RankServer } from './rank.server';
import { DrawGraphDataMapper } from './dataMappers/drawGraph.dataMapper';
import { ForceHorseDataMapper } from './dataMappers/forceHorse.dataMapper';
import * as Path from 'path';

const dataFiles = {
  bigTree: new DrawGraphDataMapper(Path.join(__dirname, '../data/drawGraph/bigTree/data.bigTree.json')),
  force1000: new ForceHorseDataMapper(Path.join(__dirname, '../data/forceHorse/forceHorse.1000.json')),
  lesMisrables: new ForceHorseDataMapper(Path.join(__dirname, '../data/forceHorse/lesMisrebles.json')),
  barcelona: new ForceHorseDataMapper(Path.join(__dirname, '../data/forceHorse/barcelona.json')),
  testScenerio: new DrawGraphDataMapper(Path.join(__dirname, '../data/drawGraph/testScenerio/testScenerio.json')),
  dataLoop: new DrawGraphDataMapper(Path.join(__dirname, '../data/drawGraph/loopData/data.loopData.json')),
  GOT: new ForceHorseDataMapper(Path.join(__dirname, '../data/gameOfThrones/gameOfThrones.json'))

};

// const rankServerForLoop = new RankServer(dataFiles.dataLoop.mapData(),
//     {
//       threshold: 0.3,
//       reFireThreshold: 0.005,
//       decay: 0.6,
//       allowDoubleFire: false
//     })
//     .compereResults(['12', '4', '17']);

const data = dataFiles.GOT.mapData();
const rankServerForLoop = new RankServer(data,
    {
      threshold: 0.5,
      reFireThreshold: 0.05,
      decay: 0.7,
      allowDoubleFire: false
    })
    .compereResults(['Daenerys-Targaryen', 'Jon-Snow', 'Tyrion-Lannister']);

// rankServer.compereResults(['12', '19', '25', '11']);
// rankServer.compereResults(['A11', 'A5']);