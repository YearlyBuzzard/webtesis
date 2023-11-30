const mqtt = require('mqtt');

// Conexión al broker MQTT
const client = mqtt.connect('mqtt://test.mosquitto.org');

let currentHeartRate = 70; // Valor inicial del ritmo cardíaco
// let currentTemperature = 36.5; // Temperatura corporal normal en grados Celsius
let currentSystolic = 120; // Presión arterial sistólica inicial
let currentDiastolic = 80;  // Presión arterial diastólica inicial
let currentOxygenLevel = 95; // Nivel de oxígeno en sangre inicial

const simulateData = () => {
  // Simulación del ritmo cardíaco
  currentHeartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;

  // Simulación de la temperatura
  // currentTemperature = Math.floor(Math.random() * (37 - 36 + 1)) + 36;

  // Simulación de la presión arterial
  currentSystolic = Math.floor(Math.random() * (140 - 110 + 1)) + 110;
  currentDiastolic = Math.floor(Math.random() * (90 - 70 + 1)) + 70;

  // Simulación del nivel de oxígeno en sangre
  currentOxygenLevel = Math.floor(Math.random() * (100 - 92 + 1)) + 92;
};

client.on('connect', () => {
  console.log('Conectado al broker MQTT');

  setInterval(() => {
    simulateData();

    // Publicar datos simulados
    client.publish('ritmoCardiaco/photon', currentHeartRate.toString());
    // client.publish('temperatura/photon', currentTemperature.toString());
    client.publish('presionArterial/photon', JSON.stringify({ systolic: currentSystolic, diastolic: currentDiastolic }));
    client.publish('nivelOxigeno/photon', currentOxygenLevel.toString());

    console.log(`Datos enviados: HR=${currentHeartRate}, BP=${currentSystolic}/${currentDiastolic}, O2=${currentOxygenLevel}`);
  }, 2000); // Enviar cada 5 segundos  // Temp=${currentTemperature},
});

client.on('error', (error) => {
  console.error(`Error de conexión MQTT: ${error}`);
});
