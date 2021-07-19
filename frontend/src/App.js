import React, { useEffect, useState } from "react";
// Configuração para requisições na rede
import web3 from "./web3";
// Informação do contrato
import sensor from "./sensor";
// Módulo para fazer requisições para API
import axios from "axios";

// Verifica se o numero é menor que 10 e poe um 0 na frente
const checkZero = (val) => {
  return val < 10 ? "0" + val : val;
};
// Função que transforma timestamp em dd/mm/yyyy hh:mm:ss
const converteHorario = (timestamp) => {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var ddmmmyyyy =
    checkZero(date.getDate()) +
    "/" +
    checkZero(date.getMonth() + 1) +
    "/" +
    date.getFullYear();
  var formattedTime =
    ddmmmyyyy +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  return formattedTime;
};
// Deixa o decimanl com apenas duas casas
const convertDecimal = (val) => (val / 100).toFixed(2);

const App = () => {
  const [readings, setReadings] = useState([]);
  const [contractReadings, setContractReadings] = useState([]);
  const [transaction, setTransaction] = useState();
  const [loading, setLoading] = useState(false);

  // Pega dados do middleware e atribui a Readings
  const pegarDadosMiddleware = async () => {
    try {
      let response = await axios.get("http://localhost:3333/get-data");
      setReadings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const enviarLeituras = async () => {
    try {
      // Altera o estado do loading para true
      setLoading(true);
      // Pega a última leitura
      const data = readings[readings.length - 1];
      // Pega contas do metamask
      const contas = await web3.eth.getAccounts();
      // Insere medidas no contrato passando a temperatura, humidade e o timestamp
      const leitura = await sensor.methods
        .insertMeasure([
          [
            [data.temperature.toFixed(0), data.humidity.toFixed(0)],
            data.timestamp,
          ],
        ])
        .send({ from: contas[0] });
      // Altera o estado da transaction com o valor da leitura
      setTransaction(leitura);
      // Volta estado de loading para false
      setLoading(false);
    } catch (error) {
      // Volta estado de loading para false
      setLoading(false);
      console.log(error);
    }
  };
  const pegarLeituras = async () => {
    try {
      // Altera o estado do loading para true
      setLoading(true);
      // Pega medidas
      const leitura = await sensor.methods.getAllMeasure().call();
      // Altera o estado do contract readings com o valor da leitura
      setContractReadings(leitura);
      console.log(leitura);
      // Volta estado de loading para false
      setLoading(false);
    } catch (error) {
      // Volta estado de loading para false
      setLoading(false);
      console.log(error);
    }
  };
  // Chama seu conteúdo antes do código ser renderizado
  useEffect(() => {
    // Quando a pagina inicial ele chama essa função
    pegarDadosMiddleware();
  }, []);
  return (
    <div>
      <h1>Contrato de sensor</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Temperatura</th>
            <th>Umidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {/* Mostra informação das leituras */}
          {readings.map((reading, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{convertDecimal(reading.temperature)}</td>
              <td>{convertDecimal(reading.humidity)}</td>
              <td>{converteHorario(reading.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Se leituras maior que zero */}
      {readings.length > 0 ? (
        <>
          <h4>
            Deseja enviar para o contrato a última visita de id:{" "}
            {readings.length}?
          </h4>
          <button onClick={() => enviarLeituras()}>Sim!</button>
        </>
      ) : (
        <h4>Nenhuma leitura cadastrada no servidor</h4>
      )}
      {/* Mostra carregando  */}
      {loading ? (
        <h1>Carregando...</h1>
      ) : transaction ? (
        <>
          {/* Mostra informação da transação  */}
          <h3>Endereço de envio: {transaction.from}</h3>
          <h3>Endereço do Contrato: {transaction.to}</h3>
          <h3>
            <a
              href={`https://rinkeby.etherscan.io/tx/${transaction.transactionHash}`}
              target="_blank"
              rel="noreferrer"
            >
              Veja a transação no ethersan
            </a>
          </h3>
        </>
      ) : null}

      <br />
      <h2>Medições do contrato</h2>

      <button onClick={() => pegarLeituras()}>
        Carregar leituras do contrato
      </button>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Temperatura</th>
            <th>Umidade</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {contractReadings.map((contractReading, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{convertDecimal(contractReading.value[0])}</td>
              <td>{convertDecimal(contractReading.value[1])}</td>
              <td>{converteHorario(parseInt(contractReading.timestamp))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
