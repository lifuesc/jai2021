// importa o web3
import web3 from "./web3";
// Endereço do contrato gerado no deploy
const address = "0xfC272950a29c2f2307174e82C07566c1B231C951";
// Abi gerada no deploy do contrato
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        components: [
          {
            internalType: "string",
            name: "idv",
            type: "string",
          },
          {
            internalType: "uint8",
            name: "decimalPlace",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "defaultValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "max",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "min",
            type: "uint256",
          },
        ],
        internalType: "struct MeasureSetting[]",
        name: "_settings",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "getAllMeasure",
    outputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "value",
            type: "uint256[]",
          },
          {
            internalType: "uint64",
            name: "timestamp",
            type: "uint64",
          },
        ],
        internalType: "struct Measure[]",
        name: "measure",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256[]",
            name: "value",
            type: "uint256[]",
          },
          {
            internalType: "uint64",
            name: "timestamp",
            type: "uint64",
          },
        ],
        internalType: "struct Measure[]",
        name: "newMeasure",
        type: "tuple[]",
      },
    ],
    name: "insertMeasure",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

//exporte o contrato
export default new web3.eth.Contract(abi, address);
