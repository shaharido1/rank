//
// // A
// // B>C
// // D,E > F > G
// // http://graphonline.ru/en/?graph=krtaeoqUDmJVpNEh
// import { GraphNode } from '../graphNode.class';
//
// export const staticNodes : GraphNode = [
//   {
//     id: "a",
//     pointingAt: new Map(),
//   },
//   {
//     id: "b",
//     pointingAt: new Map([["c", true]]),
//
//   },
//   {
//     id: "c",
//     pointingBy: new Map([["b", true]]),
//   },
//   {
//     id: "d",
//     pointingAt: new Map([["f", true]]),
//   },
//   {
//     id: "e",
//     pointingAt: new Map([["f", true]])
//   },
//   {
//     id: "f",
//     pointingBy: new Map([["e", true],["d", true]]),
//     pointingAt: new Map([["g", true]])
//   },
//   {
//     id: "g",
//     pointingBy: new Map([["f", true]]),
//     pointingAt: new Map()
//   }
//
// ]
//
