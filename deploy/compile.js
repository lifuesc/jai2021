const path = require("path");
const fs = require("fs");
const solc = require("solc");

const sensorFile = "Sensor.sol";

// Pega o diretório do arquivo do sensor
const SensorPath = path.resolve(__dirname, "contracts", sensorFile);

const datas = [
  {
    file: sensorFile,
    name: "Sensor",
  },
];

const sourceSensor = fs.readFileSync(SensorPath, "utf8");

// Configuração do SOLC
var input = {
  language: "Solidity",
  sources: {
    [sensorFile]: {
      content: sourceSensor,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

let contratoCompilado = JSON.parse(solc.compile(JSON.stringify(input)));

// * Descomentar para imprimir ABI
// datas.map((data) =>
//   console.log(
//     JSON.stringify(
//       contratoCompilado.contracts[data.file][data.name].abi,
//       null,
//       4
//     )
//   )
// );

// Exporta dados do contrato
module.exports = contratoCompilado.contracts[sensorFile].Sensor;
