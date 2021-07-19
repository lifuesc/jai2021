// Importa express
const express = require("express");
// Roda configuração do express e atribui ao app
const app = express();
// Configuração de acesso a diferentes origens
const cors = require("cors");
// Porta que irá rodar o servidor
const port = 3333;

// Atribui configuração do cors no express
app.use(cors());
// Configuração para o express receber requisição json
app.use(express.json());

// Váriavel que contem as leitura
const readings = [];
// Hash de validação
const hashSensor = "d5b863c277fb1c6475eebef50278ff59";
// Rota de inserção de dados
app.post("/insert-data", function (req, res) {
  // Pega as variáveis no corpo da requisição
  var { hash, temperature, humidity } = req.body;
  // Recebe o timestamp (data e horário) da requisição
  const timestamp = new Date().getTime();

  try {
    // Se o hash não for igual ao do sensor
    if (hashSensor !== hash) throw { message: "Inválid Hash" };
    // Verifica se os dados foram enviado
    // Se vazio retorna erro
    if (!temperature && !humidity)
      throw { message: "Empty temperature or humidity" };

    // Remove o ponto flutuante multiplicando por 100.
    // Os dois ultimos digitos são as casas decimais
    // ! Solidity não aceita float
    temperature = temperature.toFixed(2) * 100;
    humidity = humidity.toFixed(2) * 100;
    // Coloca no final do array os dados
    readings.push({ temperature, humidity, timestamp });
    // Retorna status de sucesso
    res.status(201).json({ message: "Success!" });
  } catch (error) {
    // Retorna status de erro e mostra o erro
    res.status(400).json({ message: "Error", error });
  }
});
// Rota que pega dados
app.get("/get-data", function (req, res) {
  // Retorna dados
  res.json({ data: readings });
});
// Inicia o servidor na porta
app.listen(port, () => {
  console.log(`Servidor rondando na porta ${port}`);
});
