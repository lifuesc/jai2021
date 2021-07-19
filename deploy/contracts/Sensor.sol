// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma abicoder v2;

// Estrutura da configuração de medição
struct MeasureSetting{
    string idv;
    uint8 decimalPlace;
    uint defaultValue;
    uint max;
    uint min;
}
// Estrutura de medição
struct Measure{
    uint[] value;
    uint64 timestamp;
}

contract Sensor{
    
    // Nome do sensor
    string public name;
    
    // Aceita diversas configurações
    MeasureSetting[] settings;

    // Dados de medições
    Measure[] measures;
    
    // Endereço do dono
    address public owner;
    
    // Cria a configuração inicial do sensor
    constructor(
        string memory _name,
        MeasureSetting[] memory _settings
    ) {
        require(_settings.length > 0, "Settings empty");
        owner = msg.sender;
        name = _name;
        
        for(uint8 i; i<_settings.length;i++){
            settings.push(_settings[i]);
        }
    }
    // Cadastra as medições
    function insertMeasure(Measure[] memory newMeasure) public {
        for(uint i; i < newMeasure.length; i++){
            require(newMeasure[i].value.length == settings.length, "SettingsSize is different of new measure value");
            measures.push(newMeasure[i]);
        }
    }
    // Pega todas medições
    function getAllMeasure() public  view returns (Measure[] memory measure) {
        return measures;
    }
}